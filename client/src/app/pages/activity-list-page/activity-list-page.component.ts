import { Component, OnInit } from "@angular/core";
import { ActivitiesService } from "src/app/activities.service";
import { Activity } from "src/app/models/activity";
import { Router, NavigationEnd, Event } from "@angular/router";

@Component({
  selector: "app-activity-list-page",
  templateUrl: "./activity-list-page.component.html",
  styleUrls: ["./activity-list-page.component.css"]
})
export class ActivityListPageComponent implements OnInit {
  private activities: Activity[] = [];
  private fetchingData: boolean = true;
  private error: boolean = false;
  constructor(
    private activitiesService: ActivitiesService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.activities = await this.activitiesService.getActivities();
    } catch (error) {
      this.error = true;
    } finally {
      this.fetchingData = false;
    }
  }

  hasActivities() {
    return !this.fetchingData;
  }

  onSelectedActivity(activity: Activity) {
    this.router.navigate(["/activity", activity.id]);
  }
}
