import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import * as eslint from '@typescript-eslint/experimental-utils/dist/ts-eslint';

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

export function hasStateDecorator(node: estree.ClassDeclaration) {
    const decoratorNode = getDecoratorByName(node, 'State');
    return decoratorNode != undefined;
}

