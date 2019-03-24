import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/index";
import {User} from "../../../shared/models/user.model";
import {getUserService} from "../../../shared/services/getUsersInfo.service";
import {AppState} from "../../../store/app.state";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-profile-boby-message',
  templateUrl: './profile-boby-message.component.html',
  styleUrls: ['./profile-boby-message.component.scss']
})
export class ProfileBobyMessageComponent implements OnInit, OnDestroy {

  storeSub: Subscription;

  user: User;
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
