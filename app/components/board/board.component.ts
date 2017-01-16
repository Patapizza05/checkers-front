import {Component} from "@angular/core";
import {Cell} from "../../model/cell.model";
import {Pawn} from "../../model/pawn.model";
import {Move} from "../../model/move.model";
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

  board: Cell[][] = [];

  activeCell: Cell;
  activeMoves: Move[] = [];

  constructor() {
    this.initialize();
    this.initPawns();
  }

  initialize() {
    let rowColorStart = true;

    for (let i = 0; i < this.size; i++) {
      let color = rowColorStart;
      rowColorStart = !rowColorStart;

      let row: Cell[] = [];
      for (let j = 0; j < this.size; j++) {
        row.push(new Cell(i, j, color, null));
        color = !color;
      }
      this.board.push(row);
    }
  }

  initPawns() {
    for (let row = 0; row < this.nbPawnRows; row++) {
      for (let col = row % 2 == 0 ? 1 : 0; col < this.size; col += 2) {
        this.board[row][col].pawn = new Pawn(false);
      }
    }

    for (let row = this.size - 1; row > (this.size - 1) - this.nbPawnRows; row--) {
      for (let col = row % 2 == 1 ? 0 : 1; col < this.size; col += 2) {
        this.board[row][col].pawn = new Pawn(true);
      }
    }
  }

  select(cell: Cell) {
    if (cell != null && cell.pawn != null) {
      this.activeMoves = [];
      let x = cell.column;
      let y = cell.row;

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

    this.activeMoves = [];
  }

  findPawn(pawn: Pawn): Cell {
    try {
      return this.board.find(row => row.find(c => c.pawn == pawn) != null).find(c => c.pawn == pawn);
    } catch(ex) {

    }
    return null;
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
