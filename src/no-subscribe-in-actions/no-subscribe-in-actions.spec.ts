import { ruleTester } from '../index.spec';
import * as impl from './no-subscribe-in-actions';

it('no-subscribe-in-actions', () => {

    ruleTester.run('no-subscribe-in-actions', impl.rule as any, {
        invalid: [
            {
                code: `@State() class AppState { @Action() initialized() { this.s.subscribe() } }`,
                errors: [{ message: impl.message } as any],
            },
        ],
        valid: [
        ],
    });

});
