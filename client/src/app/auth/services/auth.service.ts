import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  private authApiUrl = environment.serverUrl + '/auth';
  private tokenSubject: BehaviorSubject<string>;
  public token: Observable<string>;

  constructor(private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string>(localStorage.getItem(this.tokenKey));
    this.token = this.tokenSubject.asObservable();
  }

  public get tokenValue(): string {
    return this.tokenSubject.value;
  }

  public get isLoggedIn(): boolean {
    return this.tokenValue !== null && this.tokenValue !== undefined;
  }

  login(username: string, password: string): Observable<string> {
    const url = this.authApiUrl + '/login';
    return this.http.post<any>(url, { username, password })
      .pipe(map( res => this.saveToken(res.access_token) ));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.tokenSubject.next(null);
  }

  register(user: User): Observable<string> {
    const url = this.authApiUrl + '/sign-up';
    return this.http.post<any>(url, user)
      .pipe(map( res => this.saveToken(res.access_token) ));
  }

  private saveToken(token: string): string {
    localStorage.setItem(this.tokenKey, token);
    this.tokenSubject.next(token);
    return token;
  }
}
