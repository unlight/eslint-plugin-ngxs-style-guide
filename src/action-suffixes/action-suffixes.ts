import { getDecoratorByName, isClassProperty, estree, eslint, getRuleId, CustomRule } from '../utils';

function create(context: eslint.RuleContext<string, never>) {

    let className: string | undefined = undefined;
    let hasStaticReadonlyType = false;
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
            hasStaticReadonlyType = false;
        },
        ClassProperty(node: estree.ClassProperty) {
            if (className) {
                hasStaticReadonlyType =
                    node.key &&
                    (node.key as estree.Identifier).name === 'type' &&
                    node.readonly === true &&
                    node.static === true;

                if (node.value && node.value.type === 'Literal') {
                    const value = node.value.value as string;
                    if (/^\[[A-Z][A-Za-z]+\]/.test(value)) {
                        isActionClass = true;
                    }
                }
            }
        }
    };
}

export const rule: CustomRule = {
    id: getRuleId(__filename),
    create,
    meta: {
        docs: {
            url: 'https://www.ngxs.io/recipes/style-guide#action-suffixes',
            category: 'Best Practices',
            recommended: 'warn',
            description: 'Actions should NOT have a suffix',
        },
        type: 'suggestion',
        schema: <any>undefined,
        messages: {
            default: 'Actions should NOT have a suffix `Action`',
        }
    },
};
