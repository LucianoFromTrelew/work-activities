import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { ActivitiesService } from "src/app/activities.service";
import { Activity } from "src/app/models/activity";

@Component({
  selector: "app-activity-detail-page",
  templateUrl: "./activity-detail-page.component.html",
  styleUrls: ["./activity-detail-page.component.css"]
})
export class ActivityDetailPageComponent implements OnInit {
  private activity: Activity;
  private isLoading: boolean = true;
  private error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private activitiesService: ActivitiesService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      const { activityId } = params;
      try {
        this.activity = await this.activitiesService
          .getActivityById(parseInt(activityId))
          .toPromise();
      } catch (error) {
        this.error = true;
      } finally {
        this.isLoading = false;
      }
    });
  }
}
