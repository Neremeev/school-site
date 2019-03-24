import {Component, OnDestroy, OnInit} from '@angular/core';
import {getUserService} from "../../../shared/services/getUsersInfo.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {Subscription} from "rxjs/index";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/models/user.model";
import {LoadProfile} from "../../../store/actions/user.action";

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html',
  styleUrls: ['./profile-friends.component.scss']
})
export class ProfileFriendsComponent implements OnInit, OnDestroy {

  searchValue = '';
  viewFriends: any = true;
  id = +sessionStorage.getItem('id');
  myFriends = [];
  friendList = [];
  allUserList = [];
  user: User;

  storeSub: Subscription;
  userServiceSub: Subscription;
  userServiceSub2: Subscription;
  userServiceSub3: Subscription;

  constructor(private getUserService: getUserService, private store: Store<AppState>, private  userService: UserService) { }

  ngOnInit() {
    this.userServiceSub = this.userService.getAllUsers().subscribe(users => {
      this.allUserList = users;
    });
    this.storeSub = this.store.select('userPage').subscribe(({user}) => {
      if (!user.id) {
        this.getUserService.getUserInfo(this.id);
      } else {
        this.myFriends = user.friends;
        this.user = user;
      }
    });
  }

  addFriend(application) {
    this.user.applications = this.user.applications.filter(applic => {
      return applic.id !== application.id;
    });
    this.user.friends.push(application);
    this.userServiceSub2 = this.userService.updateUser(this.user).subscribe(data => {
      this.store.dispatch(new LoadProfile (data));
    });
  }

  deleteFriend(application) {
    this.user.applications = this.user.applications.filter(applic => {
      return applic.id !== application.id;
    });
    this.userServiceSub3 = this.userService.updateUser(this.user).subscribe(data => {
      this.store.dispatch(new LoadProfile (data));
    });
  }

  changeFriends(value) {
    this.viewFriends = value;
  }

  ngOnDestroy() {
    if (this.userServiceSub) {
      this.userServiceSub.unsubscribe();
    }
    if (this.userServiceSub2) {
      this.userServiceSub2.unsubscribe();
    }
    if (this.userServiceSub3) {
      this.userServiceSub3.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
