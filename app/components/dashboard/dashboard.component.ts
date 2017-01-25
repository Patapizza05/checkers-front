import {Component} from "@angular/core";
import {CheckersService} from "../../services/checkers.service";
import {CheckersGameImpl} from "../../model/checkers-game-impl.model";
import {Model} from "../../model/model.model";
@Component({
  moduleId: module.id,
  selector:'my-dashboard',
  templateUrl: 'dashboard.component.html',

})
export class DashboardComponent {

  model: Model = new Model();

  get game() : CheckersGameImpl {
    return this.model.game;
  }
  set game(game: CheckersGameImpl) {
    this.model.game = game;
  }

  constructor(private checkersService: CheckersService) {
    this.loadGame();
  }

  createGame(): void {
    this.model.loading = true;
    this.checkersService.createGame().then(game => {
      this.game = game;
      this.model.loading = false;
    }).catch(reason => {
      this.model.error = true;
    })
  }

  loadGame():void {
    this.model.loading = true;
    this.checkersService.getGame().then(game => {
      this.game = game;
      this.model.loading = false;
    }).catch(reason => {
      this.model.error = true;
    });
  }


}
