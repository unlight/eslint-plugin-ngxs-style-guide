import { ruleTester } from '../index.spec';
import { rule } from './state-interfaces';

it(rule.create.name, () => {
    ruleTester.run('state-interfaces', rule, {
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
