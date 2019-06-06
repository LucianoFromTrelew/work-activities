import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Activity } from "../../models/activity";

@Component({
  selector: "app-activity-card",
  templateUrl: "./activity-card.component.html",
  styleUrls: ["./activity-card.component.css"]
})
export class ActivityCardComponent implements OnInit {
  @Input() activity: Activity;
  @Output() selected: EventEmitter<Activity> = new EventEmitter<Activity>();
  constructor() {}

  ngOnInit() {}

  onCardClick() {
    this.selected.emit(this.activity);
  }
}
