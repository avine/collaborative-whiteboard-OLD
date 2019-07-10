import { Component } from '@angular/core';
import { faTint, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  themeIcon = faTint;

  userIcon = faUserCircle;

  constructor(public themeService: ThemeService) {}
}
