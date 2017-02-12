import {Player} from "../user.model";
export class UserNameRequest {
  color: String;
  name: String;

  constructor(user: Player) {
    this.color = user.colorPawn;
    this.name = user.name;
  }

}
