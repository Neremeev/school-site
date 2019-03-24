import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {getUserService} from "../../../shared/services/getUsersInfo.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {Subscription} from "rxjs/index";
import * as moment from 'moment';

@Component({
  selector: 'app-profile-group-detail',
  templateUrl: './profile-group-detail.component.html',
  styleUrls: ['./profile-group-detail.component.scss']
})
export class ProfileGroupDetailComponent implements OnInit, OnDestroy {

  storeSub1: Subscription;
  storeSub2: Subscription;
  userServiceSub1: Subscription;
  userServiceSub2: Subscription;
  userServiceSub3: Subscription;
  userServiceSub4: Subscription;
  userServiceSub5: Subscription;
  userServiceSub6: Subscription;
  userServiceSub7: Subscription;

  countMessages = 10;
  newNote = '';
  newComment = '';
  group;
  groupsList;
  myGroups;
  groupId;
  groupInMyList;
  sendRequest;
  user;
  notes;
  id = +sessionStorage.getItem('id');


  constructor(
    private store: Store<AppState>,
    private getUserService: getUserService,
    private userService: UserService,
    private activateRoute: ActivatedRoute
  ) {
    this.storeSub1 = this.store.select('userPage').subscribe(({user}) => {
      if (!user.id) {
        this.getUserService.getUserInfo(this.id);
      }
    });
  }

  ngOnInit() {
    this.groupId = this.activateRoute.snapshot.params['id'];
    this.sendRequest = this.activateRoute.queryParams['value']['request'];
    this.storeSub2 = this.store.select('userPage').subscribe(({user, groupsList, myGroupsList}) => {
      this.groupsList = groupsList;
      this.myGroups = myGroupsList;
      this.user = user;
      this.groupInMyList = this.myGroups.some(group => {
        return +this.groupId === +group.id;
      });
    });
    this.userServiceSub2 = this.userService.getGroup(+this.groupId).subscribe(data => {
      this.group = data[0];
    });
  }

  ngOnDestroy() {
    if (this.storeSub1) {
      this.storeSub1.unsubscribe();
    }
    if (this.storeSub2) {
      this.storeSub2.unsubscribe();
    }
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
    if (this.userServiceSub5) {
      this.userServiceSub5.unsubscribe();
    }
    if (this.userServiceSub6) {
      this.userServiceSub6.unsubscribe();
    }
    if (this.userServiceSub7) {
      this.userServiceSub7.unsubscribe();
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.countMessages += 10;
    }
  }

  onRequest() {
    const data = {
      userId: this.user.id,
      groupId: +this.groupId
    };
    this.userServiceSub1 = this.userService.postNewRequest(data).subscribe(data => {
      console.log(data);
    });
  }

  updatePinMessage () {
    this.userServiceSub3 = this.userService.updateGroup(this.groupId, this.group).subscribe(data => {
      console.log(data);
    });
  }

  updateMessage(m) {
    this.group.notes.forEach((note, idx) => {
      if (note.id === m.id) {
        this.group.notes[idx] = m;
      }
    });
    this.userServiceSub4 = this.userService.updateGroup(this.groupId, this.group).subscribe(data => {
      console.log(data);
    });
  }

  newMessage() {
    let newNote = {
      author: {id: +this.user.id, name: this.user.firstName + ' ' + this.user.lastName},
      date: moment().format('DD.MM.YY HH:mm'),
      description: this.newNote,
      id: this.group.notes.length + 2
    };
    this.group.notes.unshift(newNote);
    this.userServiceSub5 = this.userService.updateGroup(this.groupId, this.group).subscribe(data => {
      this.newNote = '';
      console.log(this.group);
    });
  }

  updateMessageComments(c, m) {
    this.group.notes.forEach((note, idx) => {
      if (note.id === m.id) {
        this.group.notes[idx]['tread'].forEach((comment, id) => {
          if (comment.id === c.id) {
            this.group.notes[idx]['tread'][id] = c;
          }
        });
      }
    });
    this.userServiceSub6 = this.userService.updateGroup(this.groupId, this.group).subscribe(data => {
      console.log(data);
    });
  }

  newMessageComment(m) {
    let idx;
    this.group.notes.forEach((note, id) => {
      if (note.id === m.id) {
        idx = id;
      }
    });
    let newComment = {
      author: {id: +this.user.id, name: this.user.firstName + ' ' + this.user.lastName},
      date: moment().format('DD.MM.YY HH:mm'),
      description: this.newComment,
      id: this.group.notes[idx]['tread'].length + 2
    };
    this.group.notes[idx]['tread'].push(newComment);
    this.userServiceSub7 = this.userService.updateGroup(this.groupId, this.group).subscribe(data => {
      this.newComment = '';
    });
  }

}
