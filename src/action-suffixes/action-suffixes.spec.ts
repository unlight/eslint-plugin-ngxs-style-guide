import * as actionSuffixes from './action-suffixes';
import { ruleTester } from '../index.spec';

it('select-suffix', () => {

    ruleTester.run('action-suffixes', actionSuffixes.rule as any, {
        invalid: [
            {
                code: `class FeedZebraAction { static readonly type = '[Zoo] Feed Zebra' }`,
                errors: [{ message: actionSuffixes.message } as any],
            },
        ],
        valid: [
            `class FeedZebra { static readonly type = '[Zoo] Feed Zebra' }`,
            `class Feed { static readonly type = 'x [Zoo] Feed' }`,
        ],
    });

});
