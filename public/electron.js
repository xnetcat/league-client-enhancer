const electron = require("electron")
const path = require("path")
const isDev = require("electron-is-dev")
const LeagueConnector = require("lcu-connector")
const updateElectronApp = require("update-electron-app")
const axios = require("axios")
const https = require("https")

const connector = new LeagueConnector()
const { app, BrowserWindow, ipcMain, Tray } = electron

app.commandLine.appendSwitch("disable-web-security")

let mainWindow, tray, LCUData

// noinspection JSValidateTypes
updateElectronApp({
  repo: "kko7/league-client-enhancer",
  updateInterval: "20 minutes",
})

const lock = app.requestSingleInstanceLock()
if (!lock) app.quit()
else {
  app.on("second-instance", function (argv, cwd) {
    if (mainWindow) {
      if (!mainWindow.isVisible()) mainWindow.show()
      else if (mainWindow.isMinimized()) mainWindow.restore()

      mainWindow.focus()
    }
  })
}

function createWindow() {
  let windowLoaded = false

  mainWindow = new BrowserWindow({
    minHeight: 680,
    minWidth: 800,
    show: false,
    useContentSize: true,
    title: "League Client Enhancer",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      nativeWindowOpen: true,
    },
  })

  mainWindow
    .loadURL(
      isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    )
    .then(() => console.log("[Electron] Loaded mainWindow"))
    .catch(console.error)

  mainWindow.webContents.on("did-finish-load", () => {
    windowLoaded = true

    mainWindow.show()

    if (!LCUData) {
      return
    }

    mainWindow.webContents.send("lcu-load", LCUData)
  })

  if (isDev) mainWindow.openDevTools({ mode: "detach" })

  mainWindow.on("closed", () => {
    if (tray && !tray.isDestroyed()) tray.destroy()
    mainWindow = tray = null
  })

  connector.on("connect", (data) => {
    LCUData = data
    mainWindow.webContents.send("lcu-load", data)
  })

  connector.on("disconnect", () => {
    LCUData = null

    if (windowLoaded) {
      mainWindow.webContents.send("lcu-unload")
    }
  })

  connector.start()
}

app.on(
  "certificate-error",
  (event, webContents, url, error, certificate, callback) => {
    if (
      url.match(
        /https:\/\/127.0.0.1(:[0-9]+)?(\/[a-z0-9\-._~%!$&'()*+,;=:@]+)*\/?/g
      )
    ) {
      event.preventDefault()
      // eslint-disable-next-line standard/no-callback-literal
      callback(true)
    } else {
      // eslint-disable-next-line standard/no-callback-literal
      callback(false)
    }
  }
)

app.on("ready", () => {
  createWindow()
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on("win-show", (event, inactive) => {
  if (!mainWindow.isVisible()) mainWindow[inactive ? "showInactive" : "show"]()
})

ipcMain.on("win-hide", () => {
  mainWindow.hide()
})

ipcMain.on("tray", (event, show) => {
  if (show && tray && !tray.isDestroyed()) return
  else if (!show) {
    if (!tray || (tray && tray.isDestroyed())) return
    return tray.destroy()
  }

  tray = new Tray(
    path.join(
      __dirname,
      `/favicon.${process.platform === "win32" ? "ico" : "png"}`
    )
  )
  tray.setToolTip("Click here to show League Client Enhancer")

  tray.on("click", () =>
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.showInactive()
  )
})

async function handleApiRequest(invoke, data) {
  let returnValue
  if (LCUData) {
    const { username, password, address, port, protocol } = LCUData
    await axios({
      method: data.method,
      url: `${protocol}://${address}:${port}${data.endpoint}`,
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
          "base64"
        )}`,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })
      .then((response) => {
        returnValue = {
          endpoint: data.endpoint,
          pluginName: data.pluginName,
          response: {
            status: response.status,
            data: response.data,
          },
        }
        if (!invoke) mainWindow.webContents.send("lcu-api-data", returnValue)
      })
      .catch((error) => {
        if (error.response !== undefined) {
          returnValue = {
            pluginName: data.pluginName,
            response: {
              status: error.response.status,
              data: error.response.data,
            },
          }
          if (!invoke) mainWindow.webContents.send("lcu-api-data", returnValue)
        }
      })
    return returnValue
  }
}

ipcMain.on("lcu-api-request", (event, data) => {
  handleApiRequest(false, data)
})

ipcMain.handle("lcu-api-request", async (event, data) => {
  return await handleApiRequest(true, data)
})

ipcMain.on("notification-request", (event, data) => {
  mainWindow.webContents.send("notification-data", data)
})

ipcMain.on("plugins-config-change", (event, data) => {
  mainWindow.webContents.send("config-data", data)
})
