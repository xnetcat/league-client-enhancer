import React from 'react'
import {Typography} from "@rmwc/typography";

export class DisableChatSettings extends React.Component{
    render() {
        return(
            <>
                <Typography>TEST</Typography>
            </>
        )

    }
}

export function doInBackground() {
    return setInterval(() => console.log(2222), 1000)
}

export default function pluginInfo() {
    return {
        name: "Disable chat",
        author: "kko7",
        enabled: false,
        bg: doInBackground,
        url: `${window.location.origin}/plugin/disable-chat`,
        shortDescription: "Appear offline for your friends when still being able to play",
        longDescription: "As in title",
    }
}
