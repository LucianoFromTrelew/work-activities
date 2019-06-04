import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ActivityListComponent } from "./activity-list/activity-list.component";

const routes: Routes = [{ path: "", component: ActivityListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
