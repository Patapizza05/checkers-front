import {ColorCell} from "./color-cell.model";
import {Pawn} from "./pawn.model";
import {Position} from "./position.model"
export class Cell {
  position: Position;
  color: boolean;
  pawn: Pawn;

  constructor(row: number, col: number, color: boolean, pawn: Pawn) {
    this.position = new Position(col, row);
    this.color = color;
    this.pawn = pawn;
  }

  becomesQueen(pawn: Pawn, size: number): boolean {
    if (pawn == null) return false;

    if (!pawn.color) { //down
      if (this.row == size - 1) {
        return true;
      }
    }
    else {
      if (this.row == 0) {
        return true;
      }
    }
    return false;
  }

  hasPawn():boolean {
    return this.pawn != null;
  }

  hasOpponentPawn(pawn: Pawn):boolean {
    return this.hasPawn() && pawn.color != this.pawn.color;
  }

  get row():number {
    return this.position.row;
  }

  get column():number {
    return this.position.column;
  }

}
