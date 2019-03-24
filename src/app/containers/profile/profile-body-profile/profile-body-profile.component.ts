import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {User} from "../../../shared/models/user.model";
import {Subscription} from "rxjs/index";
import {getUserService} from "../../../shared/services/getUsersInfo.service";

@Component({
  selector: 'app-profile-body-profile',
  templateUrl: './profile-body-profile.component.html',
  styleUrls: ['./profile-body-profile.component.scss']
})
export class ProfileBodyProfileComponent implements OnInit, OnDestroy {

  user: User;
  storeSub: Subscription;
  id = +sessionStorage.getItem('id');

  constructor(private store: Store<AppState>, private getUserService: getUserService) { }

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
