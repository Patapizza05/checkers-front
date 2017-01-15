import {ColorCell} from "./color-cell.model";
import {Pawn} from "./pawn.model";
export class Cell {
  row: number;
  column: number;
  color: boolean;
  pawn: Pawn;

  constructor(row: number, col: number, color: boolean, pawn: Pawn) {
    this.row = row;
    this.column = col;
    this.color = color;
    this.pawn = pawn;
  }

}
