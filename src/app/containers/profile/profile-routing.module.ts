import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileBodyProfileComponent} from "./profile-body-profile/profile-body-profile.component";
import {ProfileBodySettingsComponent} from "./profile-body-settings/profile-body-settings.component";
import {ProfileComponent} from "./profile.component";
import {ProfileGuard} from "../../shared/guards/profile.guard";

const routes: Routes = [
  {path: '', component: ProfileComponent, canActivate: [ProfileGuard], children: [
    {path: 'settings', component: ProfileBodySettingsComponent},
    {path: 'account', component: ProfileBodyProfileComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileBodyRoutingModule { }
