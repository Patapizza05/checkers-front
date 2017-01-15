import {Cell} from "./cell.model";
import {Move} from "./move.model";
export class Pawn {
  isQueen: boolean = false;
  color: boolean;
  isGoUp: boolean;

  constructor(color:boolean) {
    this.color = color;
    this.isGoUp = color;
  }

  getPossibleMoves(cell: Cell, board: Cell[][]) : Move[] {
    let col = cell.column;
    let row = cell.row;

    let result : Move[] = [];

    let down : boolean = this.isGoUp && !this.isQueen;

    let up : boolean = !this.isGoUp && !this.isQueen;
    let both : boolean = this.isQueen;

    let hasMandatoryMoves : boolean = false;

    if (up || both) {
      console.log("up");
      hasMandatoryMoves = this.tryAddMove(cell, col-1, row+1, board, result)  || hasMandatoryMoves;
      hasMandatoryMoves = this.tryAddMove(cell, col+1, row+1, board, result) || hasMandatoryMoves;
    }
    if (down || both) {
      hasMandatoryMoves = this.tryAddMove(cell, col-1, row-1, board, result)  || hasMandatoryMoves;
      hasMandatoryMoves = this.tryAddMove(cell, col+1, row-1, board, result) || hasMandatoryMoves;
    }
    if (hasMandatoryMoves) {
      let mandatoryMoves : Move[] = [];
      for(let move of result) {
        if (move.pawnToDelete != null) { //mandatory
          mandatoryMoves.push(move);
        }
      }
      result = mandatoryMoves;
    }

    return result;
  }

  tryAddMove(currentCell: Cell, col: number, row: number, board: Cell[][], result: Move[]):boolean {
    let isMandatory: boolean = false;
    try {
      let cell = board[row][col];
      if (cell.pawn == null) {
        result.push(new Move(cell, null));
        console.log("add");
      }
      else if (cell.pawn.color != this.color) {
        let currentCol = currentCell.column;
        let currentRow = currentCell.row;
        let cell2: Cell = board[currentRow][currentCol];

        if (cell2.pawn == null) {
          result.push(new Move(cell2, cell.pawn));
          console.log("add");
          isMandatory = true;
        }
      }
    } catch(ex) {
      //
    }
    return isMandatory;
  }

}
