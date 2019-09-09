import { rule } from './state-filenames';
import { ruleTester } from '../index.spec';

it(rule.id, () => {

    ruleTester.run(rule.id, rule, {
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
