import React from "react"

export default class AutoSaveRunesWindow extends React.Component {
    componentDidMount() {
        const ipcRenderer = window.require("electron").ipcRenderer

        setInterval(() => {
            ipcRenderer
                .invoke("lcu-api-request", {
                    pluginName: "more-runes",
                    endpoint: "/lol-champ-select/v1/session",
                    method: "get",
                    data: {},
                })
                .then((data) => {
                    if (data.response.status === 404) {
                        console.log("should exit")
                        window.close()
                    } else {
                        console.log(data)
                        console.log("but does not")
                    }
                })
            ipcRenderer
                .invoke("lcu-api-request", {
                    pluginName: "more-runes",
                    endpoint: "/lol-perks/v1/currentpage",
                    method: "get",
                    data: {},
                })
                .then((result) => {
                    console.log("jeff")
                })
        }, 1000)
    }

    render() {
        return <h1>TEST</h1>
    }
}
