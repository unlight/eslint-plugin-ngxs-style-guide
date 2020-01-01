import { rule } from './action-suffixes';
import { ruleTester } from '../index.spec';

it(rule.create.name, () => {
    ruleTester.run(rule.create.name, rule, {
        invalid: [
            {
                code: `class FeedZebraAction { static readonly type = '[Zoo] Feed Zebra' }`,
                errors: [{ messageId: 'default' }],
            },
        ],
        valid: [
            `class FeedZebra { static readonly type = '[Zoo] Feed Zebra' }`,
            `class Feed { static readonly type = 'x [Zoo] Feed' }`,
        ],
    });
});
