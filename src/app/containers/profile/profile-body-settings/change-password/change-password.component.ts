import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/services/user.service";
import {User} from "../../../../shared/models/user.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.state";
import {Subscription} from "rxjs/index";
import {LoadProfile} from "../../../../store/actions/user.action";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  formChangePassword: FormGroup;

  user: User;
  storeSub: Subscription;
  userServiceSub: Subscription;

  constructor(private userService: UserService, private store: Store<AppState>) {}

  ngOnInit() {
    this.storeSub = this.store.select('userPage').subscribe(({user}) => {
      this.user = user;
    });
    this.formChangePassword = new FormGroup({
      'oldPassword': new FormControl(null, [Validators.required]),
      'newPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'newPasswordCheck': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    const formData = this.formChangePassword.value;
    if (formData.newPassword === formData.newPasswordCheck) {
        if (this.user.password === formData.oldPassword) {
          this.user.password = formData.newPassword;
          this.userServiceSub = this.userService.updateUser(this.user)
            .subscribe(data => {
              this.store.dispatch(new LoadProfile (data));
            });
        } else {

        }
    } else {

    }
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    if (this.userServiceSub) {
      this.userServiceSub.unsubscribe();
    }
  }

}
