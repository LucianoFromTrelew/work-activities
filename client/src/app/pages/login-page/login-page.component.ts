import { Component, OnInit } from "@angular/core";
import { Validators, FormControl } from "@angular/forms";
import { AuthService } from "src/app/auth.service";
import { Router } from "@angular/router";
import { AlertService } from "src/app/alert.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  private username = new FormControl("", [Validators.required]);
  private password = new FormControl("", [Validators.required]);

  private submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertService
  ) {}

  async onSubmit() {
    if (this.isFormValid()) return;
    this.submitted = true;
    try {
      const res = await this.authService
        .login(this.username.value, this.password.value)
        .toPromise();
      this.router.navigate(["/"]);
    } catch (error) {
      this.alert.error("Ha ocurrido un error");
    } finally {
      this.submitted = false;
      this.username.reset();
      this.password.reset();
    }
  }

  getUsernameErrorMessage() {
    return this.username.hasError("required")
      ? "Ingrese su nombre de usuario"
      : "";
  }

  getPasswordErrorMessage() {
    return this.password.hasError("required") ? "Ingrese su contraseña" : "";
  }

  isFormValid() {
    return this.username.invalid || this.password.invalid;
  }

  ngOnInit() {}
}
