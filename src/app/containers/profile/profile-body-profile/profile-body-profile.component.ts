import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {User} from "../../../shared/models/user.model";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-profile-body-profile',
  templateUrl: './profile-body-profile.component.html',
  styleUrls: ['./profile-body-profile.component.scss']
})
export class ProfileBodyProfileComponent implements OnInit, OnDestroy {

  user: User;
  storeSub: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.storeSub = this.store.select('userPage').subscribe(({user}) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
