import { ruleTester, fixtureFile, fixtureProjectFile } from '../index.spec';
import { rule } from './return-observable-in-actions';

const testName = 'return-observable-in-actions';

it(testName, () => {

    ruleTester.run(testName, rule, {
        invalid: [],
        valid: [
            {
                code: '',
                filename: fixtureFile,
                parserOptions: {
                    project: fixtureProjectFile,
                },
            },
        ],
    });

});
