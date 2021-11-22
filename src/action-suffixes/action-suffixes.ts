import { eslint, estree } from '../utils';

function actionSuffixes(context: eslint.RuleContext<string, never>) {
    let className: string | undefined | null;
    let isActionClass = false;

    return {
        ClassDeclaration(node: estree.ClassDeclaration) {
            className = node.id && node.id.name;
        },
        'ClassDeclaration:exit'(node: estree.ClassDeclaration) {
            if (isActionClass && className && className.endsWith('Action') && node.id) {
                context.report({
                    messageId: 'default',
                    node: node.id,
                });
            }
            isActionClass = false;
            className = undefined;
        },
        PropertyDefinition(node: estree.PropertyDefinition) {
            if (className && node.value && node.value.type === 'Literal') {
                const value = String(node.value.value);
                if (/^\[[A-Z][A-Za-z]+/.test(value)) {
                    isActionClass = true;
                }
            }
        },
    };
}

export const rule: eslint.RuleModule<string, never> = {
    create: actionSuffixes,
    meta: {
        type: 'suggestion',
        schema: {},
        docs: {
            description: 'Actions should NOT have a suffix',
            recommended: 'warn',
            url: 'https://www.ngxs.io/recipes/style-guide#action-suffixes',
        },
        messages: {
            default: 'Actions should NOT have a suffix `Action`',
        },
    },
};
