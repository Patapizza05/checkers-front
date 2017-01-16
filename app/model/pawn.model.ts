import {Cell} from "./cell.model";
import {Move} from "./move.model";
import {Position} from "./position.model";
import {Cells} from "./cells.model";
export class Pawn {
  isQueen: boolean = false;
  color: boolean;
  isGoUp: boolean;

  constructor(color: boolean) {
    this.color = color;
    this.isGoUp = color;
  }

  getPossibleMoves(current: Cell, cells: Cells): Move[] {
    let col = current.column;
    let row = current.row;

    let result: Move[] = [];

    let down: boolean = this.isGoUp && !this.isQueen;
    let up: boolean = !this.isGoUp && !this.isQueen;
    let queen: boolean = this.isQueen;

    let step = queen ? -1 : 1;

    console.log(current.pawn.isQueen+":"+step);

    let hasMandatoryMoves: boolean = false;

    if (up || queen) {
      hasMandatoryMoves = this.tryAddMove(current, new Position(-1,1), step, cells, result) || hasMandatoryMoves;
      hasMandatoryMoves = this.tryAddMove(current, new Position(1,1), step, cells, result) || hasMandatoryMoves;
    }
    if (down || queen) {
      hasMandatoryMoves = this.tryAddMove(current,new Position(-1,-1), step, cells, result) || hasMandatoryMoves;
      hasMandatoryMoves = this.tryAddMove(current, new Position(1,-1), step, cells, result) || hasMandatoryMoves;
    }

    if (hasMandatoryMoves) {
      result = result.filter(m => m.isMandatory());
    }

    return result;
  }

  tryAddMove(currentCell: Cell, direction: Position, nbSteps: number, cells: Cells, result: Move[]) : boolean {
    let currentPawn: Pawn = currentCell.pawn;
    let isMandatory : boolean = false;
    let step : number = 1;
    let isPreviousPawn = 0;
    let isPawn = 0;
    let cellToDelete: Cell = null;

    let cell: Cell;

    do {
      cell = cells.translate(currentCell, direction, step + isPawn);
      if (cell != null) {
        if (!cell.hasPawn()) {
          result.push(new Move(cell, cellToDelete));
          isMandatory = cellToDelete != null && cellToDelete.hasPawn();
          if (step != -1) step++;
          isPreviousPawn = 0;
        }
        else if(cell.hasOpponentPawn(currentPawn)) {
          if (isPreviousPawn == 1) {
            break;
          }
          isPreviousPawn = 1;
          isPawn = 1;
          cellToDelete = cell;
        }
        else { //Player pawn
          cell = null;
        }
      }
    } while(cell != null && (step <= nbSteps || nbSteps == -1));

    return isMandatory;
  }

}
