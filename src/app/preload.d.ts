export interface ElectronAPI {
  /**
   * Retrieves the list of screen sources (e.g., entire screen, application windows, etc.).
   * @param opts - Options to specify the types of sources to capture.
   * @returns A promise that resolves with the list of sources.
   */
  // getSources: (
  //   opts: Electron.SourcesOptions
  // ) => Promise<Electron.DesktopCapturerSource[]>;
  // saveScreenshot: (imageBuffer: Buffer) => Promise<string>;
  captureScreen: (opts: any) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
