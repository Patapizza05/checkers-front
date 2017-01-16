import {Cell} from "./cell.model";
import {Position} from "./position.model"
import {Pawn} from "./pawn.model";
export class Cells {
  board: Cell[][] = [];

  private nbColumns : number;
  private nbRows : number;

  constructor(nbRows: number, nbColumns: number) {
    this.nbColumns = nbColumns;
    this.nbRows = nbRows;

    let rowColorStart = true;

    for (let i = 0; i < this.nbRows; i++) {
      let color = rowColorStart;
      rowColorStart = !rowColorStart;

      let row: Cell[] = [];
      for (let j = 0; j < this.nbColumns; j++) {
        row.push(new Cell(i, j, color, null));
        color = !color;
      }
      this.board.push(row);
    }
  }

  getColumn(col:number):Cell[] {
    return this.board[col];
  }

  getFromPosition(position: Position):Cell {
    return this.get(position.column, position.row);
  }

  get(col:number, row:number):Cell {
    try {
      return this.board[row][col];
    }
    catch(err) {
      //
    }
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
      return this.board.find(row => row.find(c => c.pawn == pawn) != null).find(c => c.pawn == pawn);
    } catch(ex) {
      //
    }
    return null;
  }

  setPawn(row: number, col: number, pawn: Pawn) {
    this.board[row][col].pawn = pawn;
  }
}
