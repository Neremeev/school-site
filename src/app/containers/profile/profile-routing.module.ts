import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileBodyProfileComponent} from "./profile-body-profile/profile-body-profile.component";
import {ProfileBodySettingsComponent} from "./profile-body-settings/profile-body-settings.component";
import {ProfileComponent} from "./profile.component";
import {ProfileGuard} from "../../shared/guards/profile.guard";
import {ProfileBobyGroupsComponent} from "./profile-boby-groups/profile-boby-groups.component";
import {ProfileGroupDetailComponent} from "./profile-group-detail/profile-group-detail.component";
import {ProfileBodyOtherUserComponent} from "./profile-body-other-user/profile-body-other-user.component";
import {ProfileFriendsComponent} from "./profile-friends/profile-friends.component";
import {ProfileBobyMessageComponent} from "./profile-boby-message/profile-boby-message.component";
import {ProfileBobyMessageDetailComponent} from "./profile-boby-message-detail/profile-boby-message-detail.component";

const routes: Routes = [
  {path: '', component: ProfileComponent, canActivate: [ProfileGuard], children: [
    {path: 'settings', component: ProfileBodySettingsComponent},
    {path: 'account', component: ProfileBodyProfileComponent},
    {path: 'groups', component: ProfileBobyGroupsComponent},
    {path: 'friends', component: ProfileFriendsComponent},
    {path: 'group/:id', component: ProfileGroupDetailComponent},
    {path: 'otherProfile/:id', component: ProfileBodyOtherUserComponent},
    {path: 'message', component: ProfileBobyMessageComponent},
    {path: 'message/:id', component: ProfileBobyMessageDetailComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileBodyRoutingModule { }
