import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-activity-detail",
  templateUrl: "./activity-detail.component.html",
  styleUrls: ["./activity-detail.component.css"]
})
export class ActivityDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // console.log("Hey there");
    // this.route.paramMap.subscribe(param => {
    //   console.log(param);
    // });
  }
}
