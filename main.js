const { app, BrowserWindow, ipcMain, desktopCapturer, shell, screen } = require('electron');
const path = require('node:path');
const os = require('os');
const fs = require('fs');
const { log } = require('node:console');


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
ipcMain.handle('screen-capture', async (event, opts) => {
  try {
    const win = BrowserWindow.getFocusedWindow();
    if (!win) {
      throw new Error('No focused window found.');
    }

    win.hide();

    const { devicePixelRatio } = opts;
    const screenSize = screen.getPrimaryDisplay().workAreaSize

    const sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: {
        width: screenSize.width * devicePixelRatio,
        height: screenSize.height * devicePixelRatio,
      },
    });

    const entireScreenSource = sources.find((source) => source.name === 'Entire Screen' || source.name === 'Screen 1');
    if (entireScreenSource) {
      const outputPath = path.join(os.tmpdir(), 'screenshot.png');
      console.log('Saving screenshot to', outputPath);

      const imageBuffer = entireScreenSource.thumbnail
        .resize({
          width: screenSize.width,
          height: screenSize.height,
        })
        .crop(win.getBounds())
        .toPNG();

      
      fs.writeFile(outputPath, imageBuffer, (err) => {
        win.show();
        
        if (err) {
          throw err;
        }
        shell.openExternal(`file://${outputPath}`);
      });
    } else {
      throw new Error('Screen source not found.');
    }

  } 
  catch (err) {
    console.error(err);
    // throw err;
  }
});
