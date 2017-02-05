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

  games: LightGame[];

  constructor(private checkersService: CheckersService) {
    this.checkersService.getGames()
      .then(games => this.games = games);
  }

  newGame() {
    this.checkersService.createGame()
      .then(game => {
        this.checkersService.getGames().then(games => this.games = games);
      });
  }

}
