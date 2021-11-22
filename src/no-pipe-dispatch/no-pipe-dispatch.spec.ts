import stripIndent from 'strip-indent';

import { ruleTester } from '../index.spec';
import { rule } from './no-pipe-dispatch';

it(rule.create.name, () => {
    ruleTester.run(rule.create.name, rule, {
        invalid: [
            {
                code: stripIndent(`
                  store.dispatch(new Action()).pipe()
                `),
                errors: [{ messageId: 'default' }],
            },
        ],
        valid: [`store.dispatch(new Action())`],
    });
});
