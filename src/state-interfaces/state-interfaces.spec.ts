import { rule } from './state-interfaces';
import { ruleTester } from '../index.spec';

it(rule.id, () => {

    ruleTester.run(rule.id, rule, {
        invalid: [
            {
                code: `@State<IZooState>() class ZooState { }`,
                errors: [{ messageId: 'default' }],
                output: `@State<IZooStateModel>() class ZooState { }`,
            },
        ],
        valid: [
            `@State<ZooStateModel>() class ZooState { }`,
            `@Other<OtherType>() class OtherClass { }`,
        ],
    });

});
