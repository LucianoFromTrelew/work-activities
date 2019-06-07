import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.css"]
})
export class AppHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() isLoggedIn: boolean;
  @Output() logout = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  onClickLogout(event: Event) {
    event.preventDefault();
    this.logout.emit();
  }
}
