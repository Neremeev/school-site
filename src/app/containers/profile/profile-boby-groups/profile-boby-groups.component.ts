import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/index";
import {User} from "../../../shared/models/user.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {getUserService} from "../../../shared/services/getUsersInfo.service";

@Component({
  selector: 'app-profile-boby-groups',
  templateUrl: './profile-boby-groups.component.html',
  styleUrls: ['./profile-boby-groups.component.scss']
})
export class ProfileBobyGroupsComponent implements OnInit, OnDestroy {

  storeSub: Subscription;
  user: User;
  viewGroups = true;
  groupsList = [];
  myGroups = [];
  searchValue = '';
  id = +sessionStorage.getItem('id');

  constructor(private getUserService: getUserService, private store: Store<AppState>) {}

  ngOnInit() {
    this.storeSub = this.store.select('userPage').subscribe(({user, groupsList, myGroupsList}) => {
      if (!user.id) {
        this.getUserService.getUserInfo(this.id);
      } else {
        this.user = user;
        this.groupsList = groupsList;
        this.myGroups = myGroupsList;
      }
    });
  }

  changeGroups(value) {
    this.viewGroups = value;
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
