import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

interface AuthResponse {
  accessToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private readonly logInUrl = `${environment.apiUrl}/auth/login`;
  private readonly registerUrl = `${environment.apiUrl}/auth/register`;

  private jwtHelper = new JwtHelperService();
  isAuthenticated = signal(false);

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    const token = this.getToken();
    if (token && this.isValidJWT(token)) {
      this.isAuthenticated.set(!this.jwtHelper.isTokenExpired(token));
    } else {
      this.isAuthenticated.set(false);
    }
  }

  register(email: string, password: string) {
    return this.http
      .post<AuthResponse>(this.registerUrl, { email, password })
      .pipe(tap(() => this.router.navigate(['/login'])));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(this.logInUrl, { email, password })
      .pipe(tap((response) => this.handleAuth(response.accessToken)));
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private handleAuth(token: string) {
    localStorage.setItem('token', token);
    this.isAuthenticated.set(true);
    this.router.navigate(['/dashboard']);
  }

  private isValidJWT(token: string): boolean {
    return token.split('.').length === 3;
  }
}
