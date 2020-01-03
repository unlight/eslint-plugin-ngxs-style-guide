import { eslint, isIdentifierEndsWith, estree, hasStateDecorator } from '../utils';
import { Nullable } from 'simplytyped';

function stateSuffix(context: eslint.RuleContext<string, never>) {
    return {
        ClassDeclaration(node: estree.ClassDeclaration) {
            if (hasStateDecorator(node) && !isIdentifierEndsWith(node, 'State')) {
                context.report({
                    messageId: 'default',
                    node: node.id!,
                    fix: fixer => {
                        let result: Nullable<ReturnType<typeof fixer.replaceTextRange>> = null; // tslint:disable-line:no-null-keyword
                        if (node.id) {
                            const newName = `${node.id.name}State`;
                            result = fixer.replaceTextRange(node.id.range, newName);
                        }
                        return result;
                    },
                });
            }
        },
    };
}

export const rule: eslint.RuleModule<string, never> = {
    create: stateSuffix,
    meta: {
        type: 'suggestion',
        fixable: 'code',
        schema: {},
        docs: {
            category: 'Stylistic Issues',
            description: 'A state should always be suffixed with the word `State`',
            recommended: 'warn',
            url: 'https://www.ngxs.io/recipes/style-guide#state-suffix',
        },
        messages: {
            default: 'A state should always be suffixed with the word `State`',
        },
    },
};
