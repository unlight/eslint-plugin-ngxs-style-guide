import { eslint, estree, CustomRule, getParentMathod, getParentClass, hasActionDecorator, hasStateDecorator, isIdentifier, getRuleId } from '../utils';

function create(context: eslint.RuleContext<string, never>) {

    return {
        MemberExpression(node: estree.MemberExpression) {
            if (node.property && isIdentifier(node.property) && node.property.name === 'subscribe') {
                const method = getParentMathod(node);
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

export const rule: CustomRule = {
    id: getRuleId(__filename),
    create,
    meta: {
        docs: {
            category: 'Possible Errors',
            description: '',
            recommended: false,
            url: 'https://stackoverflow.com/questions/56122116',
        },
        messages: {
            default: 'Do not subscribe in actions, return Observable',
        },
        type: 'problem',
        schema: <any>undefined,
    },
};
