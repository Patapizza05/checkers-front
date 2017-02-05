import {Component, Input, EventEmitter, Output, forwardRef, Inject, Host} from "@angular/core";
import {Move} from "../../model/move.model";
import {CheckersService} from "../../services/checkers.service";
import {CheckersGameImpl} from "../../model/checkers-game-impl.model";
import {Cell} from "../../model/cell.model";
import {MoveResult} from "../../model/move-result.model";
import {Model} from "../../model/model.model";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {ModelService} from "../../services/model.service";
import {PlayRequest} from "../../model/requests/play-request.model";
@Component({
  moduleId: module.id,
  selector: 'my-board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.css']
})
export class BoardComponent {

  model: Model;

  get debug(): boolean {
    return this.model.debug;
  }

  get token(): String { return this.model.token; }

  private localGetPossibleMoves = false;

  dashboard: DashboardComponent; //Parent

  get game() : CheckersGameImpl {
    return this.model.game;
  }
  set game(game: CheckersGameImpl) {
    this.model.game = game;
  }

  crownIconPath = 'resources/crown.png';

  activeCell: Cell;
  activeMoves: Move[] = [];

  get nextUser(): string {
    try {
      return this.game.board.nextUser;

    }catch(err) {
      return null;
    }
  }

  set nextUser(nextUser: string) {
    this.game.board.nextUser = nextUser;
  }

  constructor(
    private checkersService: CheckersService,
    private modelService: ModelService,
    @Host() @Inject(forwardRef(() => DashboardComponent)) dashboard: DashboardComponent
  ) {
    this.dashboard = dashboard;
    this.model = modelService.model;
  }


  select(cell: Cell) {

    if (this.activeCell == cell) {
      this.activeCell = null;
      this.activeMoves = [];
      return;
    }

    if (cell != null && cell.pawn != null && cell.pawn.color == this.game.board.nextUser) {

      this.activeMoves = [];



      let moves: Move[] = [];
      if (this.localGetPossibleMoves) {
        moves = this.game.board.getPossibleMoves(cell);
      }
      else {
        this.checkersService.getPossibleMoves(this.token, cell.position)
          .then(response => {
            moves = response;
            for (let move of moves) {
              this.activeCell = cell;
              this.activeMoves.push(move);
            }
          })
          .catch(err => {
            moves = this.game.board.getPossibleMoves(cell);
            for (let move of moves) {
              this.activeCell = cell;
              this.activeMoves.push(move);
            }
        })
      }


    }
  }

  move(move: Move) {
    if (this.activeCell == null || this.activeCell.pawn == null || move == null || move.destination == null) return false;

    this.checkersService.play(this.token, new PlayRequest(this.activeCell.position, move.destination.position))
      .then(moveResult => {
        this.apply(moveResult);
      });


  }

  getMoveFromCell(cell: Cell): Move {
    return this.activeMoves.find(m => m.destination.equals(cell));
  }

  isActive(cell: Cell) {
    return this.activeMoves.find(m => m.destination.equals(cell)) != null;

  }

  isActiveColor1(): boolean {
    return this.activeCell != null && this.activeCell.pawn != null && !this.activeCell.pawn.isColorWhite;
  }


  apply(moveResult: MoveResult) {
    this.model.apply(moveResult);
    this.activeCell = null;
    this.activeMoves = [];
  }


}
