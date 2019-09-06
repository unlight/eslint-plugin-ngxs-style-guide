import * as stateInterfaces from './state-interfaces';
import { ruleTester } from '../index.spec';

it('state-interfaces', () => {

    ruleTester.run('state-interfaces', stateInterfaces.rule as any, {
        invalid: [
            {
                code: `@State<IZooState>() class ZooState { }`,
                errors: [{ message: stateInterfaces.message } as any],
                output: `@State<IZooStateModel>() class ZooState { }`,
            },
        ],
        valid: [
            `@State<ZooStateModel>() class ZooState { }`,
        ],
    });

});
