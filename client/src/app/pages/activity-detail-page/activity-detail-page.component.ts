import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ActivitiesService } from "src/app/activities.service";
import { Activity } from "src/app/models/activity";
import { AuthService } from "src/app/auth.service";
import { Subscription } from "rxjs";
import { AlertService } from "src/app/alert.service";
import { MatDialog } from "@angular/material";
import { DeleteActivityDialogComponent } from "src/app/components/delete-activity-dialog/delete-activity-dialog.component";

@Component({
  selector: "app-activity-detail-page",
  templateUrl: "./activity-detail-page.component.html",
  styleUrls: ["./activity-detail-page.component.css"]
})
export class ActivityDetailPageComponent implements OnInit, OnDestroy {
  private activity: Activity;
  private isLoading: boolean = true;
  private error: boolean = false;
  private isLoggedIn: boolean = false;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private alertService: AlertService,
    private authService: AuthService,
    private activitiesService: ActivitiesService
  ) {}

  async ngOnInit() {
    this.subscription = this.authService.getAuthStatus().subscribe(value => {
      this.isLoggedIn = value;
    });
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditClick() {}

  async onDeleteClick() {
    try {
      const dialogRef = this.dialog.open(DeleteActivityDialogComponent);
      dialogRef.afterClosed().subscribe(async res => {
        if (!res) return;
        await this.activitiesService.deleteActivity(this.activity).toPromise();
        this.alertService.success("Actividad eliminada con éxito");
        this.router.navigate(["/"]);
      });
    } catch (error) {
      this.alertService.error("No se pudo eliminar la actividad");
    }
  }
}
