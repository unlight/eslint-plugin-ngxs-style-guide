import { rule } from './select-suffix';
import { ruleTester } from '../index.spec';

it('select-suffix', () => {

    ruleTester.run('select-suffix', rule, {
        invalid: [
            {
                code: `class ZooComponent { @Select(ZooState) animals }`,
                errors: [{ messageId: 'suffix' }],
                output: `class ZooComponent { @Select(ZooState) animals$ }`,
            },
        ],
        valid: [
            `class ZooComponent { @Select(ZooState) animals$ }`,
            `class FoodComponent { @Food(ZooState) animals }`,
        ],
    });

});
