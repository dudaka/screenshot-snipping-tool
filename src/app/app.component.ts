import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular Electron';

  onSnipClick() {
    const screenSize = {
      width: window.screen.width,
      height: window.screen.height,
    };
    // const maxDimension = Math.max(screenSize.width, screenSize.height);

    window.electronAPI.captureScreen({
      // types: ['screen'],
      // thumbnailSize: {
      //   width: maxDimension * window.devicePixelRatio,
      //   height: maxDimension * window.devicePixelRatio,
      // },
      screenSize,
      devicePixelRatio: window.devicePixelRatio,
    });
  }
}
