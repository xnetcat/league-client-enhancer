import doInBackground from "./background-job"

export default function pluginInfo() {
  return {
    name: "auto-save-runes",
    author: "kko7",
    enabled: false,
    config: {
      interval: 1000,
    },
    bg: doInBackground,
    shortDescription: "Automatically save runes every x seconds",
    longDescription: "As in title",
  }
}
