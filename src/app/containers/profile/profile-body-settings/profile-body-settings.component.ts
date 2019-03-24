import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {getUserService} from "../../../shared/services/getUsersInfo.service";
import {Subscription} from "rxjs/index";
import {User} from "../../../shared/models/user.model";

@Component({
  selector: 'app-profile-body-settings',
  templateUrl: './profile-body-settings.component.html',
  styleUrls: ['./profile-body-settings.component.scss']
})
export class ProfileBodySettingsComponent implements OnInit, OnDestroy {

  id = +sessionStorage.getItem('id');
  storeSub: Subscription;
  user: User;

  constructor(private store: Store<AppState>, private getUserService: getUserService) {}

  ngOnInit() {
    this.storeSub = this.store.select('userPage').subscribe(({user}) => {
      if (!user.id) {
        this.getUserService.getUserInfo(this.id);
      } else {
        this.user = user;
      }
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
