const electron = require("electron");
const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
} = require("electron-devtools-installer");
const path = require("path");
const isDev = require("electron-is-dev");
const LeagueConnector = require("lcu-connector");
const updateElectronApp = require("update-electron-app");
const axios = require("axios")
const https = require("https")

const connector = new LeagueConnector();
const {app, BrowserWindow, ipcMain} = electron;

app.commandLine.appendSwitch('disable-web-security');

let mainWindow;

// noinspection JSValidateTypes
updateElectronApp({
    repo: "kko7/league-client-enhancer",
    updateInterval: "20 minutes",
});

if (isDev) {
    app.whenReady().then(() => {
        installExtension([REACT_DEVELOPER_TOOLS])
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log("An error occurred: ", err));
    });
}

function createWindow() {
    let LCUData;
    let windowLoaded = false;

    mainWindow = new BrowserWindow({
        minHeight: 680,
        minWidth: 800,
        useContentSize: true,
        title: "League Client Enhancer",
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            nativeWindowOpen: true,
        },
    });

    mainWindow.setMenu(null);
    mainWindow
        .loadURL(
            isDev
                ? "http://localhost:3000"
                : `file://${path.join(__dirname, "../build/index.html")}`
        )
        .then(() => console.log("[Electron] Loaded index.html"))
        .catch(console.error);

    mainWindow.webContents.on("did-finish-load", () => {
        windowLoaded = true;

        mainWindow.show();

        if (!LCUData) {
            return;
        }

        mainWindow.webContents.send("lcu-load", LCUData);
    });

    if (isDev) mainWindow.openDevTools({mode: "detach"});

    mainWindow.on("closed", () => (mainWindow = null));

    connector.on("connect", (data) => {
        LCUData = data;
        mainWindow.webContents.send("lcu-load", data);
    });

    connector.on("disconnect", () => {
        LCUData = null;

        if (windowLoaded) {
            mainWindow.webContents.send("lcu-unload");
        }
    });

    connector.start();
}

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    if (url.match(/https:\/\/127.0.0.1(:[0-9]+)?(\/[a-z0-9\-._~%!$&'()*+,;=:@]+)*\/?/g)) {
        event.preventDefault()
        callback(true)
    } else {
        callback(false)
    }
})

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('lcu-api-request', (event, data) => {
    const {username, password, address, port, protocol} = data.lcuData

    axios({
        method: data.method,
        url: `${protocol}://${address}:${port}${data.endpoint}`,
        headers: {
            'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }),
    }).then(resp => {
        mainWindow.webContents.send('lcu-api-data', {
            pluginName: data.pluginName,
            data: resp.data
        })
    }).catch(error => {
        mainWindow.webContents.send('lcu-api-data', {
            pluginName: data.pluginName,
            data: error.response.data
        })
    })
})

ipcMain.on('notification-request', (event, data) => {
    mainWindow.webContents.send('notification-data', data)
})