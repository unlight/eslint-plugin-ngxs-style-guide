import { TSESLint } from '@typescript-eslint/experimental-utils';
import { rules, configs } from '.';
import * as assert from 'assert';
import * as path from 'path';

export const ruleTester = new TSESLint.RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {},
    },
    parser: require.resolve('@typescript-eslint/parser'),
});


export const fixtureFile = path.join(__dirname, '..', 'file.fixture.ts');
export const fixtureProjectFile = path.join(__dirname, '..', 'tsconfig.fixture.json');

it('rules', () => {
    const size = Object.keys(rules).length;
    assert(size > 0);
});

it('recommended rules enabled', () => {
    Object.entries(configs.recommended.rules).forEach(([name, state]) => {
        assert(name, name);
        assert(state === 1, `${name} state`);
    });
});
