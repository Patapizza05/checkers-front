import {Component} from "@angular/core";
import {CheckersService} from "../../services/checkers.service";
import {LightGame} from "../../model/light-game.model";
import {LightUser} from "../../model/light-user.model";
@Component({
  moduleId: module.id,
  templateUrl: 'games.component.html',
  styleUrls: ['games.component.css']
})
export class GamesComponent {

  loading: boolean = false;
  error: boolean = false;
  games: LightGame[];

  constructor(private checkersService: CheckersService) {
    this.loadGames();
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

}
