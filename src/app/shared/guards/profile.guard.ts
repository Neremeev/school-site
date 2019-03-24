import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(private  router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (sessionStorage.getItem('id')) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }

}
