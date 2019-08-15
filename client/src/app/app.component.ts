import { AuthService } from './auth/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project-zero';
  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    authService.token.subscribe( () => {
      this.isLoggedIn = authService.isLoggedIn;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
