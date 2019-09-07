import * as pluginSuffix from './plugin-suffix';
import { ruleTester } from '../index.spec';

it('select-suffix', () => {

    ruleTester.run('plugin-suffix', pluginSuffix.rule as any, {
        invalid: [
            {
                code: `class Logger implements NgxsPlugin { }`,
                errors: [{ message: pluginSuffix.message } as any],
            },
        ],
        valid: [
            `class LoggerPlugin implements NgxsPlugin { }`,
        ],
    });

});
