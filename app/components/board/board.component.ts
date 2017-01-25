import {Component, Input, EventEmitter, Output, forwardRef, Inject, Host} from "@angular/core";
import {Move} from "../../model/move.model";
import {CheckersService} from "../../services/checkers.service";
import {CheckersGameImpl} from "../../model/checkers-game-impl.model";
import {Cell} from "../../model/cell.model";
import {MoveResult} from "../../model/move-result.model";
import {Model} from "../../model/model.model";
import {DashboardComponent} from "../dashboard/dashboard.component";
@Component({
  moduleId: module.id,
  selector: 'my-board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.css']
})
export class BoardComponent {

  @Input()
    model: Model;

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
    @Host() @Inject(forwardRef(() => DashboardComponent)) dashboard: DashboardComponent
  ) {
    this.dashboard = dashboard;
  }


  select(cell: Cell) {

    if (this.activeCell == cell) {
      this.activeCell = null;
      this.activeMoves = [];
      return;
    }



    console.log(this.game.board.nextUser);

    if (cell != null && cell.pawn != null && cell.pawn.color == this.game.board.nextUser) {

      this.activeMoves = [];
      let moves = this.game.board.getPossibleMoves(cell);
      for (let move of moves) {
        this.activeCell = cell;
        this.activeMoves.push(move);
      }
    }
  }

  move(move: Move) {
    if (this.activeCell == null || this.activeCell.pawn == null || move == null || move.cell == null) return false;

    this.checkersService.play(this.activeCell.position, move.cell.position)
      .then(moveResult => {
        this.apply(moveResult);
      });


  }

  getMoveFromCell(cell: Cell): Move {
    return this.activeMoves.find(m => m.cell == cell);
  }

  isActive(cell: Cell) {
    return this.activeMoves.find(m => m.cell == cell) != null;

  }

  isActiveColor1(): boolean {
    return this.activeCell != null && this.activeCell.pawn != null && !this.activeCell.pawn.isColorWhite;
  }


  apply(moveResult: MoveResult) {
    if (moveResult != null) {
      if (moveResult.kill != null) {
        let killPawn = this.game.board.cells.getFromPosition(moveResult.kill).pawn;
        this.game.board.cells.getFromPosition(moveResult.kill).pawn = null;
        if (killPawn.isColorWhite) {
          this.model.game.board.userWhite.nbPawns--;
        }
        else {
          this.model.game.board.userBlack.nbPawns--;
        }

      }

      let origin = this.game.board.cells.getFromPosition(moveResult.origin);
      let pawn = origin.pawn;
      origin.pawn = null;
      this.game.board.cells.getFromPosition(moveResult.destination).pawn = pawn;

      if (moveResult.becomesQueen) {
        pawn.isQueen = true;
      }

      this.model.game.board.nextUser = moveResult.nextUser;
    }
    else {
      //on failure
    }

    this.activeCell = null;
    this.activeMoves = [];

  }


}
