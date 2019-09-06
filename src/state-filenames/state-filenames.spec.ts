import { TSESLint } from '@typescript-eslint/experimental-utils';
import * as parser from '@typescript-eslint/parser';
import * as stateFilenames from './state-filenames';

const ruleTester = new TSESLint.RuleTester({
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {},
    },
    parser: require.resolve('@typescript-eslint/parser'),
});

// ruleTester.run('state-suffix', stateFilenames.rule as any, {
//     invalid: [
//         {
// filename: 'src/xxx',
//             code: `@State() class Zoo { }`,
//             errors: [{ message: stateFilenames.message } as any],
//             output: `@State() class ZooState { }`,
//         },
//     ],
//     valid: [`@State() class ZooState { }`, `@Foo() class Zoo { }`],
// });
