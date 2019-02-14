import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainPageComponent} from './containers/main-page/main-page.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {AuthComponent} from './containers/auth/auth.component';
import {StoreRouterConnectingModule} from '@ngrx/router-store';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'auth', component: AuthComponent },
  {path: 'profile', loadChildren: './containers/profile/profile.module#ProfileModule'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}), StoreRouterConnectingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
