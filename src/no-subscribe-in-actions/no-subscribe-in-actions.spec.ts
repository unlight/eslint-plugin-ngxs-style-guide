import { ruleTester } from '../index.spec';
import { rule } from './no-subscribe-in-actions';

it(rule.id, () => {
    ruleTester.run(rule.id, rule, {
        invalid: [
            {
                code: `@State() class AppState { @Action() initialized() { this.s.subscribe() } }`,
                errors: [{ messageId: 'default' }]
            }
        ],
        valid: [],
    });
});
