import { eslint, isIdentifierEndsWith, estree, hasStateDecorator } from '../utils';
import { Nullable } from 'simplytyped';

export const message = 'A state should always be suffixed with the word `State`';

function create(context: eslint.RuleContext<string, never>) {
    return {
        ClassDeclaration(node: estree.ClassDeclaration) {
            if (hasStateDecorator(node) && !isIdentifierEndsWith(node, 'State')) {
                context.report({
                    // @ts-ignore
                    message,
                    node: node.id,
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
    create,
    meta: <any>undefined,
};
