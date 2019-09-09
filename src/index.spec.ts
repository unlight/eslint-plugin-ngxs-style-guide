import { TSESLint } from '@typescript-eslint/experimental-utils';
import { rules, configs } from '.';
import * as assert from 'assert';
import { join } from 'path';
import { readFileSync } from 'fs';

export const ruleTester = new TSESLint.RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {},
    },
    parser: require.resolve('@typescript-eslint/parser'),
});

export const fixtureProjectFile = join(__dirname, '..', 'tsconfig.fixture.json');
export const fixtureFile = JSON.parse(readFileSync(fixtureProjectFile, 'utf8')).files[0];

it('rules', () => {
    const size = Object.keys(rules).length;
    assert.ok(size >= 7);
});

it('recommended rules enabled', () => {
    Object.entries(configs.recommended.rules).forEach(([name, state]) => {
        assert.ok(name, name);
        assert.ok(state === 'warn', `${name} state`);
    });
});
