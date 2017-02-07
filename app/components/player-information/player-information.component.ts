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

  get colors(): string[] {
    let excludedColor: string;
    if (this.isPlayerBlack()) {
      excludedColor = this.model.colors.player_top_white;
    }
    else {
      excludedColor = this.model.colors.player_bottom_black;
    }
    return this.model.colors.colors.filter(c => c != excludedColor);
  }

  /** UI **/
  //MaterialColors
  cardClasses(): {[key: string]: boolean} {
    let result: {[key: string]: boolean} = {};
    let isTurn = this.isTurn();
    let isColorWhite = this.user.isColorWhite();
    let isColorBlack = this.user.isColorBlack();

    this.addClass(result, this.model.colors.player_bottom_black_text_on_player_background, isTurn && isColorBlack);
    this.addClass(result, this.model.colors.player_top_white_text_on_player_background, isTurn && isColorWhite);
    this.addClass(result, this.model.colors.player_info_text_not_turn, !isTurn);
    this.addClass(result, this.model.colors.player_top_white, isTurn && isColorWhite);
    this.addClass(result, this.model.colors.player_bottom_black, isTurn && isColorBlack);
    return result;
  };

  badgeClasses(): {[key: string]: boolean} {
    let result: {[key: string]: boolean} = {};
    this.addClass(result, this.model.colors.player_bottom_black, this.user.isColorBlack());
    this.addClass(result, this.model.colors.player_top_white, this.user.isColorWhite());
    return result;
  }

  editLinkClasses(): {[key: string]: boolean} {
    let result: {[key: string]: boolean} = {};
    this.addClass(result, this.model.colors.player_top_white_text, this.user.isColorWhite());
    this.addClass(result, this.model.colors.player_bottom_black_text, this.user.isColorBlack());
    return result;
  }

  private addClass(result: {[key: string]: boolean}, key: string, value: boolean): void
  {
    if (result.hasOwnProperty(key)) {
      result[key] = result[key] || value;
    }
    else {
      result[key] = value;
    }
  }

  selectColor(color: string) {
    if (this.user.isColorBlack()) {
      this.model.colors.player_bottom_black = color;
    }
    else {
      this.model.colors.player_top_white = color;
    }
  }

}
