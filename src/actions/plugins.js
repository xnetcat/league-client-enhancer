export const PLUGINS_CURRENT_SET = "PLUGINS_CURRENT_SET"

export function setCurrentPlugins(plugins) {
    return {
        type: PLUGINS_CURRENT_SET,
        plugins,
    }
}
