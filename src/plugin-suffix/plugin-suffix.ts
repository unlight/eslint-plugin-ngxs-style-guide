import { estree, eslint, isImplements, isIdentifierEndsWith, getRuleId, CustomRule } from '../utils';

function create(context: eslint.RuleContext<string, never>) {

    return {
        ClassDeclaration(node: estree.ClassDeclaration) {
            if (node.id && isImplements(node, 'NgxsPlugin')) {
                if (!isIdentifierEndsWith(node, 'Plugin')) {
                    context.report({
                        messageId: 'default',
                        node: node.id,
                    });
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
            description: 'Plugins should end with the `Plugin` suffix',
            url: 'https://www.ngxs.io/recipes/style-guide#plugin-suffix',
            category: 'Best Practices',
            recommended: 'warn',
        },
        type: 'suggestion',
        schema: <any>undefined,
        messages: {
            default: 'Plugins should end with the `Plugin` suffix',
        },
    },
};
