const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  captureScreen: (opts) => ipcRenderer.invoke('screen-capture', opts),
});
