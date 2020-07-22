import doInBackground from "./background-job"

export default function pluginInfo() {
  return {
    name: "more-runes",
    author: "kko7",
    enabled: false,
    config: {
      interval: 1000,
    },
    bg: doInBackground,
    shortDescription: "Choose from more rune pages",
    longDescription:
      "At the start of champion select opens new window that allows to select/customize runes",
  }
}
