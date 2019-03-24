import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
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

  getAllUsers() {
    return this.get('peoples');
  }

  getGroup(id: number) {
    return this.get(`groupsList?id=${id}`);
  }

  getUserById(id: number) {
    return this.get(`users?id=${id}`);
  }

  getMessages(id: number) {
    return this.get(`messages?id=${id}`);
  }

  updateMessages(messages) {
    return this.put(`messages/${messages.id}`, messages);
  }

  updateUser(user: User) {
    return this.put(`users/${user.id}`, user);
  }

  updateGroup(id, group) {
    return this.put(`groupsList/${id}`, group);
  }

  getGroupsList() {
    return this.get('groupsList');
  }

  postNewRequest(request) {
    return this.post('requests', request);
  }
}