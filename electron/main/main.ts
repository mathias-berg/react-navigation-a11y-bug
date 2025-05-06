'use strict';

import { app, BrowserWindow, nativeTheme } from 'electron';
import installExtension, {
    REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import windowStateKeeper from 'electron-window-state';
import * as path from 'path';

const isDevelopment = process.env.NODE_ENV === 'development';

const isMac = process.platform === 'darwin';
const isWindows = process.platform === 'win32';

const DEFAULT_WINDOW_WIDTH = 1440;
const DEFAULT_WINDOW_HEIGHT = 900;

// global reference to mainWindow (necessary to prevent window from being garbage collected)
export let mainWindow: BrowserWindow | undefined;
let isAppQuitting = false;
let mainWindowState: windowStateKeeper.State;

const createMainWindow = () => {
    mainWindowState = windowStateKeeper({
        defaultWidth: DEFAULT_WINDOW_WIDTH,
        defaultHeight: DEFAULT_WINDOW_HEIGHT,
    });

    const browserWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            sandbox: false,
            contextIsolation: true,
            preload: path.join(__dirname, '../preload/preload.js'),
            webSecurity: !isDevelopment,
            spellcheck: false,
            devTools: isDevelopment,
        },
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        minWidth: 960,
        minHeight: 600,
        height: mainWindowState.height,
        // frame: true,
        // titleBarStyle: isMac ? 'hiddenInset' : 'hidden',
        titleBarOverlay: isWindows && {
            color: 'rgba(0,0,0,0.0)',
            symbolColor: '#000000',
            height: 29,
        },
        show: false,
        center: true,
        backgroundColor: '#FFFFFF',
    });

    if (isDevelopment) {
        browserWindow.loadURL('http://localhost:8081').then(() => {
            browserWindow.show();
        });
    } else {
        browserWindow
            .loadFile(path.join(__dirname, '../renderer/index.html'))
            .then(() => {
                browserWindow.show();
            });
    }

    browserWindow.on('close', event => {
        if (!isAppQuitting) {
            event.preventDefault();
            browserWindow.hide();
        }
    });

    browserWindow.on('closed', () => {
        mainWindow = undefined;
    });

    browserWindow.webContents.on('devtools-opened', () => {
        browserWindow.focus();
        setImmediate(() => {
            browserWindow.focus();
        });
    });

    return browserWindow;
};

const initBrowserWindow = () => {
    // create main BrowserWindow when electron is ready
    mainWindow = createMainWindow();
    mainWindowState.manage(mainWindow);

    if (isDevelopment) {
        installExtension(REACT_DEVELOPER_TOOLS)
            .then(name => console.log(`Added Extension:  ${name}`))
            .catch(err => console.log('An error occurred: ', err));
    }

    mainWindow.webContents.on('render-process-gone', (event, details) => {
        if (isDevelopment) {
            console.log('### render-process-gone', details);
        }
        mainWindow?.webContents.reload();
    });

    mainWindow.webContents.openDevTools({
        mode: 'detach',
    });
};

// Create browser window on app ready
app.whenReady().then(initBrowserWindow);

app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow();
    }

    mainWindow?.show?.();
});

app.on('before-quit', () => {
    isAppQuitting = true;
});
