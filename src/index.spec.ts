import { TSESLint } from '@typescript-eslint/experimental-utils';
import { ok } from 'assert';
import { readFileSync } from 'fs';
import { join } from 'path';

import { configs, rules } from '.';

export const ruleTester = new TSESLint.RuleTester({
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {},
    },
    parser: require.resolve('@typescript-eslint/parser'),
});

export const fixtureProjectFile = join(__dirname, '..', 'tsconfig.fixture.json');
export const fixtureFile = JSON.parse(readFileSync(fixtureProjectFile, 'utf8'))
    .files[0];

it('rules', () => {
    const size = Object.keys(rules).length;
    ok(size >= 8);
});

it('recommended rules enabled', () => {
    for (const [name, state] of Object.entries(configs.recommended.rules)) {
        ok(name, name);
        ok(state === 'warn', `${name} state`);
    }
});

it('some rules are not recommended', () => {
    const rules = Object.keys(configs.recommended.rules);

    ok(!rules.includes('no-pipe-dispatch'));
});
