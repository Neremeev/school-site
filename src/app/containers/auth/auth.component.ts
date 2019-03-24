import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user.model";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {LoadProfile} from "../../store/actions/user.action";
import {Subscription} from "rxjs/index";
import {getUserService} from "../../shared/services/getUsersInfo.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  form: FormGroup;
  message;
  userServiceSub: Subscription;

  constructor(
    private userService: UserService,
    private getUserService: getUserService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      'login': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const formData = this.form.value;
    this.userServiceSub = this.userService.getUser(formData.login)
      .subscribe((user: User) => {
        if (user[0]) {
          if (user[0].password === formData.password) {
            this.store.dispatch(new LoadProfile (user[0]));
            sessionStorage.setItem('id', user[0]['id']);
            this.getUserService.getUserInfo(user[0]);
            this.router.navigate(['/profile', 'account']);
          } else {
            this.showMessage('Пароль не верный');
          }
        } else {
          this.showMessage('Такого пользователя не существует');
        }
      });
  }

  ngOnDestroy() {
    if (this.userServiceSub) {
      this.userServiceSub.unsubscribe();
    }
  }


  private showMessage(message) {
    this.message = message;
    window.setTimeout(() => {
      this.message = '';
    }, 5000);
  }

}
