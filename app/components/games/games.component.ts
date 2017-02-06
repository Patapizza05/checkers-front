import {Component} from "@angular/core";
import {CheckersService} from "../../services/checkers.service";
import {LightGame} from "../../model/light-game.model";
import {LightUser} from "../../model/light-user.model";
import {ModelService} from "../../services/model.service";
@Component({
  moduleId: module.id,
  templateUrl: 'games.component.html',
  styleUrls: ['games.component.css']
})
export class GamesComponent {

  loading: boolean = false;
  error: boolean = false;
  games: LightGame[];

  constructor(private checkersService: CheckersService,
  modelService: ModelService) {
    this.loadGames();
    modelService.clear();
  }

  loadGames() {
    this.loading = true;
    this.error = false;
    this.checkersService.getGames()
      .then(games => {
        this.loading = false;
        this.games = games;
      })
      .catch(reason => {
        this.loading = false;
        this.error = true;
      });
  }

  newGame() {
    this.loading = true;
    this.error = false;
    this.checkersService.createGame()
      .then(game => {
        this.checkersService.getGames()
          .then(games => {
            this.loading = false;
            this.games = games;
          });
      })
      .catch(reason => {
        this.loading = false;
        this.error = true;
      });
  }

  deleteGame(token: string) {
    this.loading = true;
    this.error = false;
    this.checkersService.deleteGame(token)
      .then(token => {
        this.games = this.games.filter(g => g.token != token);
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        this.error = true;
      });
  }

}
