import {Component} from "@angular/core";
import {Cell} from "../../model/cell.model";
import {Pawn} from "../../model/pawn.model";
import {Move} from "../../model/move.model";
import {Cells} from "../../model/cells.model";
@Component({
  moduleId: module.id,
  selector: 'my-board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.css']
})
export class BoardComponent {

  crownIconPath = 'resources/crown.png';

  size: number = 10;
  nbPawnRows: number = 4;

  board: Cells;

  activeCell: Cell;
  activeMoves: Move[] = [];

  constructor() {
    this.initialize();
    this.initPawns();
  }

  initialize() {
    this.board = new Cells(this.size, this.size);
  }

  initPawns() {
    for (let row = 0; row < this.nbPawnRows; row++) {
      for (let col = row % 2 == 0 ? 1 : 0; col < this.size; col += 2) {
        this.board.setPawn(row, col, new Pawn(false));
      }
    }

    for (let row = this.size - 1; row > (this.size - 1) - this.nbPawnRows; row--) {
      for (let col = row % 2 == 1 ? 0 : 1; col < this.size; col += 2) {
        this.board.setPawn(row, col, new Pawn(true));
      }
    }
  }

  select(cell: Cell) {
    if (this.activeCell == cell) {
      this.activeCell = null;
      this.activeMoves = [];
      return;
    }

    if (cell != null && cell.pawn != null) {
      this.activeMoves = [];
      let moves = cell.pawn.getPossibleMoves(cell, this.board);
      for (let move of moves) {
        this.activeCell = cell;
        this.activeMoves.push(move);
      }
    }
  }

  move(move: Move) {
    if (this.activeCell == null || this.activeCell.pawn == null || move == null || move.cell == null) return false;

    if (move.pawnToDeleteCell != null && move.pawnToDeleteCell.pawn != null) {
      move.pawnToDeleteCell.pawn = null;
    }

    let pawn = this.activeCell.pawn;
    this.activeCell.pawn = null;
    move.cell.pawn = pawn;

    if (move.cell.becomesQueen(move.cell.pawn, this.size)) {
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
    return this.activeCell != null && this.activeCell.pawn != null && !this.activeCell.pawn.color;
  }

}
