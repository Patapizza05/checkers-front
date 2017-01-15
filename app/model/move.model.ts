import {Pawn} from "./pawn.model";
import {Cell} from "./cell.model";
export class Move {
  cell: Cell;
  pawnToDelete: Pawn;

  constructor(cell: Cell, pawnToDelete: Pawn) {
    this.cell = cell;
    this.pawnToDelete = pawnToDelete;
  }

}
