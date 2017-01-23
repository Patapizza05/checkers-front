import {PositionFromApi} from "./position.model";
import {PawnFromApi} from "./pawn.model";
import {User} from "./user.model";


export class Cell {
  color: string;
  pawn: PawnFromApi;
  position: PositionFromApi;

  get isColorLight(): boolean {
    return this.color == 'LIGHT';
  }

  get row(): number {
    return this.position.row;
  }

  get column(): number {
    return this.position.column;
  }

  becomesQueen(pawn: PawnFromApi, user: User): boolean {
    if (pawn == null || user == null || pawn.color != user.colorPawn) return false;

    return this.row == user.queenRow;
  }

  hasPawn(): boolean {
    return this.pawn != null;
  }

  hasOpponentPawn(pawn: PawnFromApi):boolean {
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

  private static fromJson(cell: Cell): Cell {
    let self = new Cell();
    self.color = cell.color;
    if (cell.pawn != null) {
      self.pawn = PawnFromApi.fromJson(cell.pawn);
    }
    self.position = PositionFromApi.fromJson(cell.position);
    return self;
  }
}
