import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {LoadGroupsList, LoadMyGroups, LoadProfile} from "../../store/actions/user.action";
import {Subscription} from "rxjs/index";
import {User} from "../models/user.model";
import * as moment from 'moment';

@Injectable()
export class getUserService implements OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  userServiceSub: Subscription;
  userServiceSub2: Subscription;
  storeSub: Subscription;

  id = +sessionStorage.getItem('id');
  user: User;
  groupsList = [];
  myGroups = [];

  constructor(public http: HttpClient, private store: Store<AppState>, private userService: UserService) {}

  getUserInfo(userOrId) {
    if (typeof userOrId === "number") {
      this.sub1 = this.userService.getUserById(this.id).subscribe(data => {
        this.store.dispatch( new LoadProfile(data[0]));
        this.user = data[0];
        return this.getInfo();
      });
    } else {
      this.storeSub = this.store.select('userPage').subscribe(({user}) => {
        this.user = user;
        this.user.last_seen = moment().format('DD.MM.YY HH:mm');
        this.userServiceSub2 = this.userService.updateUser(this.user).subscribe(data => {
          console.log(data);
        });
      });
      return this.getInfo();
    }
  }


  getInfo() {
    this.userServiceSub = this.userService.getGroupsList().subscribe(data => {
      this.groupsList = data;

      this.groupsList.forEach(group => {
        for (let i = 0; i < this.user.groups.length; i++) {
          if (this.user.groups[i] === group.id) {
            this.myGroups.push(group);
          }
        }
      });

      this.store.dispatch( new LoadGroupsList(data));
      this.store.dispatch( new LoadMyGroups(this.myGroups));
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.userServiceSub) {
      this.userServiceSub.unsubscribe();
    }
    if (this.userServiceSub2) {
      this.userServiceSub2.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}