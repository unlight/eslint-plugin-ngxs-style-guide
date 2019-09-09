import { rule } from './plugin-suffix';
import { ruleTester } from '../index.spec';

it(rule.id, () => {

    ruleTester.run(rule.id, rule, {
        invalid: [
            {
                code: `class Logger implements NgxsPlugin { }`,
                errors: [{ messageId: 'default' }],
            },
        ],
        valid: [
            `class LoggerPlugin implements NgxsPlugin { }`,
        ],
    });

});
