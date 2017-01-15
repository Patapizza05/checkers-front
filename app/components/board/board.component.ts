import {Component} from "@angular/core";
import {Cell} from "../../model/cell.model";
import {Pawn} from "../../model/pawn.model";
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

  activePawn: Pawn;
  activeCells: Cell[] = [];

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
      this.activeCells = [];
      let x = cell.column;
      let y = cell.row;

      let moves = cell.pawn.getPossibleMoves(cell, this.board);
      for(let move of moves) {
        this.activePawn = cell.pawn;
        this.activeCells.push(move.cell);
      }
    }
  }

  isActive(cell: Cell) {
    if (this.activeCells.indexOf(cell) > -1) {
      console.log("true");
      return true;
    }
    return false;
  }

  isActiveColor1(): boolean {
    return this.activePawn != null && !this.activePawn.color;
  }

}
