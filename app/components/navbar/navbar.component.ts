import {Component} from "@angular/core";
import {CheckersService} from "../../services/checkers.service";
import {ModelService} from "../../services/model.service";
import {Model} from "../../model/model.model";
@Component({
  moduleId: module.id,
  selector: 'my-navbar',
  templateUrl: 'navbar.component.html'
})
export class NavBarComponent {

  get model(): Model {
    return this.modelService.model;
  }

  constructor(private checkersService: CheckersService,
              private modelService: ModelService) {
  }

  new(): void {
    this.checkersService.createGame().then(game => this.model.game = game.game).catch(err => console.log(err));
  }

  skip(): void {
    this.model.loading = true;
    this.checkersService.skip(this.model.token)
      .then(gameResponse => {
        if (gameResponse != null) {
          this.model.game = gameResponse.game;
          this.loadHistory(this.model.token);
        }
        this.model.loading = false;
      })
      .catch(err => {
        this.model.error = true;
      })
  }

  loadHistory(token: string): void {
    this.checkersService.getHistory(token)
      .then(history => this.model.game.history = history);
  }

}
