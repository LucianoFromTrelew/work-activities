import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ActivityListPageComponent } from "./pages/activity-list-page/activity-list-page.component";
import { ActivityDetailPageComponent } from "./pages/activity-detail-page/activity-detail-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { ActivityCreatePageComponent } from "./pages/activity-create-page/activity-create-page.component";
import { ActivityEditPageComponent } from "./pages/activity-edit-page/activity-edit-page.component";

const routes: Routes = [
  { path: "", redirectTo: "/activity", pathMatch: "full" },
  { path: "activity", component: ActivityListPageComponent },
  { path: "activity/create", component: ActivityCreatePageComponent },
  { path: "activity/:activityId", component: ActivityDetailPageComponent },
  { path: "activity/:activityId/edit", component: ActivityEditPageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "**", redirectTo: "/activity" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
