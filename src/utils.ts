import { TSESTree as estree, TSESLint as eslint } from '@typescript-eslint/experimental-utils';
import { Predicate } from 'simplytyped';

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
