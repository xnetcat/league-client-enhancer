import doInBackground from "./background-job"

export default function pluginInfo() {
  return {
    name: "easy-queue-dodge",
    author: "kko7",
    enabled: false,
    config: {
      interval: 1000,
    },
    bg: doInBackground,
    shortDescription: "Dodge without closing the entire client.",
    longDescription: "As in title",
  }
}
