const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron');
const path = require('node:path');


const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    frame: false,
    // titleBarStyle: 'customButtonsOnHover',
    transparent: true,
  });

  if (process.env.DEBUG) {
    win.loadURL('http://localhost:4200');
  } else {
    win.loadFile(path.join(__dirname, 'dist/screenshot-snipping-tool/browser/index.html'));
  }

  win.webContents.openDevTools();
  
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') 
        app.quit()
});

// Handle screen capture requests
ipcMain.handle('get-sources', async (event, opts) => {
  return await desktopCapturer.getSources(opts);
});