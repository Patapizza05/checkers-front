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

  get token(): String { return this.model.token; }
  set token(token: String) {
    this.model.token = token;
    this.loadGame(token);
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
        this.token = param['token'];
      }
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

  loadGame(token: String): void {
    this.model.loading = true;
    this.checkersService.getGame(token).then(game => {
      this.game = game.game;
      this.model.loading = false;
    }).catch(reason => {
      this.model.error = true;
    });
  }


}
