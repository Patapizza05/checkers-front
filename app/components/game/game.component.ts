import {Component, OnInit} from "@angular/core";
import {CheckersService} from "../../services/checkers.service";
import {CheckersGameImpl} from "../../model/checkers-game-impl.model";
import {Model} from "../../model/model.model";
import {ModelService} from "../../services/model.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {GameResponse} from "../../model/responses/game-response.model";
import {Urls} from "../../model/ui/urls.model";
@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'game.component.html',

})
export class GameComponent implements OnInit {

  /** VARIABLES **/

  model: Model;
  get token(): string { return this.model.token; }
  set token(token: string) { this.model.token = token; }
  get game(): CheckersGameImpl { return this.model.game; }
  set game(game: CheckersGameImpl) { this.model.game = game; }

  /** CONSTRUCTOR && CREATION **/

  constructor(private checkersService: CheckersService,
              private modelService: ModelService,
              private route: ActivatedRoute,
              private location: Location) {
    modelService.clear();
    this.model = modelService.model;
  }

  ngOnInit(): void {
    this.subscribeParams();
  }

  subscribeParams(): void {
    this.route.params.subscribe((param: any) => {
      if (param[this.model.urls.param_token] != null) {
        if (param[this.model.urls.param_token] != this.model.urls.token_new) {
          this.token = param[this.model.urls.param_token];
          this.loadGame(this.token);
        }
        else {
          this.createGame();
        }
      }
    });
  }

  /** GAME METHODS **/

  createGame(): void {
    this.model.loading = true;
    this.checkersService.createGame()
      .then(gameResponse => {
        this.updateGame(gameResponse);
        this.location.go(Urls.toUrl(this.model.urls.game(gameResponse.token)));
      }).catch(reason => {
      this.model.error = true;
    });
  }

  loadGame(token: string): void {
    this.model.loading = true;
    this.checkersService.getGame(token).then(gameResponse => {
      this.updateGame(gameResponse);
    }).catch(reason => {
      this.model.error = true;
    });
  }

  updateGame(gameResponse: GameResponse) {
    this.game = gameResponse.game;
    this.token = gameResponse.token;
    this.model.loading = false;
    this.loadHistory(gameResponse.token);
  }

  loadHistory(token: string): void {
    this.checkersService.getHistory(token)
      .then(history => this.model.game.history = history);
  }


}
