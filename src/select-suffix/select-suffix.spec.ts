import { rule } from './select-suffix';
import { ruleTester } from '../index.spec';

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
