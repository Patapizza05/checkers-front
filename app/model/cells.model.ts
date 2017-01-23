import {Cell} from "./cell.model";
import {Position} from "./position.model";
import {Pawn} from "./pawn.model";
export class Cells {
  cells: Cell[][];

  get nbRows(): number {
    return this.cells.length;
  }

  get nbColumns(): number {
    return this.cells[0].length;
  }

  getColumn(col:number):Cell[] {
    return this.cells[col];
  }

  getFromPosition(position: Position):Cell {
    return this.get(position.column, position.row);
  }

  get(col:number, row:number):Cell {
    try {
      return this.cells[(this.nbRows-1)-row][col];
    }
    catch(err) {
      //
    }
  }

  set(col:number, row:number, pawn: Pawn) {
    this.get(col, row).pawn = pawn;
  }

  getNbColumns():number {
    return this.nbColumns;
  }

  getNbRows():number {
    return this.nbRows;
  }

  translate(cell: Cell, direction: Position, step:number):Cell {
    return this.getFromPosition(cell.position.translate(direction, step));
  }

  findPawn(pawn: Pawn): Cell {
    try {
      return this.cells.find(row => row.find(c => c.pawn == pawn) != null).find(c => c.pawn == pawn);
    } catch(ex) {
      //
    }
    return null;
  }

  setPawn(row: number, col: number, pawn: Pawn) {
    this.set(col, row, pawn);
  }

  static fromJson(cells: Cells): Cells {
    let self = new Cells();
    self.cells = Cell.fromJsonArray(cells.cells);
    return self;
  }
}
