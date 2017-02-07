import {Component} from "@angular/core";
import {CheckersService} from "../../services/checkers.service";
import {LightGame} from "../../model/light-game.model";
import {LightUser} from "../../model/light-user.model";
import {ModelService} from "../../services/model.service";
import {Model} from "../../model/model.model";
import {CheckersGameImpl} from "../../model/checkers-game-impl.model";
@Component({
  moduleId: module.id,
  templateUrl: 'games.component.html',
  styleUrls: ['games.component.css']
})
export class GamesComponent {

  get model(): Model { return this.modelService.model; }
  loading: boolean = false;
  error: boolean = false;
  games: LightGame[];

  constructor(private checkersService: CheckersService,
  private modelService: ModelService) {
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

  /** UI **/

  //MaterialColors
  gamesClasses(game: LightGame): {[key: string]: boolean} {
    let result: {[key: string]: boolean} = {};
    this.addClass(result, this.model.colors.neutral_player_color_text, game.userBlack.nbPawns == game.userWhite.nbPawns);
    this.addClass(result, this.model.colors.player_bottom_black_text, game.userBlack.nbPawns < game.userWhite.nbPawns);
    this.addClass(result, this.model.colors.player_top_white_text, game.userWhite.nbPawns < game.userBlack.nbPawns);
    return result;
  };

  private addClass(result: {[key: string]: boolean}, key: string, value: boolean): void
  {
    if (result.hasOwnProperty(key)) {
      result[key] = result[key] || value;
    }
    else {
      result[key] = value;
    }
  }


}
