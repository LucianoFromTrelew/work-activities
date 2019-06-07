import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivitiesService } from "src/app/activities.service";
import { Activity } from "src/app/models/activity";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-activity-list-page",
  templateUrl: "./activity-list-page.component.html",
  styleUrls: ["./activity-list-page.component.css"]
})
export class ActivityListPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private activities: Activity[] = [];
  private fetchingData: boolean = true;
  private error: boolean = false;
  private isLoggedIn: boolean = false;
  constructor(
    private activitiesService: ActivitiesService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.subscription = this.authService.getAuthStatus().subscribe(value => {
      this.isLoggedIn = value;
    });
    try {
      this.activities = await this.activitiesService
        .getActivities()
        .toPromise();
    } catch (error) {
      this.error = true;
    } finally {
      this.fetchingData = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  hasActivities() {
    return !this.fetchingData;
  }

  onSelectedActivity(activity: Activity) {
    this.router.navigate(["/activity", activity.id]);
  }
}
