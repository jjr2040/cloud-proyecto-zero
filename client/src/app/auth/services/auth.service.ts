import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  private apiUrl = 'http://localhost:3000/auth';
  private tokenSubject: BehaviorSubject<string>;
  public token: Observable<string>;

  constructor(private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string>(localStorage.getItem(this.tokenKey));
    this.token = this.tokenSubject.asObservable();
  }

  public get tokenValue(): string {
    return this.tokenSubject.value;
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(this.apiUrl + '/login', { email, password })
      .pipe(map(token => {
        localStorage.setItem(this.tokenKey, token);
        return token;
      }));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.tokenSubject.next(null);
  }
}
