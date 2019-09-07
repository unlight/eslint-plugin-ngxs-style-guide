import { TSESTree as estree, TSESLint as eslint } from '@typescript-eslint/experimental-utils';

export { estree, eslint };

export function getDecoratorByName(node: estree.Node, name: string): estree.Decorator | undefined {
    return ((<any>node).decorators || []).find(d => {
        const expression = d.expression && d.expression.type === 'CallExpression'
            && d.expression as estree.CallExpression;
        return expression && expression.callee.type === 'Identifier' && expression.callee.name === name;
    });
}

export function isClassDeclaration(node: estree.Node): node is estree.ClassDeclaration {
    return node.type === 'ClassDeclaration';
}

export function isClassProperty(node: estree.Node): node is estree.ClassProperty {
    return node.type === 'ClassProperty';
}

export function hasStateDecorator(node: estree.ClassDeclaration): boolean {
    const decoratorNode = getDecoratorByName(node, 'State');
    return decoratorNode != undefined;
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
