import { Rule } from 'eslint';
import { ClassDeclaration, Node } from 'estree';
import { oc } from 'ts-optchain';
import { getDecoratorByName, isClassDeclaration } from '../utils';

export const message = 'State interfaces should be named the name of the state followed by the `Model` suffix';

function create(context: Rule.RuleContext) {
    return {
        ClassDeclaration(node: Node) {
            if (!isClassDeclaration(node)) {
                throw new TypeError(`Unexpected node type (${node.type}), expected ClassDeclaration`);
            }
            const decoratorNode: any = getDecoratorByName(node, 'State');
            if (decoratorNode != undefined) {
                const typeName: any  = oc(decoratorNode).expression.typeParameters.params[0].typeName();
                if (typeName != undefined && !typeName.name.endsWith('Model')) {
                    context.report({
                        node,
                        message,
                        fix: fixer => {
                            let result: ReturnType<typeof fixer.replaceTextRange> | null = null;
                            if (node.id) {
                                const newName = `${typeName.name}Model`;
                                result = fixer.replaceTextRange(typeName.range!, newName);
                            }
                            return result;
                        },
                    });
                }
            }
        },
    };
}

export const rule = {
    create,
};
