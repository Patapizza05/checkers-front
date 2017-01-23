import {Component} from "@angular/core";
import {Move} from "../../model/move.model";
import {CheckersService} from "../../services/checkers.service";
import {CheckersGameImpl} from "../../model/checkers-game-impl.model";
import {Cell} from "../../model/cell.model";
import {MoveResult} from "../../model/move-result.model";
@Component({
  moduleId: module.id,
  selector: 'my-board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.css']
})
export class BoardComponent {

  debug = true;


  isError = false;
  isLoading = false;

  crownIconPath = 'resources/crown.png';

  size: number = 10;
  nbPawnRows: number = 4;

  /*board: Cells;*/
  game: CheckersGameImpl;

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
    private checkersService: CheckersService
  ) {

    this.loadGame();
  }

  createGame(): void {
    this.checkersService.createGame().then(game => {
      this.game = game;
    })
  }

  loadGame():void {
    this.isError = false;
    this.isLoading = true;
    this.checkersService.getGame().then(game => {
      this.game = game;
      this.isLoading = false;
    }).catch(reason => {
      this.isError = true;
      this.isLoading = false;
    });
  }

  select(cell: Cell) {

    if (this.activeCell == cell) {
      this.activeCell = null;
      this.activeMoves = [];
      return;
    }

    if (cell != null && cell.pawn != null) {
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
        this.game.board.cells.getFromPosition(moveResult.kill).pawn = null;
      }

      let origin = this.game.board.cells.getFromPosition(moveResult.origin);
      let pawn = origin.pawn;
      origin.pawn = null;
      this.game.board.cells.getFromPosition(moveResult.destination).pawn = pawn;

      if (moveResult.becomesQueen) {
        pawn.isQueen = true;
      }

      this.nextUser = moveResult.nextUser;
    }
    else {
      //on failure
    }

    this.activeCell = null;
    this.activeMoves = [];

  }


}
