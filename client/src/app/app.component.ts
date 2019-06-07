import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "client";
  private isLoggedIn: boolean = false;
  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.authService.getAuthStatus().subscribe(value => {
      this.isLoggedIn = value;
    });
    await this.authService.checkIsLoggedIn().toPromise();
  }

  async onLogout() {
    await this.authService.logout().toPromise();
  }
}
