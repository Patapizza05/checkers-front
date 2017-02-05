import {Component, Input, EventEmitter} from "@angular/core";
import {User} from "../../model/user.model";
import {Model} from "../../model/model.model";
import {ModelService} from "../../services/model.service";
@Component({
  moduleId: module.id,
  selector: 'my-player-information',
  templateUrl: 'player-information.component.html'
})
export class PlayerInformationComponent {
  @Input()
  user: User;

  model: Model;

  constructor(private modelService: ModelService) {
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
    this.isEdit = false;
  }
}
