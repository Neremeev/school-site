import {Injectable, OnDestroy} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate, OnDestroy {

  id: boolean;
  storeSub: Subscription;

  constructor(private store: Store<AppState>, private  router: Router) {
    this.storeSub = this.store.select('userPage').subscribe(({user}) => {
      this.id = user.id;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.id) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
