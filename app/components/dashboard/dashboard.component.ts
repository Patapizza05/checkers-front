import {Component, OnInit} from "@angular/core";
import {CheckersService} from "../../services/checkers.service";
import {CheckersGameImpl} from "../../model/checkers-game-impl.model";
import {Model} from "../../model/model.model";
import {ModelService} from "../../services/model.service";
import {ActivatedRoute} from "@angular/router";
@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',

})
export class DashboardComponent implements OnInit {

  get token(): string { return this.model.token; }
  set token(token: string) {
    this.model.token = token;
  }

  model: Model;

  get game(): CheckersGameImpl {
    return this.model.game;
  }

  set game(game: CheckersGameImpl) {
    this.model.game = game;
  }

  constructor(private checkersService: CheckersService,
              private modelService: ModelService,
              private route: ActivatedRoute) {
    this.model = modelService.model;
  }

  ngOnInit(): void {
    this.subscribeParams();
  }

  subscribeParams(): void {
    this.route.params.subscribe((param: any) => {
      if (param['token'] != null) {
        if (param['token'] != 'new') {
          this.token = param['token'];
          this.loadGame(this.token);
        }
        else {
          this.createGame();
        }
      }
    });
  }

  createGame(): void {
    this.model.loading = true;
    this.checkersService.createGame()
      .then(gameResponse => {
        this.game = gameResponse.game;
        this.token = gameResponse.token;
        this.model.loading = false;
      }).catch(reason => {
        this.model.error = true;
    });
  }

/*  createGame(): void {
    this.model.loading = true;
    this.checkersService.createGame().then(game => {
      this.game = game.game;
      this.model.loading = false;
    }).catch(reason => {
      this.model.error = true;
    })
  }*/

  loadGame(token: string): void {
    this.model.loading = true;
    this.checkersService.getGame(token).then(game => {
      this.game = game.game;
      this.model.loading = false;
    }).catch(reason => {
      this.model.error = true;
    });
  }


}
