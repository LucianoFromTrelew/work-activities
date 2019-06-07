import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Activity } from "./models/activity";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ActivitiesService {
  constructor(private http: HttpClient) {}

  getUrl(id?: number): string {
    if (id) return `${environment.baseUrl}/api/activity/${id}`;
    return `${environment.baseUrl}/api/activity`;
  }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.getUrl());
  }

  getActivityById(id: number): Observable<Activity> {
    return this.http.get<Activity>(this.getUrl(id));
  }

  createActivity(newActivity: Activity) {
    return this.http.post(this.getUrl(), newActivity);
  }

  updateActivity(activityToUpdate: Activity) {
    return this.http.put(this.getUrl(activityToUpdate.id), activityToUpdate);
  }

  deleteActivity(activityToDelete: Activity) {
    return this.http.delete(this.getUrl(activityToDelete.id));
  }
}
