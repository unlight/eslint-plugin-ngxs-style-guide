import { rule as stateSuffix } from './state-suffix/state-suffix';
import { rule as stateFilenames } from './state-filenames/state-filenames';
import { rule as stateInterfaces } from './state-interfaces/state-interfaces';
import { rule as actionSuffixes } from './action-suffixes/action-suffixes';
import { rule as pluginSuffix } from './plugin-suffix/plugin-suffix';
import { rule as selectSuffix } from './select-suffix/select-suffix';
import { rule as noSubscribeInActions } from './no-subscribe-in-actions/no-subscribe-in-actions';

export const rules = {
    'state-filenames': stateFilenames,
    'state-interfaces': stateInterfaces,
    'action-suffixes': actionSuffixes,
    'state-suffix': stateSuffix,
    'plugin-suffix': pluginSuffix,
    'select-suffix': selectSuffix,
    'no-subscribe-in-actions': noSubscribeInActions,
};

export const configs = {
    recommended: {
        rules: {
            'ngxs-style-guide/state-filenames': 1,
            'ngxs-style-guide/state-interfaces': 1,
            'ngxs-style-guide/action-suffixes': 1,
            'ngxs-style-guide/state-suffix': 1,
            'ngxs-style-guide/plugin-suffix': 1,
            'ngxs-style-guide/select-suffix': 1,
        },
    },
};
