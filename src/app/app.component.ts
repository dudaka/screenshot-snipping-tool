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

  async onSnipClick() {
    try {
      const sources = await window.electronAPI.getSources({
        types: ['screen'],
      });
      const entireScreenSource = sources.find(
        (source: any) => source.name === 'Screen 1'
      );
      if (entireScreenSource) {
        console.log(entireScreenSource);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
