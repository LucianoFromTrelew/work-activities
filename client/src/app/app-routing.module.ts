import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ActivityListPageComponent } from "./pages/activity-list-page/activity-list-page.component";
import { ActivityDetailPageComponent } from "./pages/activity-detail-page/activity-detail-page.component";

const routes: Routes = [
  { path: "", redirectTo: "/activity", pathMatch: "full" },
  { path: "activity", component: ActivityListPageComponent },
  { path: "activity/:activityId", component: ActivityDetailPageComponent },
  { path: "**", redirectTo: "/activity" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
