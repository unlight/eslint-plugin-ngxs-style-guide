import { ruleTester } from '../index.spec';
import { rule } from './select-suffix';

it(rule.create.name, () => {
    ruleTester.run(rule.create.name, rule, {
        invalid: [
            {
                code: `class ZooComponent { @Select(ZooState) animals }`,
                errors: [{ messageId: 'default' }],
                output: `class ZooComponent { @Select(ZooState) animals$ }`,
            },
        ],
        valid: [
            `class ZooComponent { @Select(ZooState) animals$ }`,
            `class FoodComponent { @Food(ZooState) animals }`,
        ],
    });
});
