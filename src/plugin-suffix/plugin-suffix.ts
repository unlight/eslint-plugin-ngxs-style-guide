import { estree, eslint, isImplements, isIdentifierEndsWith } from '../utils';

export const message = 'Plugins should end with the `Plugin` suffix';

function create(context: eslint.RuleContext<string, never>) {

    return {
        ClassDeclaration(node: estree.ClassDeclaration) {
            if (node.id && isImplements(node, 'NgxsPlugin')) {
                if (!isIdentifierEndsWith(node, 'Plugin')) {
                    context.report({
                        // @ts-ignore
                        message,
                        node: node.id,
                    });
                }
            }
        },
    };
}

export const rule: eslint.RuleModule<string, never> = {
    create,
    meta: undefined as any,
};
