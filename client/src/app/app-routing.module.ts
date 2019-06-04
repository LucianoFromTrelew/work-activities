import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ActivityListComponent } from "./activity-list/activity-list.component";
import { ActivityDetailComponent } from "./activity-detail/activity-detail.component";

const routes: Routes = [
  { path: "activity", component: ActivityListComponent },
  { path: "", redirectTo: "/activity", pathMatch: "full" },
  { path: "activity/:activityId", component: ActivityDetailComponent },
  { path: "**", redirectTo: "/activity" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
