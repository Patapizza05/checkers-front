import {Pawn} from "./pawn.model";
import {Cell} from "./cell.model";
export class Move {
  cell: Cell;
  pawnToDeleteCell: Cell;

  constructor(cell: Cell, pawnToDeleteCell: Cell) {
    this.cell = cell;
    this.pawnToDeleteCell = pawnToDeleteCell;
  }

}
