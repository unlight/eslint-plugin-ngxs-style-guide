import { eslint, estree, isIdentifierEndsWith, isImplements } from '../utils';

function pluginSuffix(context: eslint.RuleContext<string, never>) {
    return {
        ClassDeclaration(node: estree.ClassDeclaration) {
            if (
                node.id &&
                isImplements(node, 'NgxsPlugin') &&
                !isIdentifierEndsWith(node, 'Plugin')
            ) {
                context.report({
                    messageId: 'default',
                    node: node.id,
                });
            }
        },
    };
}

export const rule: eslint.RuleModule<string, never> = {
    create: pluginSuffix,
    meta: {
        type: 'suggestion',
        schema: {},
        docs: {
            description: 'Plugins should end with the `Plugin` suffix',
            recommended: 'warn',
            url: 'https://www.ngxs.io/recipes/style-guide#plugin-suffix',
        },
        messages: {
            default: 'Plugins should end with the `Plugin` suffix',
        },
    },
};
