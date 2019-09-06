import { getDecoratorByName, isClassDeclaration } from '../utils';
import { Rule } from 'eslint';

export const message = 'A state should always be suffixed with the word `State`';

export const rule: Rule.RuleModule = {
    create(context) {
        const filenameWithExtension = context.getFilename();
        if (filenameWithExtension === '<input>' || filenameWithExtension === '<text>') {
            return {};
        }

        return {
            Program: node => {},
        };
        // return {
        //     ClassDeclaration(node) {
        //         if (!isClassDeclaration(node)) {
        //             throw new TypeError(`Unexpected node type (${node.type}), expected ClassDeclaration`);
        //         }
        //         const decoratorNode = getDecoratorByName(node, 'State');
        //         if (decoratorNode != null) {
        //             if (!(node.id && node.id.name.endsWith('State'))) {
        //                 context.report({
        //                     node: node.id as any,
        //                     message,
        //                     fix: fixer => {
        //                         let result: ReturnType<typeof fixer.replaceTextRange> | null = null;
        //                         if (node.id) {
        //                             const newName = `${node.id.name}State`;
        //                             result = fixer.replaceTextRange(node.id.range!, newName);
        //                         }
        //                         return result;
        //                     },
        //                 });
        //             }
        //         }
        //     },
        // };
    },
};
