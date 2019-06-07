import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { ActivitiesService } from "src/app/activities.service";
import { AlertService } from "src/app/alert.service";

@Component({
  selector: "app-activity-create-page",
  templateUrl: "./activity-create-page.component.html",
  styleUrls: ["./activity-create-page.component.css"]
})
export class ActivityCreatePageComponent implements OnInit {
  private activityForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activitiesService: ActivitiesService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.activityForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      newTag: [""],
      tags: this.fb.array([]),
      geolocation: this.fb.group({
        latitude: ["", Validators.pattern(/^\d+$/)],
        longitude: ["", Validators.pattern(/^\d+$/)]
      })
    });
  }

  isFormInvalid() {
    return this.activityForm.invalid;
  }

  onAddTag() {
    const tags = this.activityForm.get("tags") as FormArray;
    const tag = this.activityForm.get("newTag").value;
    // Check if tag is empty
    if (!tag) return;

    // Check if tag is already added
    const existingTag = tags.controls.find(
      (tagControl: FormControl) => tagControl.value === tag
    );
    if (existingTag) return;

    tags.push(new FormControl(tag));
    (this.activityForm.get("newTag") as FormControl).reset();
  }

  onDeleteTag(index) {
    event.preventDefault();
    (this.activityForm.get("tags") as FormArray).removeAt(index);
  }

  clearForm() {
    this.activityForm.reset();
    (this.activityForm.get("tags") as FormArray).clear();
  }

  async onSubmit() {
    const { value } = this.activityForm;
    delete value.newTag;
    if (!value.geolocation.latitude || !value.geolocation.longitude)
      delete value.geolocation;
    try {
      await this.activitiesService.createActivity(value).toPromise();
      this.alertService.success("¡Actividad creada éxitosamente!");
      this.clearForm();
    } catch (error) {
      this.alertService.error("No se pudo crear la actividad");
    }
  }
}
