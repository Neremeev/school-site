export class User {
  constructor(
    public login: string,
    public password: string,
    public role: string,
    public id: number,
    public groups: Array<number>,
    public friends: Array<number>,
    public teachGroup: string,
    public teacher: string,
    public birthDay: number,
    public last_seen: number,
    public gender: number,
    public photo?: string
  ) {}
}