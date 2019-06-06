import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  AfterContentChecked
} from "@angular/core";
import { Activity } from "../../models/activity";

@Component({
  selector: "app-activity-list",
  templateUrl: "./activity-list.component.html",
  styleUrls: ["./activity-list.component.css"]
})
export class ActivityListComponent implements OnInit {
  @ViewChildren("activityCard") activityCards;
  @Input() activities: Activity[];
  @Output() selected: EventEmitter<Activity> = new EventEmitter<Activity>();
  constructor() {}

  ngOnInit() {}

  onSelectedActivity(activity: Activity) {
    this.selected.emit(activity);
  }
}
