import { TSESTree as estree, TSESLint as eslint } from '@typescript-eslint/experimental-utils';
import { Predicate } from 'simplytyped';
import * as tsutils from 'tsutils-etc';
import * as ts from 'typescript';

export { estree, eslint };

export function getDecoratorByName(node: estree.Node, name: string): estree.Decorator | undefined {
    return ((<any>node).decorators || []).find(((d: { expression: estree.CallExpression }) => {
        const expression = d.expression && d.expression.type === 'CallExpression'
            && d.expression as estree.CallExpression;
        return expression && expression.callee.type === 'Identifier' && expression.callee.name === name;
    }));
}

export function isClassDeclaration(node: estree.Node): node is estree.ClassDeclaration {
    return node.type === 'ClassDeclaration';
}

export function isClassProperty(node: estree.Node): node is estree.ClassProperty {
    return node.type === 'ClassProperty';
}

export function hasStateDecorator(node: estree.ClassDeclaration): boolean {
    const decorator = getDecoratorByName(node, 'State');
    return decorator != undefined;
}

export function hasActionDecorator(node: estree.Node): boolean {
    const decorator = getDecoratorByName(node, 'Action');
    return decorator != undefined;
}

export function hasSelectDecorator(node: estree.Node) {
    const decorator = getDecoratorByName(node, 'Select');
    return decorator != undefined;
}

export function isImplements(node: estree.ClassDeclaration, interfaceName: string): boolean {
    return Boolean(node.implements &&
        node.implements.find(node => {
            return (node && node.expression && node.expression.type === 'Identifier'
                && node.expression.name === interfaceName);
        }));
}

export function isIdentifierEndsWith(node: { id?: estree.Identifier }, name: string): boolean {
    if (!node.id) {
        return true;
    }
    return node.id.name.endsWith(name);
}

export function getParent(node: estree.Node, predicate: Predicate) {
    let result: estree.Node | undefined = undefined;
    while (node && node.parent) {
        node = node.parent;
        if (predicate(node)) {
            result = node;
            break;
        }
    }
    return result;
}

export function getParentFunction(node: estree.Node): estree.MethodDefinition | undefined {
    return getParent(node, (n: estree.Node) => n.type === 'MethodDefinition') as estree.MethodDefinition;
}

export function getParentClass(node: estree.Node): estree.ClassDeclaration | undefined {
    return getParent(node, (n: estree.Node) => n.type === 'ClassDeclaration') as estree.ClassDeclaration;
}

export function typecheck(context: eslint.RuleContext<any, any>) {
    if (!context.parserServices || !context.parserServices.program || !context.parserServices.esTreeNodeToTSNodeMap) {
        throw new Error('This rule requires you to use `@typescript-eslint/parser` and to specify a `project` in `parserOptions`.');
    }
    const service = context.parserServices!;
    const nodeMap = service.esTreeNodeToTSNodeMap!;
    const typeChecker = service.program!.getTypeChecker();

    const getTypeScriptType = (node: estree.Node) => {
        const tsNode = nodeMap.get(node);
        const tsType = typeChecker.getTypeAtLocation(tsNode);
        return tsType;
    };

    const couldBeType = (node: estree.Node, name: string | RegExp, qualified?: { name: RegExp }) => {
        const type = getTypeScriptType(node);
        return tsutils.couldBeType(type, name, qualified ? { ...qualified, typeChecker } : undefined);
    };

    const couldReturnType = (node: estree.Node, name: string | RegExp, qualified?: { name: RegExp }) => {
        const tsNode = nodeMap.get(node);
        if (
            ts.isArrowFunction(tsNode) ||
            ts.isFunctionDeclaration(tsNode) ||
            ts.isMethodDeclaration(tsNode) ||
            ts.isFunctionExpression(tsNode) ||
            ts.isCallSignatureDeclaration(tsNode) ||
            ts.isMethodSignature(tsNode)
        ) {
            return (tsNode.type && tsutils.couldBeType(typeChecker.getTypeAtLocation(tsNode.type), name, qualified ? { ...qualified, typeChecker } : undefined));
        }
        return false;
    };

    return {
        nodeMap,
        typeChecker,
        getTypeScriptType,
        couldBeType,
        couldReturnType,
        couldBeObservable: (node: estree.Node) => couldBeType(node, "Observable"),
        couldReturnObservable: (node: estree.Node) =>
            couldReturnType(node, "Observable"),
        couldBeSubscription: (node: estree.Node) => couldBeType(node, "Subscription"),
        couldBeSubject: (node: estree.Node) => couldBeType(node, "Subject"),
        couldBeBehaviorSubject: (node: estree.Node) =>
            couldBeType(node, "BehaviorSubject"),
        couldBeError: (node: estree.Node) => couldBeType(node, "Error"),
        couldBeFunction: (node: estree.Node) => {
            // Fast check
            if (isArrowFunctionExpression(node) || isFunctionDeclaration(node)) {
                return true;
            }

            // Check with a type checker
            return couldBeFunctionTS(getTypeScriptType(node));
        },
        couldBeMonoTypeOperatorFunction: (node: estree.Node) =>
            couldBeType(node, "MonoTypeOperatorFunction"),
        isAny: (node: estree.Node) => isAnyTS(getTypeScriptType(node)),
        isReferenceType: (node: estree.Node) => isReferenceTypeTS(getTypeScriptType(node))
    };
}
