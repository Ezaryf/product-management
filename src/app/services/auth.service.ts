import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiBase}/auth`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.base, { username, password })
      .pipe(
        tap(resp => {
          localStorage.setItem('authToken', resp.token);
          localStorage.setItem('tokenExpiry', resp.tokenExpiry);
        })
      );
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getTokenExpiry(): string | null {
    return localStorage.getItem('tokenExpiry');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const expiry = this.getTokenExpiry();
    return !!token && !!expiry && new Date(expiry) > new Date();
  }
}