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
import { Activity } from "src/app/models/activity";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-activity-edit-page",
  templateUrl: "./activity-edit-page.component.html",
  styleUrls: ["./activity-edit-page.component.css"]
})
export class ActivityEditPageComponent implements OnInit {
  private activity: Activity;
  private isLoading: boolean = false;
  private error: boolean = false;
  private activityForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private activitiesService: ActivitiesService,
    private alertService: AlertService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      const { activityId } = params;
      try {
        this.isLoading = true;
        this.activity = await this.activitiesService
          .getActivityById(parseInt(activityId))
          .toPromise();
        this.activityForm = this.createForm();
      } catch (error) {
        console.log(error);
        this.error = true;
      } finally {
        this.isLoading = false;
      }
    });
  }

  createForm() {
    return this.fb.group({
      title: [this.activity.title, Validators.required],
      description: [this.activity.description, Validators.required],
      newTag: [""],
      tags: this.fb.array(this.activity.tags),
      geolocation: this.fb.group({
        latitude: [
          (this.activity.geolocation && this.activity.geolocation.latitude) ||
            "",
          Validators.pattern(/^\d+$/)
        ],
        longitude: [
          (this.activity.geolocation && this.activity.geolocation.longitude) ||
            "",
          Validators.pattern(/^\d+$/)
        ]
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

  async onSubmit() {
    const { value } = this.activityForm;
    value.id = this.activity.id;
    delete value.newTag;
    if (!value.geolocation.latitude || !value.geolocation.longitude)
      delete value.geolocation;
    try {
      await this.activitiesService.updateActivity(value).toPromise();
      this.alertService.success("¡Actividad actualizada éxitosamente!");
    } catch (error) {
      this.alertService.error("No se pudo actualizar la actividad");
    }
  }
}
