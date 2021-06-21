import { oc } from 'ts-optchain';

import { eslint, estree, getDecoratorByName, isClassDeclaration } from '../utils';

function stateInterfaces(context: eslint.RuleContext<string, never>) {
    return {
        ClassDeclaration(node: estree.Node) {
            if (!isClassDeclaration(node)) {
                throw new TypeError(
                    `Unexpected node type (${node.type}), expected ClassDeclaration`,
                );
            }
            const decoratorNode: any = getDecoratorByName(node, 'State');
            if (decoratorNode != undefined) {
                const typeName: any =
                    oc(decoratorNode).expression.typeParameters.params[0].typeName();
                if (typeName != undefined && !typeName.name.endsWith('Model')) {
                    context.report({
                        messageId: 'default',
                        node,
                        fix: fixer => {
                            let result: ReturnType<
                                typeof fixer.replaceTextRange
                            > | null = null;
                            if (node.id) {
                                const newName = `${typeName.name}Model`;
                                result = fixer.replaceTextRange(
                                    typeName.range,
                                    newName,
                                );
                            }
                            return result;
                        },
                    });
                }
            }
        },
    };
}

export const rule: eslint.RuleModule<string, never> = {
    create: stateInterfaces,
    meta: {
        type: 'suggestion',
        fixable: 'code',
        schema: {},
        docs: {
            category: 'Stylistic Issues',
            description:
                'State interfaces should be named the name of the state followed by the `Model` suffix',
            recommended: 'warn',
            url: 'https://www.ngxs.io/recipes/style-guide#state-interfaces',
        },
        messages: {
            default:
                'State interfaces should be named the name of the state followed by the `Model` suffix',
        },
    },
};
