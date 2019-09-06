import { getDecoratorByName, isClassProperty, estree, eslint } from '../utils';

export const message = 'Actions should NOT have a suffix `Action`';

function create(context: eslint.RuleContext<string, never>) {

    let className: string | undefined = undefined;
    let hasStaticReadonlyType = false;
    let isActionClass = false;

    return {
        ClassDeclaration(node: estree.ClassDeclaration) {
            className = node.id && node.id.name;
        },
        'ClassDeclaration:exit'(node: estree.ClassDeclaration) {
            if (isActionClass && className && className.endsWith('Action')) {
                context.report({
                    // @ts-ignore
                    message,
                    node: node.id,
                });
            }
            isActionClass = false;
            className = undefined;
            hasStaticReadonlyType = false;
        },
        ClassProperty(node: estree.ClassProperty) {
            if (className) {
                hasStaticReadonlyType = (node.key as estree.Identifier).name === 'type'
                    && node.readonly === true && node.static === true;

                if (node.value.type === 'Literal') {
                    const value = node.value.value as string;
                    if (/^\[[A-Z][A-Za-z]+\]/.test(value)) {
                        isActionClass = true;
                    }
                }
            }
        },
    };
}

export const rule: eslint.RuleModule<string, never> = {
    create,
    meta: undefined as any,
};
