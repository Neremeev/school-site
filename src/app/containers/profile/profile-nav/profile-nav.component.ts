import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../../../store/app.state";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs/index";
import {User} from "../../../shared/models/user.model";
import {getUserService} from "../../../shared/services/getUsersInfo.service";

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavComponent implements OnInit, OnDestroy {

  storeSub2: Subscription;
  newMessages: boolean;
  unreadMessageCount: number;

  user: User;
  id = +sessionStorage.getItem('id');

  constructor(private store: Store<AppState>, private getUserService: getUserService) {
    this.storeSub2 = this.store.select('userPage').subscribe(({user}) => {
      if (!user.id) {
        this.getUserService.getUserInfo(this.id);
      } else {
        this.user = user;
        this.unreadMessageCount = 0;
        this.newMessages = this.user.messages.some(message => {
          if (message.unread) {
            this.unreadMessageCount += 1;
          }
          return message.unread;
        });
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.storeSub2) {
      this.storeSub2.unsubscribe();
    }
  }

}
