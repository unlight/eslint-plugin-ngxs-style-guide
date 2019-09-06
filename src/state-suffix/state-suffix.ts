import { getDecoratorByName, isClassDeclaration, eslint } from '../utils';

export const message = 'A state should always be suffixed with the word `State`';


function create(context: eslint.RuleContext<string, never>) {
    return {
        ClassDeclaration(node) {
            if (!isClassDeclaration(node)) {
                throw new TypeError(`Unexpected node type (${node.type}), expected ClassDeclaration`);
            }
            const decoratorNode = getDecoratorByName(node, 'State');
            if (decoratorNode != undefined) {
                if (!(node.id && node.id.name.endsWith('State'))) {
                    context.report({
                        // @ts-ignore
                        message,
                        node: node.id,
                        fix: fixer => {
                            let result: ReturnType<typeof fixer.replaceTextRange> | null = null;
                            if (node.id) {
                                const newName = `${node.id.name}State`;
                                result = fixer.replaceTextRange(node.id.range!, newName);
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
