import { TSESTree as estree } from '@typescript-eslint/experimental-utils';
import { Predicate } from 'simplytyped';

export function getDecoratorByName(
    node: estree.Node & { decorators?: estree.Decorator[] },
    name: string,
): estree.Decorator | undefined {
    return node.decorators?.find(d => {
        const expression = d.expression.type === 'CallExpression' && d.expression;
        return (
            expression &&
            expression.callee.type === 'Identifier' &&
            expression.callee.name === name
        );
    });
}

export function isClassDeclaration(node: estree.Node): node is estree.ClassDeclaration {
    return node.type === 'ClassDeclaration';
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

export function isImplements(
    node: estree.ClassDeclaration,
    interfaceName: string,
): boolean {
    return Boolean(
        node.implements?.some(node => {
            return (
                node.expression.type === 'Identifier' &&
                node.expression.name === interfaceName
            );
        }),
    );
}

export function isIdentifierEndsWith(
    node: { id?: estree.Identifier | null },
    name: string,
): boolean {
    if (!node.id) {
        return true;
    }
    return node.id.name.endsWith(name);
}

export function getParent(node: estree.Node | undefined, predicate: Predicate) {
    let result: estree.Node | undefined;
    while (node && node.parent) {
        node = node.parent;
        if (predicate(node)) {
            result = node;
            break;
        }
    }
    return result;
}

export function getParentFunction(
    node: estree.Node,
): estree.MethodDefinition | undefined {
    return getParent(
        node,
        (n: estree.Node) => n.type === 'MethodDefinition',
    ) as estree.MethodDefinition;
}

export function getParentClass(node: estree.Node): estree.ClassDeclaration | undefined {
    return getParent(
        node,
        (n: estree.Node) => n.type === 'ClassDeclaration',
    ) as estree.ClassDeclaration;
}

export {
    TSESLint as eslint,
    TSESTree as estree,
} from '@typescript-eslint/experimental-utils';
