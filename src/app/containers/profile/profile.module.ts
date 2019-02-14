import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {ProfileComponent} from './profile.component';
import {SharedModule} from '../../shared/shared.module';
import {ProfileNavComponent} from "./profile-nav/profile-nav.component";
import {ProfileBodySettingsComponent} from "./profile-body-settings/profile-body-settings.component";
import {ProfileBodyProfileComponent} from "./profile-body-profile/profile-body-profile.component";
import {ProfileBodyRoutingModule} from "./profile-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ChangePictureComponent} from "./profile-body-settings/change-picture/change-picture.component";
import {ChangePasswordComponent} from "./profile-body-settings/change-password/change-password.component";
import {FileDropModule} from "ngx-file-drop";

@NgModule({
  declarations: [
    MainMenuComponent,
    ProfileComponent,
    ProfileNavComponent,
    ProfileBodySettingsComponent,
    ProfileBodyProfileComponent,
    ChangePasswordComponent,
    ChangePictureComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileBodyRoutingModule,
    FileDropModule
  ]
})
export class ProfileModule { }
