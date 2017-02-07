import {Position} from "./position.model";
import {Pawn} from "./pawn.model";
import {User} from "./user.model";


export class Cell {

  static get COLOR_CELL_LIGHT(): string { return 'LIGHT'; }
  static get COLOR_CELL_DARK(): string { return 'DARK'; }

  color: string;
  pawn: Pawn;
  position: Position;

  get isColorLight(): boolean { return this.color == Cell.COLOR_CELL_LIGHT; }
  get isColorDark(): boolean { return !this.isColorLight; }

  get row(): number {
    return this.position.row;
  }

  get column(): number {
    return this.position.column;
  }

  becomesQueen(pawn: Pawn, user: User): boolean {
    if (pawn == null || user == null || pawn.color != user.colorPawn) return false;

    return this.row == user.queenRow;
  }

  hasPawn(): boolean {
    return this.pawn != null;
  }

  hasOpponentPawn(pawn: Pawn):boolean {
    return this.hasPawn() && pawn.color != this.pawn.color;
  }


  static fromJsonArray(cells: Cell[][]): Cell[][] {
    let array : Cell[][] = [];
    for(let row of cells) {
      let currentRow: Cell[] = [];
      for(let cell of row) {
        currentRow.push(Cell.fromJson(cell));
      }
      array.push(currentRow);
    }
    return array;
  }

  static fromJson(cell: Cell): Cell {
    let self = new Cell();
    self.color = cell.color;
    if (cell.pawn != null) {
      self.pawn = Pawn.fromJson(cell.pawn);
    }
    self.position = Position.fromJson(cell.position);
    return self;
  }

  equals(cell: Cell) {
    return this.position.equals(cell.position);
  }
}
