import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ActivitiesService {
  constructor(private http: HttpClient) {}

  getActivities() {
    return this.http.get(`${environment.baseUrl}/api/activity`);
  }
}
