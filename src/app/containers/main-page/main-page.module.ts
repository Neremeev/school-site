import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingComponent} from './landing/landing.component';
import {MainPageComponent} from './main-page.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    LandingComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MainPageModule { }
