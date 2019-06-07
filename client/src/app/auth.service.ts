import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { tap, catchError, finalize } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private _authStatus: Subject<boolean> = new Subject<boolean>();

  private getLocalStorageKey(): string {
    return "work-activities-api-token";
  }

  private getUrl(route?: string): string {
    if (route) return `${environment.baseUrl}/auth/${route}`;
    return `${environment.baseUrl}/auth`;
  }

  private getApiToken(): string {
    return localStorage.getItem(this.getLocalStorageKey());
  }

  private getAuthHeader(): string {
    return `Bearer ${this.getApiToken()}`;
  }

  private removeApiToken(): void {
    localStorage.removeItem(this.getLocalStorageKey());
  }

  getAuthStatus(): Subject<boolean> {
    return this._authStatus;
  }

  login(username: string, password: string): Observable<Object> {
    return this.http.post(this.getUrl("login"), { username, password }).pipe(
      tap(
        (response: any): Observable<Object> => {
          const { apiToken } = response;
          localStorage.setItem(this.getLocalStorageKey(), apiToken);
          this._authStatus.next(true);
          return response;
        }
      ),
      catchError(err => {
        this.removeApiToken();
        this._authStatus.next(false);
        throw new Error(err);
      })
    );
  }

  logout(): Observable<Object> {
    return this.http
      .post(
        this.getUrl("logout"),
        {},
        {
          headers: {
            Authorization: this.getAuthHeader()
          }
        }
      )
      .pipe(
        finalize(
          (): Observable<Object> => {
            this.removeApiToken();
            this._authStatus.next(false);
            return of();
          }
        )
      );
  }

  checkIsLoggedIn(): Observable<Object> {
    return this.http
      .get(this.getUrl("isauthenticated"), {
        headers: { Authorization: this.getAuthHeader() }
      })
      .pipe(
        tap(res => {
          this._authStatus.next(true);
        }),
        catchError((err: any) => {
          this.removeApiToken();
          this._authStatus.next(false);
          throw new Error(err);
        })
      );
  }
}
