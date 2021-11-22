import {
    eslint,
    estree,
    getParentClass,
    getParentFunction,
    hasActionDecorator,
    hasStateDecorator,
} from '../utils';

function noSubscribeInActions(context: eslint.RuleContext<string, never>) {
    return {
        MemberExpression(node: estree.MemberExpression) {
            if (
                node.property.type === 'Identifier' &&
                node.property.name === 'subscribe'
            ) {
                const method = getParentFunction(node);
                if (method && hasActionDecorator(method)) {
                    const pclass = getParentClass(method);
                    if (pclass && hasStateDecorator(pclass)) {
                        context.report({
                            messageId: 'default',
                            node: node.property,
                        });
                    }
                }
            }
        },
    };
}

export const rule: eslint.RuleModule<string, never> = {
    create: noSubscribeInActions,
    meta: {
        type: 'suggestion',
        schema: {},
        docs: {
            description: '',
            recommended: 'warn',
            url: 'https://stackoverflow.com/questions/53047853',
        },
        messages: { default: 'Do not subscribe in actions, return Observable' },
    },
};
