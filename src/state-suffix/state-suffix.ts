import { eslint, isIdentifierEndsWith, estree, hasStateDecorator, getRuleId, CustomRule } from '../utils';
import { Nullable } from 'simplytyped';

function create(context: eslint.RuleContext<string, never>) {
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

export const rule: CustomRule = {
    id: getRuleId(__filename),
    create,
    meta: {
        docs: {
            description: 'A state should always be suffixed with the word `State`',
            category: 'Best Practices',
            url: 'https://www.ngxs.io/recipes/style-guide#state-suffix',
            recommended: 'warn',
        },
        fixable: 'code',
        type: 'suggestion',
        schema: <any>undefined,
        messages: {
            default: 'A state should always be suffixed with the word `State`',
        }
    },
};
