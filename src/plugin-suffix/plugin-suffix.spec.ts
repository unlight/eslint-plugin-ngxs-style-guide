import { ruleTester } from '../index.spec';
import { rule } from './plugin-suffix';

it(rule.create.name, () => {
    ruleTester.run('plugin-suffix', rule, {
        invalid: [
            {
                code: `class Logger implements NgxsPlugin { }`,
                errors: [{ messageId: 'default' }],
            },
        ],
        valid: [`class LoggerPlugin implements NgxsPlugin { }`],
    });
});
