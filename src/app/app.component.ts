import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  autService = inject(AuthService);

  logOut() {
    this.autService.logout();
  }
}
