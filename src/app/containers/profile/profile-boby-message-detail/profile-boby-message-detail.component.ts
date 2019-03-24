import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {Subscription} from "rxjs/index";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {getUserService} from "../../../shared/services/getUsersInfo.service";
import {User} from "../../../shared/models/user.model";
import {LoadProfile} from "../../../store/actions/user.action";
import * as moment from 'moment';

@Component({
  selector: 'app-profile-boby-message-detail',
  templateUrl: './profile-boby-message-detail.component.html',
  styleUrls: ['./profile-boby-message-detail.component.scss']
})
export class ProfileBobyMessageDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  messagesId: number;
  message: any;
  user: User;
  otherUser: User;
  id = +sessionStorage.getItem('id');
  newMessage = '';
  editMessageValue = '';

  openEdit = [];

  userServiceSub: Subscription;
  userServiceSub2: Subscription;
  userServiceSub3: Subscription;
  userServiceSub4: Subscription;
  userServiceSub5: Subscription;
  userServiceSub6: Subscription;
  userServiceSub7: Subscription;
  userServiceSub8: Subscription;
  userServiceSub9: Subscription;
  storeSub: Subscription;

  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private store: Store<AppState>,
    private getUserService: getUserService
  ) {}

  ngOnInit() {
    this.onInit();
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.onInit();
    }, 30000);
  }

  onInit() {
    this.messagesId = +this.activateRoute.snapshot.params['id'];
    this.userServiceSub = this.userService.getMessages(this.messagesId).subscribe(message => {
      this.message = message[0];
      this.message.peoples.forEach(id => {
        if (id !== this.id) {
          this.userServiceSub2 = this.userService.getUserById(+id).subscribe(user => {
            this.otherUser = user[0];
            this.storeSub = this.store.select('userPage').subscribe(({user}) => {
              if (!user.id) {
                this.getUserService.getUserInfo(this.id);
              } else {
                this.user = user;
                this.user.messages.forEach(message => {
                  if (message.id === this.message.id) {
                    message.unread = false;
                  }
                });
              }
            });
          });
        }
      });
      this.message.messages.forEach((m, i) => {
        this.openEdit[i] = false;
      });
    });
    setTimeout(() => {
      if (this.user) {
        this.userServiceSub3 = this.userService.updateUser(this.user).subscribe(data => {
          this.store.dispatch(new LoadProfile (data));
        });
      }
    }, 500);
  }

  addMessage() {
    const lastMessage = this.message.messages[this.message.messages.length - 1];
    if (lastMessage.author.id === this.id) {
      lastMessage.date = moment().format('DD.MM.YY HH:mm');
      lastMessage.message +=  '<br>' + this.newMessage;
      this.message.messages[this.message.messages.length - 1] = lastMessage;
    } else {
      const newMessage: any = {};
      newMessage.date = moment().format('DD.MM.YY HH:mm');
      newMessage.message = this.newMessage;
      newMessage.id = this.message.messages.length;
      newMessage.author = {id: this.user.id, name: this.user.firstName + ' ' + this.user.lastName};
      this.message.messages.push(newMessage);
    }
    this.user.messages.forEach(message => {
      if (message.id === this.messagesId) {
        message.message = lastMessage;
      }
    });
    this.otherUser.messages.forEach(message => {
      if (message.id === this.messagesId) {
        message.message = lastMessage;
        message.unread = true;
      }
    });
    this.userServiceSub4 = this.userService.updateMessages(this.message).subscribe(data => {
      this.userServiceSub5 = this.userService.updateUser(this.otherUser).subscribe(data => {
        setTimeout(() => {
          this.userServiceSub6 = this.userService.updateUser(this.user).subscribe(user => {
            this.store.dispatch(new LoadProfile (user));
            this.newMessage = '';
          });
        }, 500);
      });
    });
  }

  openEditMessage(m, i) {
    if (this.openEdit[i] === false) {}
    this.openEdit[i] = !this.openEdit[i];
    this.editMessageValue = m.message.split('<br>').join('\n');
  }

  editMessage(m) {
    m.message = this.editMessageValue.split('\n').join('<br>');
    this.user.messages.forEach(message => {
      if (message.id === this.messagesId) {
        message.message = m;
      }
    });
    this.otherUser.messages.forEach(message => {
      if (message.id === this.messagesId) {
        message.message = m;
        message.unread = true;
      }
    });
    this.userServiceSub7 = this.userService.updateMessages(this.message).subscribe(data => {
      if (m.id >= this.message.length) {
        this.userServiceSub8 = this.userService.updateUser(this.otherUser).subscribe(data => {
          this.userServiceSub9 = this.userService.updateUser(this.user).subscribe(user => {
            this.store.dispatch(new LoadProfile (user));
            this.editMessageValue = '';
          });
        });
      }
    });
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
      this.userServiceSub6.unsubscribe();
    }
    if (this.userServiceSub8) {
      this.userServiceSub6.unsubscribe();
    }
    if (this.userServiceSub9) {
      this.userServiceSub6.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
