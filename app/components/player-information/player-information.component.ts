import {Component, Input} from "@angular/core";
import {User} from "../../model/user.model";
import {Model} from "../../model/model.model";
@Component({
  moduleId: module.id,
  selector: 'my-player-information',
  templateUrl: 'player-information.component.html'
})
export class PlayerInformationComponent {
  @Input()
  user: User;

  @Input()
  model: Model;

  isTurn(): boolean {
    return this.user.colorPawn == this.model.game.board.nextUser;
  }


  isPlayerBlack():boolean {
    return this.user.colorPawn == 'BLACK'
  }

  isPlayerWhite():boolean {
    return this.user.colorPawn == 'WHITE'
  }

}
