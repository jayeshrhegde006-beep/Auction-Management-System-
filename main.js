const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let serverProcess;

function startServer() {
    // Spawn the server process
    serverProcess = spawn('npm', ['start'], {
        cwd: path.join(__dirname, 'server'),
        shell: true
    });

    serverProcess.stdout.on('data', (data) => {
        console.log(`Server: ${data}`);
    });

    serverProcess.stderr.on('data', (data) => {
        console.error(`Server Error: ${data}`);
    });
}

function createWindow() {
    startServer();

    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: path.join(__dirname, 'client/public/favicon.ico')
    });

    // In development, load from localhost:3000
    // In production, we'll point to the build folder
    const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, './client/build/index.html')}`;

    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:3000');
    } else {
        win.loadURL(startUrl);
    }

    // Remove menu bar for a cleaner "app" look
    win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (serverProcess) serverProcess.kill();
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('will-quit', () => {
    if (serverProcess) serverProcess.kill();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
