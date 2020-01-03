import { rule } from './state-interfaces';
import { ruleTester } from '../index.spec';

it(rule.create.name, () => {
    ruleTester.run('state-interfaces', rule as any, {
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
