import {Component, Input, EventEmitter} from "@angular/core";
import {User} from "../../model/user.model";
import {Model} from "../../model/model.model";
import {ModelService} from "../../services/model.service";
import {CheckersService} from "../../services/checkers.service";
import {UserNameRequest} from "../../model/requests/user-name-request.model";
@Component({
  moduleId: module.id,
  selector: 'my-player-information',
  templateUrl: 'player-information.component.html',
  styleUrls: ['player-information.component.css']
})
export class PlayerInformationComponent {
  @Input()
  user: User;

  model: Model;

  constructor(
    private checkersService: CheckersService,
    private modelService: ModelService) {
    this.model = modelService.model;
  }

  isEdit: boolean = false;

  isTurn(): boolean {
    return this.user.colorPawn == this.model.game.board.nextUser;
  }


  isPlayerBlack():boolean {
    return this.user.colorPawn == 'BLACK'
  }

  isPlayerWhite():boolean {
    return this.user.colorPawn == 'WHITE'
  }

  edit() {
    this.isEdit = true;
    return false; //link
  }

  confirm() {
    this.checkersService.setName(this.model.token, new UserNameRequest(this.user))
      .then(newName => {
        this.user.name = newName;
      });
    this.isEdit = false;
  }
}
