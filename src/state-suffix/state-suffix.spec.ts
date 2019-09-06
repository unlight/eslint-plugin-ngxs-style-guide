import { TSESLint } from '@typescript-eslint/experimental-utils';
import * as parser from '@typescript-eslint/parser';
import * as stateSuffix from './state-suffix';

const ruleTester = new TSESLint.RuleTester({
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {},
    },
    parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('state-suffix', stateSuffix.rule as any, {
    invalid: [
        {
            code: `@State() class Zoo { }`,
            errors: [{ message: stateSuffix.message } as any],
            output: `@State() class ZooState { }`,
        },
    ],
    valid: [`@State() class ZooState { }`, `@Foo() class Zoo { }`],
});
