import React from 'react'
import {Typography} from "@rmwc/typography"

export class DodgeQueueSettings extends React.Component{
    render() {
        return(
            <>
                <Typography use="headline1" >TEST</Typography>
            </>
            )

    }
}

export function doInBackground(lcuData) {
    const ipcRenderer = window.require('electron').ipcRenderer
    let inChampSelect = false

    ipcRenderer.on('lcu-api-data', (event, arg) => {
        if (arg.pluginName === 'easy-queue-dodge') {
            if (arg.response.status === 404) {
                inChampSelect = false
            } else {
                if(!inChampSelect) {
                    ipcRenderer.send('notification-request', {
                        message: "You are in champion select, press button below to dodge",
                        actions: [
                            {
                                label: 'Dodge queue',
                                toSend: [{
                                    channel: 'lcu-api-request',
                                    lcuData,
                                    endpoint: '/lol-login/v1/session/invoke?destination=gameService&method=quitGame',
                                    method: 'post',
                                    data: {
                                        args: '%5B%5D'
                                    },
                                    pluginName: 'easy-queue-dodge'
                                },{
                                    channel: 'lcu-api-request',
                                    lcuData,
                                    endpoint: '/lol-lobby/v2/lobby',
                                    method: 'delete',
                                    data: {},
                                    pluginName: 'easy-queue-dodge'
                                }]
                            }
                        ]
                    })
                }
                inChampSelect = true
            }
        }
    })
    return setInterval(() => {       
        ipcRenderer.send('lcu-api-request', {
            lcuData,
            pluginName: 'easy-queue-dodge',
            endpoint: '/lol-champ-select/v1/session',
            method: 'get',
            data: {}
        })
    }, 1000)
}

export default function pluginInfo() {
    return {
        name: "easy-queue-dodge",
        author: "kko7",
        enabled: false,
        bg: doInBackground,
        shortDescription: "Dodge without closing the entire client.",
        longDescription: "As in title",
    }
}
