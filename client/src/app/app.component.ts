import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "./auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "client";
  private subscription: Subscription;
  private isLoggedIn: boolean = false;
  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.subscription = this.authService.getAuthStatus().subscribe(value => {
      this.isLoggedIn = value;
    });
    try {
      await this.authService.checkIsLoggedIn().toPromise();
    } catch (error) {
      console.error("pinchose ngOnInit");
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async onLogout() {
    try {
      await this.authService.logout().toPromise();
    } catch (error) {
      console.error("pinchose onLogout");
    }
  }
}
