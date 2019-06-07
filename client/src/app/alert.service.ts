import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  constructor(private snackbar: MatSnackBar) {}

  success(msg: string) {
    this.snackbar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: "snackbar-success"
    });
  }

  error(msg: string) {
    this.snackbar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: "snackbar-error"
    });
  }
}
