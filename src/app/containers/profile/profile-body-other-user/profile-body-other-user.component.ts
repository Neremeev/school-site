import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {UserService} from "../../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/index";
import {AppState} from "../../../store/app.state";
import {Store} from "@ngrx/store";
import {LoadProfile} from "../../../store/actions/user.action";

@Component({
  selector: 'app-profile-body-other-user',
  templateUrl: './profile-body-other-user.component.html',
  styleUrls: ['./profile-body-other-user.component.scss']
})
export class ProfileBodyOtherUserComponent implements OnInit, OnDestroy {

  iAmUser: User;
  user: User;
  userId: number;
  id = +sessionStorage.getItem('id');
  button: boolean;
  application: boolean;

  storeSub1: Subscription;
  storeSub2: Subscription;
  userServiceSub1: Subscription;
  userServiceSub2: Subscription;
  userServiceSub3: Subscription;
  userServiceSub4: Subscription;

  constructor(
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.userId = +this.activateRoute.snapshot.params['id'];
    this.userServiceSub1 = this.userService.getUserById(this.userId).subscribe(user => {
      this.user = user[0];
    });
    this.userServiceSub2 = this.userService.getUserById(this.id).subscribe(user => {
      this.iAmUser = user[0];
      this.store.dispatch(new LoadProfile (user[0]));
      this.button = this.iAmUser.friends.some(friend => {
        return +friend.id === +this.user.id;
      });
      this.application = this.user.applications.some(friend => {
        return friend.id  === this.iAmUser.id;
      });
    });
  }

  ngOnDestroy() {
    if (this.userServiceSub1) {
      this.userServiceSub1.unsubscribe();
    }
    if (this.userServiceSub2) {
      this.userServiceSub2.unsubscribe();
    }
    if (this.userServiceSub3) {
      this.userServiceSub3.unsubscribe();
    }
    if (this.userServiceSub4) {
      this.userServiceSub4.unsubscribe();
    }
    if (this.storeSub1) {
      this.storeSub1.unsubscribe();
    }
    if (this.storeSub2) {
      this.storeSub2.unsubscribe();
    }
  }

  addFriends() {
    const application = this.user.applications.some(friend => {
      return friend.id  === this.iAmUser.id;
    });
    if (!application) {
      this.user.applications.push({id: this.iAmUser.id, name: this.iAmUser.firstName + ' ' + this.iAmUser.lastName});
      this.userServiceSub3 = this.userService.updateUser(this.user).subscribe(data => {
        this.application = true;
      });
    }
  }

  deleteFriends() {
    this.iAmUser.friends = this.iAmUser.friends.filter(friend => {
      return friend.id !== this.user.id;
    });
    this.userServiceSub4 = this.userService.updateUser(this.iAmUser).subscribe(data => {
      this.button = false;
    });
  }

}
