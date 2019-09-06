import { hasStateDecorator } from '../utils';
import { Rule } from 'eslint';
import * as estree from 'estree';

export const message = 'States should have a `.state.ts` suffix for the filename';

function create(context: Rule.RuleContext) {
    const filenameWithExtension = context.getFilename();
    if (filenameWithExtension === '<input>' || filenameWithExtension === '<text>') {
        return {};
    }

    let hasDecorator = false;

    return {
        ClassDeclaration(node: estree.ClassDeclaration) {
            hasDecorator = hasStateDecorator(node);
        },
        'Program:exit'(node: estree.Program) {
            if (hasDecorator) {
                context.report({
                    node,
                    message,
                });
            }
        },
    };
}

export const rule = {
    create
};
