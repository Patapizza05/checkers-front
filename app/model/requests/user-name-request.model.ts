import {User} from "../user.model";
export class UserNameRequest {
  color: String;
  name: String;

  constructor(user: User) {
    this.color = user.colorPawn;
    this.name = user.name;
  }

}
