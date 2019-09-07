import * as stateSuffix from './state-suffix/state-suffix';
import * as stateFilenames from './state-filenames/state-filenames';
import * as stateInterfaces from './state-interfaces/state-interfaces';
import * as selectSuffix from './select-suffix/select-suffix';
import * as actionSuffixes from './action-suffixes/action-suffixes';
import * as pluginSuffix from './plugin-suffix/plugin-suffix';

export const rules = {
    'state-filenames': stateFilenames.rule,
    'state-interfaces': stateInterfaces.rule,
    'action-suffixes': actionSuffixes.rule,
    'state-suffix': stateSuffix.rule,
    'select-suffix': selectSuffix.rule,
    'plugin-suffix': pluginSuffix.rule,
};

export const configs = {
    recommended: {
        rules: Object.keys(rules).reduce((result, current) => {
            result[`ngxs-style-guide/${current}`] = 1;
            return result;
        }, {})
    }
};
