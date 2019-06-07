import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, catchError, finalize } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

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

  login(username: string, password: string): Observable<Object> {
    return this.http.post(this.getUrl("login"), { username, password }).pipe(
      tap(
        (response: any): Observable<Object> => {
          const { apiToken } = response;
          localStorage.setItem(this.getLocalStorageKey(), apiToken);
          return response;
        }
      ),
      catchError(err => {
        this.removeApiToken();
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
            return of();
          }
        )
      );
  }

  isLoggedIn(): Observable<Object> {
    return this.http
      .get(this.getUrl("isauthenticated"), {
        headers: { Authorization: this.getAuthHeader() }
      })
      .pipe(
        catchError((err: any) => {
          this.removeApiToken();
          throw new Error(err);
        })
      );
  }
}
