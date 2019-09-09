import { PlainObject } from 'simplytyped';
import { oc } from 'ts-optchain';
import keyBy from '1-liners/keyBy';
import { rule as stateSuffix } from './state-suffix/state-suffix';
import { rule as stateFilenames } from './state-filenames/state-filenames';
import { rule as stateInterfaces } from './state-interfaces/state-interfaces';
import { rule as actionSuffixes } from './action-suffixes/action-suffixes';
import { rule as pluginSuffix } from './plugin-suffix/plugin-suffix';
import { rule as selectSuffix } from './select-suffix/select-suffix';

const allRules = [
    stateFilenames,
    stateInterfaces,
    actionSuffixes,
    stateSuffix,
    pluginSuffix,
    selectSuffix,
];

const recommendedRules = [
    stateFilenames,
    stateInterfaces,
    actionSuffixes,
    stateSuffix,
    pluginSuffix,
    selectSuffix,
];

export const rules = keyBy(allRules, rule => rule.id);

export const configs = {
    recommended: {
        rules: recommendedRules.reduce((result, rule) => {
            result[`ngxs-style-guide/${rule.id}`] = oc(rule).meta.docs.recommended(false);
            return result;
        }, <PlainObject>{}),
    }
};
