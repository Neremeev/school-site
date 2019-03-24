import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {ProfileComponent} from './profile.component';
import {SharedModule} from '../../shared/shared.module';
import {ProfileNavComponent} from "./profile-nav/profile-nav.component";
import {ProfileBodySettingsComponent} from "./profile-body-settings/profile-body-settings.component";
import {ProfileBodyProfileComponent} from "./profile-body-profile/profile-body-profile.component";
import {ProfileBodyRoutingModule} from "./profile-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChangePictureComponent} from "./profile-body-settings/change-picture/change-picture.component";
import {ChangePasswordComponent} from "./profile-body-settings/change-password/change-password.component";
import {FileDropModule} from "ngx-file-drop";
import {ImageCropperComponent} from "ng2-img-cropper";
import {ProfileBobyGroupsComponent} from "./profile-boby-groups/profile-boby-groups.component";
import {ProfileGroupDetailComponent} from "./profile-group-detail/profile-group-detail.component";
import {ProfileBodyOtherUserComponent} from "./profile-body-other-user/profile-body-other-user.component";
import {SearchPipe} from "../../shared/pipes/search.pipe";
import {ProfileFriendsComponent} from "./profile-friends/profile-friends.component";
import {ProfileBobyMessageComponent} from "./profile-boby-message/profile-boby-message.component";
import {ProfileBobyMessageDetailComponent} from "./profile-boby-message-detail/profile-boby-message-detail.component";

@NgModule({
  declarations: [
    MainMenuComponent,
    ProfileComponent,
    ProfileNavComponent,
    ProfileBodySettingsComponent,
    ProfileBodyProfileComponent,
    ChangePasswordComponent,
    ChangePictureComponent,
    ImageCropperComponent,
    ProfileBobyGroupsComponent,
    ProfileGroupDetailComponent,
    ProfileBodyOtherUserComponent,
    ProfileFriendsComponent,
    SearchPipe,
    ProfileBobyMessageComponent,
    ProfileBobyMessageDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileBodyRoutingModule,
    FileDropModule,
    FormsModule
  ]
})
export class ProfileModule { }
