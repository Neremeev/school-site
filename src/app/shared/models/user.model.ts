export class User {
  constructor(
    public login: string,
    public password: string,
    public role: string,
    public id: number,
    public firstName: string,
    public lastName: string,
    public groups: Array<number>,
    public friends: Array<any>,
    public teachGroup: string,
    public teacher: string,
    public birthDay: number,
    public last_seen: string,
    public gender: number,
    public applications: Array<any>,
    public messages: any,
    public photo?: string
  ) {}
}