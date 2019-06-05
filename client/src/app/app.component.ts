import { Component, OnInit } from "@angular/core";
import { ActivitiesService } from "./activities.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "client";

  constructor(private activitiesService: ActivitiesService) {}
  ngOnInit() {
    this.activitiesService.getActivities().subscribe(activities => {
      console.log(activities);
    });
  }
}
