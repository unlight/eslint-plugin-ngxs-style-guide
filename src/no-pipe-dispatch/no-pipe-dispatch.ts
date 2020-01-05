import {
    eslint,
    estree,
    getParentFunction,
    getParentClass,
    hasActionDecorator,
    hasStateDecorator,
} from '../utils';

function noPipeDispatch(context: eslint.RuleContext<string, never>) {
    return {
        MemberExpression(node: estree.MemberExpression) {
            if (
                node.object.type === 'CallExpression' &&
                node.object.callee.type === 'MemberExpression' &&
                node.object.callee.property.type === 'Identifier' &&
                node.object.callee.property.name === 'dispatch' &&
                node.property.type === 'Identifier' &&
                node.property.name === 'pipe'
            ) {
                context.report({
                    messageId: 'default',
                    node: node.property,
                });
            }
        },
    };
}

export const rule: eslint.RuleModule<string, never> = {
    create: noPipeDispatch,
    meta: {
        type: 'problem',
        schema: {},
        docs: {
            category: 'Possible Errors',
            description: 'No pipe() after dispatch',
            recommended: 'warn',
            url: '',
        },
        messages: { default: 'No pipe() after dispatch' },
    },
};
