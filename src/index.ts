import * as stateSuffix from './state-suffix/state-suffix';
import * as stateFilenames from './state-filenames/state-filenames';

export const rules = {
    'state-suffix': stateSuffix.rule,
    'state-filenames': stateFilenames.rule,
};

export const configs = {
    recommended: {
        rules: {
            'state-suffix': 1,
            'state-filenames': 1,
        }
    }
};
