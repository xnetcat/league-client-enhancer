export default function doInBackground(config) {
    const ipcRenderer = window.require("electron").ipcRenderer
    let inChampSelect = false

    ipcRenderer.on("lcu-api-data", (event, arg) => {
        if (arg.pluginName === "easy-queue-dodge") {
            switch (arg.endpoint) {
                case "/lol-champ-select/v1/session":
                    if (arg.response.status === 404) {
                        inChampSelect = false
                    } else {
                        if (!inChampSelect) {
                            ipcRenderer.send("notification-request", {
                                message:
                                    "You are in champion select, press button below to dodge",
                                actions: [
                                    {
                                        label: "Dodge queue",
                                        toSend: [
                                            {
                                                channel: "lcu-api-request",
                                                endpoint:
                                                    "/lol-login/v1/session/invoke?destination=gameService&method=quitGame",
                                                method: "post",
                                                data: {
                                                    args: "%5B%5D",
                                                },
                                                pluginName: "easy-queue-dodge",
                                            },
                                            {
                                                channel: "lcu-api-request",
                                                endpoint: "/lol-lobby/v2/lobby",
                                                method: "delete",
                                                data: {},
                                                pluginName: "easy-queue-dodge",
                                            },
                                        ],
                                    },
                                ],
                            })
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
            pluginName: "easy-queue-dodge",
            endpoint: "/lol-champ-select/v1/session",
            method: "get",
            data: {},
        })
    }, config.interval)
}
