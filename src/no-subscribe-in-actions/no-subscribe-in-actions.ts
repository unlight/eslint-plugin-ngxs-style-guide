import { eslint, estree, getParentFunction, getParentClass, getDecoratorByName, hasActionDecorator, hasStateDecorator } from '../utils';

export const message = 'Do not subscribe in actions, return Observable';

function create(context: eslint.RuleContext<string, never>) {

    // console.log("context.parserServices!.program", context.parserServices!.program);

    return {
        MemberExpression(node: estree.MemberExpression) {
            if (node.property && node.property.type === 'Identifier' && node.property.name === 'subscribe') {
                const method = getParentFunction(node);
                if (method && hasActionDecorator(method)) {
                    const pclass = getParentClass(method);
                    if (pclass && hasStateDecorator(pclass)) {
                        context.report({
                            // @ts-ignore
                            message,
                            node: node.property,
                        });
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
