import { estree, eslint, hasSelectDecorator, CustomRule, getRuleId } from '../utils';

function create(context: eslint.RuleContext<string, never>) {
    return {
        ClassProperty(node: estree.ClassProperty) {
            if (!hasSelectDecorator(node) || !node.key) {
                return;
            }
            // Class property has @Select decorator, check name
            const propertyName = (node.key as estree.Identifier).name;
            if (propertyName && !propertyName.endsWith('$')) {
                context.report({
                    messageId: 'default',
                    node: node.key,
                    fix: (fixer) => {
                        const newName = `${propertyName}$`;
                        return fixer.replaceTextRange(node.key.range, newName);
                    },
                });
            }
        }
    };
}

export const rule: CustomRule = {
    id: getRuleId(__filename),
    create,
    meta: {
        docs: {
            category: 'Best Practices',
            description: 'Selects should have a `$` suffix',
            url: 'https://www.ngxs.io/recipes/style-guide#state-suffix',
            recommended: 'warn',
        },
        type: 'suggestion',
        fixable: 'code',
        messages: {
            default: 'Selects should have a `$` suffix',
        },
        schema: <any>undefined,
    },
};
