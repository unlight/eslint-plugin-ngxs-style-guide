import { hasStateDecorator, estree, eslint } from '../utils';

export const message = 'States should have a `.state.ts` suffix for the filename';

function create(context: eslint.RuleContext<string, never>) {
    const filenameWithExtension = context.getFilename();
    if (filenameWithExtension === '<input>' || filenameWithExtension === '<text>') {
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
            if (hasDecorator) {
                context.report({
                    // @ts-ignore
                    message,
                    node,
                });
            }
        },
    };
}

export const rule = {
    create,
};
