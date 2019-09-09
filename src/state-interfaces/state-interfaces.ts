import { oc } from 'ts-optchain';
import { getDecoratorByName, isClassDeclaration, eslint, estree, getRuleId, CustomRule } from '../utils';

function create(context: eslint.RuleContext<string, never>) {
    return {
        ClassDeclaration(node: estree.Node) {
            if (!isClassDeclaration(node)) {
                throw new TypeError(`Unexpected node type (${node.type}), expected ClassDeclaration`);
            }
            const decoratorNode: any = getDecoratorByName(node, 'State');
            if (decoratorNode != undefined) {
                const typeName: any = oc(decoratorNode).expression.typeParameters.params[0].typeName();
                if (typeName != undefined && !typeName.name.endsWith('Model')) {
                    context.report({
                        messageId: 'default',
                        node,
                        fix: fixer => {
                            let result: ReturnType<typeof fixer.replaceTextRange> | null = null;
                            if (node.id) {
                                const newName = `${typeName.name}Model`;
                                result = fixer.replaceTextRange(typeName.range, newName);
                            }
                            return result;
                        },
                    });
                }
            }
        },
    };
}

export const rule: CustomRule = {
    id: getRuleId(__filename),
    create,
    meta: {
        docs: {
            url: 'https://www.ngxs.io/recipes/style-guide#state-interfaces',
            description: 'State interfaces should be named the name of the state followed by the Model suffix.',
            category: 'Best Practices',
            recommended: 'warn',
        },
        type: 'suggestion',
        fixable: 'code',
        messages: {
            default: 'State interfaces should be named the name of the state followed by the `Model` suffix',
        },
        schema: <any>undefined,
    },
};
