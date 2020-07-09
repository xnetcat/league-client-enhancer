import { PLUGINS_CURRENT_SET } from "../actions/plugins";
import pluginsInfo from '../plugins'

const initialState = {
    data: pluginsInfo()
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case PLUGINS_CURRENT_SET:
            return {
                data: action.plugins
            };

        default:
            return state;
    }
};
