import { ruleTester } from '../index.spec';
import { rule } from './state-filenames';

it(rule.create.name, () => {
    ruleTester.run('state-filenames', rule, {
        invalid: [
            {
                filename: 'src/zoo.ts',
                code: `@State() class ZooState { }`,
                errors: [{ messageId: 'default' }],
            },
        ],
        valid: [
            {
                filename: 'src/zoo.state.ts',
                code: '@State() class ZooState { }',
            },
            {
                code: 'class ValidFileName {}',
                filename: 'src/zoo.state.ts',
            },
            {
                filename: 'src/zoo.ts',
                code: `class ZooState { }`,
            },
        ],
    });
});
