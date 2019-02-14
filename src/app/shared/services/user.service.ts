import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {BaseApi} from "../core/base.api";
import {User} from "../models/user.model";

@Injectable()
export class UserService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUser(login: string) {
    return this.get(`users?login=${login}`);
  }

  updateUser(user: User) {
    return this.put(`users/${user.id}`, user);
  }

  // logIn(login: string) {
  //   this.Http.get(this.BASE_URL + 'auth').subscribe((data) => {
  //     const data1 = data;
  //     this.store.dispatch(new LoadAuth(data1));
  //   });
  // }
}