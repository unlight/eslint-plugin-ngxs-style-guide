import { getDecoratorByName, isClassProperty, estree, eslint } from '../utils';

export const message = 'Selects should have a `$` suffix';

function create(context: eslint.RuleContext<string, never>) {
    return {
        ClassProperty(node: estree.Node) {
            if (!isClassProperty(node)) {
                throw new TypeError(`Unexpected node type (${node.type}), expected ClassDeclaration`);
            }
            const decoratorNode = getDecoratorByName(node, 'Select');
            if (decoratorNode == undefined) {
                return;
            }
            // Class property has @Select decorator, check name
            const propertyName = (node.key as estree.Identifier).name;
            if (!propertyName.endsWith('$')) {
                context.report({
                    // @ts-ignore
                    message,
                    node: node.key,
                    fix: (fixer) => {
                        const newName = `${propertyName}$`;
                        return fixer.replaceTextRange(node.key.range, newName);
                    }
                });
            }
        }
    };
}

export const rule: eslint.RuleModule<string, never> = {
    create,
    meta: undefined as any,
};
