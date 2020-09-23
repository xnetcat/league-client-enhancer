export default function doInBackground(config) {
    const ipcRenderer = window.require("electron").ipcRenderer
    let inChampSelect = false

    ipcRenderer.on("lcu-api-data", (event, arg) => {
        if (arg.pluginName === "more-runes") {
            switch (arg.endpoint) {
                case "/lol-champ-select/v1/session":
                    if (arg.response.status === 404) {
                        inChampSelect = false
                    } else {
                        if (!inChampSelect) {
                            window.open(
                                "http://localhost:3000/#/plugin/more-runes/window"
                            )
                        }
                        inChampSelect = true
                    }
                    break
                default:
                    break
            }
        }
    })
    return setInterval(() => {
        ipcRenderer.send("lcu-api-request", {
            pluginName: "more-runes",
            endpoint: "/lol-champ-select/v1/session",
            method: "get",
            body: {},
        })
    }, config.interval)
}
