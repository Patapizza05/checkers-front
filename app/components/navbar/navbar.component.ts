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

  model: Model;

  constructor(private checkersService: CheckersService,
              private modelService: ModelService) {
    this.model = modelService.model;
  }

  new(): void {
    this.checkersService.createGame().then(game => this.model.game = game.game).catch(err => console.log(err));
  }

  toggleDebug() {
    this.model.debug = !this.model.debug;
    return false;
  }



}
