import * as stateFilenames from './state-filenames';
import { ruleTester } from '../index.spec';

it('state-filenames', () => {

    ruleTester.run('state-filenames', stateFilenames.rule as any, {
        invalid: [
            {
                filename: 'src/zoo.ts',
                code: `@State() class ZooState { }`,
                errors: [{ message: stateFilenames.message } as any],
            },
        ],
        valid: [
            {
                filename: 'src/zoo.state.ts',
                code: '@State() class ZooState { }',
            },
            {
                code: 'class ValidFileName {}',
                filename: 'src/zoo.state.ts',
            },
            {
                filename: 'src/zoo.ts',
                code: `class ZooState { }`,
            },
        ],
    });

});
