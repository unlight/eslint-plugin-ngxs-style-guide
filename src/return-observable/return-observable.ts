import { typecheck ,
    eslint,
    estree,
    getParentFunction,
    getParentClass,
    hasActionDecorator,
    hasStateDecorator,
} from '../utils';

function noSubscribeInActions(context: eslint.RuleContext<string, never>) {
    const tc = typecheck(context);

    return {
        Identifier(node: estree.Node) {
            console.log('node', node);
        },
    };
}

export const rule: eslint.RuleModule<string, never> = {
    create: noSubscribeInActions,
    meta: {
        type: 'problem',
        schema: {},
        docs: {
            category: 'Possible Errors',
            description: '',
            recommended: 'warn',
            url: '',
        },
        messages: { default: 'return Observable' },
    },
};
