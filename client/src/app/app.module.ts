import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
// angular-material imports
import {
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatChipsModule,
  MatButtonModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatIconModule,
  MatDialogModule
} from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppHeaderComponent } from "./layout/app-header/app-header.component";
import { ActivityListPageComponent } from "./pages/activity-list-page/activity-list-page.component";
import { ActivityDetailPageComponent } from "./pages/activity-detail-page/activity-detail-page.component";
import { ActivityCardComponent } from "./components/activity-card/activity-card.component";
import { ActivityListComponent } from "./components/activity-list/activity-list.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ActivityCreatePageComponent } from "./pages/activity-create-page/activity-create-page.component";
import { DeleteActivityDialogComponent } from "./components/delete-activity-dialog/delete-activity-dialog.component";
import { ActivityEditPageComponent } from './pages/activity-edit-page/activity-edit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    ActivityListPageComponent,
    ActivityDetailPageComponent,
    ActivityCardComponent,
    ActivityListComponent,
    LoginPageComponent,
    ActivityCreatePageComponent,
    DeleteActivityDialogComponent,
    ActivityEditPageComponent
  ],
  entryComponents: [DeleteActivityDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    // angular-material imports
    MatProgressSpinnerModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
