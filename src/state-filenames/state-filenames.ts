import { hasStateDecorator, estree, eslint, isIdentifierEndsWith, getRuleId, CustomRule } from '../utils';

function create(context: eslint.RuleContext<string, never>) {
    const filenameWithExtension = context.getFilename();
    if (filenameWithExtension === '<input>' || filenameWithExtension === '<text>'
        || !filenameWithExtension) {
        return {};
    }

    let hasDecorator = false;

    return {
        ClassDeclaration(node: estree.ClassDeclaration) {
            hasDecorator = hasStateDecorator(node);
        },
        Program() {
            hasDecorator = false;
        },
        'Program:exit'(node: estree.Program) {
            if (hasDecorator && !filenameWithExtension.endsWith('.state.ts')) {
                context.report({
                    messageId: 'default',
                    node,
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
            description: 'States should have a `.state.ts` suffix for the filename',
            url: 'https://www.ngxs.io/recipes/style-guide#state-filenames',
            category: 'Best Practices',
            recommended: 'warn',
        },
        schema: <any>undefined,
        type: 'suggestion',
        messages: {
            default: 'States should have a `.state.ts` suffix for the filename',
        }
    },
};
