import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {UserService} from "./services/user.service";
import {getUserService} from "./services/getUsersInfo.service";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [UserService, getUserService]
})
export class SharedModule { }
