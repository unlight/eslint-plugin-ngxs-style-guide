import { rule } from './state-suffix';
import { ruleTester } from '../index.spec';

it(rule.create.name, () => {
    ruleTester.run(rule.create.name, rule, {
        invalid: [
            {
                code: `@State() class Zoo { }`,
                errors: [{ messageId: 'default' }],
                output: `@State() class ZooState { }`,
            },
        ],
        valid: [`@State() class ZooState { }`, `@Foo() class Zoo { }`],
    });
});
