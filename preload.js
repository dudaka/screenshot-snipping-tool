const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Expose functions or variables here if needed
});
