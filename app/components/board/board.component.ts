import {Component} from "@angular/core";
import {Move} from "../../model/move.model";
import {CheckersService} from "../../services/checkers.service";
import {CheckersGameImpl} from "../../model/checkers-game-impl.model";
import {Cell} from "../../model/cell.model";
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

  constructor(
    private checkersService: CheckersService
  ) {

    this.loadGame();
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
        console.log(moveResult);
      });

    if (move.pawnToDeleteCell != null && move.pawnToDeleteCell.pawn != null) {
      move.pawnToDeleteCell.pawn = null;
    }

    let pawn = this.activeCell.pawn;
    this.activeCell.pawn = null;
    move.cell.pawn = pawn;

    if (move.cell.becomesQueen(move.cell.pawn, this.game.board.getUser(move.cell.pawn))) {
      move.cell.pawn.isQueen = true;
    }

    this.activeMoves = [];
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



}
