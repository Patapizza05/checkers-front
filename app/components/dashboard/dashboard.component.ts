import {Component} from "@angular/core";
import {CheckersService} from "../../services/checkers.service";
import {CheckersGameImpl} from "../../model/checkers-game-impl.model";
import {Model} from "../../model/model.model";
import {ModelService} from "../../services/model.service";
@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',

})
export class DashboardComponent {

  token: String = 'muelr2zmay';

  model: Model;

  get game(): CheckersGameImpl {
    return this.model.game;
  }

  set game(game: CheckersGameImpl) {
    this.model.game = game;
  }

  constructor(private checkersService: CheckersService,
              private modelService: ModelService) {
    this.model = modelService.model;
    this.loadGame();
  }

  createGame(): void {
    this.model.loading = true;
    this.checkersService.createGame().then(game => {
      this.game = game.game;
      this.model.loading = false;
    }).catch(reason => {
      this.model.error = true;
    })
  }

  loadGame(): void {
    this.model.loading = true;
    this.checkersService.getGame(this.token).then(game => {
      this.game = game.game;
      this.model.loading = false;
    }).catch(reason => {
      this.model.error = true;
    });
  }


}
