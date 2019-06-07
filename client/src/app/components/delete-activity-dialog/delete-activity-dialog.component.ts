import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-delete-activity-dialog",
  templateUrl: "./delete-activity-dialog.component.html",
  styleUrls: ["./delete-activity-dialog.component.css"]
})
export class DeleteActivityDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteActivityDialogComponent>) {}

  ngOnInit() {}

  onCancelClick() {
    this.dialogRef.close(false);
  }

  onDeleteClick() {
    this.dialogRef.close(true);
  }
}
