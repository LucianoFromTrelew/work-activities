import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Activity } from "./models/activity";

@Injectable({
  providedIn: "root"
})
export class ActivitiesService {
  constructor(private http: HttpClient) {}

  private activities: Activity[] = [];

  getActivities(): Promise<Activity[]> {
    if (this.activities.length > 0)
      return new Promise(resolve => this.activities);
    return this.http
      .get(`${environment.baseUrl}/api/activity`)
      .toPromise()
      .then((activities: Activity[]) => {
        this.activities = activities;
        return activities;
      }) as Promise<Activity[]>;
  }

  getActivityById(id: number): Promise<Activity> {
    const activity = this.activities.find(
      activityToFind => activityToFind.id === id
    );
    if (activity) {
      return new Promise(resolve => resolve(activity));
    }
    return this.http
      .get(`${environment.baseUrl}/api/activity/${id}`)
      .toPromise() as Promise<Activity>;
  }
}
