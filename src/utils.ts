import { CallExpression, Expression, Node, ClassDeclaration } from 'estree';

export type Decorator = {
    expression: Expression;
};

export function getDecoratorByName(node: any, name: string): Decorator | undefined {
    const result: Decorator = (node.decorators || []).find(d => {
        const expression = d.expression && d.expression.type === 'CallExpression' && d.expression as CallExpression;
        return expression && expression.callee.type === 'Identifier' && expression.callee.name === name;
    });
    return result;
}

export function isClassDeclaration(node: Node): node is ClassDeclaration {
    return node.type === 'ClassDeclaration';
}

export function hasStateDecorator(node: ClassDeclaration) {
    const decoratorNode = getDecoratorByName(node, 'State');
    return decoratorNode != undefined;
}
