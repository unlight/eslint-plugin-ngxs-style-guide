import * as stateSuffix from './state-suffix';
import { ruleTester } from '../index.spec';

it('state-suffix', () => {

    ruleTester.run('state-suffix', stateSuffix.rule, {
        invalid: [
            {
                code: `@State() class Zoo { }`,
                errors: [{ message: stateSuffix.message } as any],
                output: `@State() class ZooState { }`,
            },
        ],
        valid: [`@State() class ZooState { }`, `@Foo() class Zoo { }`],
    });

});
