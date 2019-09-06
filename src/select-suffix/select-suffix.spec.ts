import * as stateSuffix from './select-suffix';
import { ruleTester } from '../index.spec';

it('select-suffix', () => {

    ruleTester.run('select-suffix', stateSuffix.rule as any, {
        invalid: [
            {
                code: `class ZooComponent { @Select(ZooState) animals }`,
                errors: [{ message: stateSuffix.message } as any],
                output: `class ZooComponent { @Select(ZooState) animals$ }`,
            },
        ],
        valid: [
            `class ZooComponent { @Select(ZooState) animals$ }`,
            `class FoodComponent { @Food(ZooState) animals }`,
        ],
    });

});
