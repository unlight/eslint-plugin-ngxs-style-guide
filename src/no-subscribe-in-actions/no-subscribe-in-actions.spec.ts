import { ruleTester } from '../index.spec';
import { rule } from './no-subscribe-in-actions';

it(rule.create.name, () => {
    ruleTester.run(rule.create.name, rule, {
        invalid: [
            {
                code: `@State() class AppState { @Action() initialized() { this.s.subscribe() } }`,
                errors: [{ messageId: 'default' }],
            },
        ],
        valid: [`@State() class AppState { @Action() initialized() { return s } }`],
    });
});
