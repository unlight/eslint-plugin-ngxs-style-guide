import { rule as actionSuffixes } from './action-suffixes/action-suffixes';
import { rule as noPipeDispatch } from './no-pipe-dispatch/no-pipe-dispatch';
import { rule as noSubscribeInActions } from './no-subscribe-in-actions/no-subscribe-in-actions';
import { rule as pluginSuffix } from './plugin-suffix/plugin-suffix';
import { rule as selectSuffix } from './select-suffix/select-suffix';
import { rule as stateFilenames } from './state-filenames/state-filenames';
import { rule as stateInterfaces } from './state-interfaces/state-interfaces';
import { rule as stateSuffix } from './state-suffix/state-suffix';

export const rules = {
    'state-filenames': stateFilenames,
    'state-interfaces': stateInterfaces,
    'action-suffixes': actionSuffixes,
    'state-suffix': stateSuffix,
    'plugin-suffix': pluginSuffix,
    'select-suffix': selectSuffix,
    'no-subscribe-in-actions': noSubscribeInActions,
    'no-pipe-dispatch': noPipeDispatch,
};

export const configs = {
    recommended: {
        rules: Object.fromEntries(
            Object.keys(rules)
                .filter(rule => rule !== 'no-pipe-dispatch')
                .map(rule => [`ngxs-style-guide/${rule}`, 'warn']),
        ),
    },
};
