import { eslint, estree, hasStateDecorator } from '../utils';

function stateFilenames(context: eslint.RuleContext<string, never>) {
    const filenameWithExtension = context.getFilename();
    if (
        filenameWithExtension === '<input>' ||
        filenameWithExtension === '<text>' ||
        !filenameWithExtension
    ) {
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

export const rule: eslint.RuleModule<string, never> = {
    create: stateFilenames,
    meta: {
        docs: {
            description: 'States should have a `.state.ts` suffix for the filename',
            url: 'https://www.ngxs.io/recipes/style-guide#state-filenames',
            recommended: 'warn',
        },
        type: 'suggestion',
        messages: {
            default: 'States should have a `.state.ts` suffix for the filename',
        },
        schema: {},
    },
};
