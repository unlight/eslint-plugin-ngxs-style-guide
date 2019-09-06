import * as stateSuffix from './state-suffix/state-suffix';
import * as stateFilenames from './state-filenames/state-filenames';
import * as stateInterfaces from './state-interfaces/state-interfaces';

export const rules = {
    'state-suffix': stateSuffix.rule,
    'state-filenames': stateFilenames.rule,
    'state-interfaces': stateInterfaces.rule,
};

export const configs = {
    recommended: {
        rules: Object.keys(rules).reduce((result, current) => {
            result[current] = 1;
            return result;
        }, {}),
    },
};
