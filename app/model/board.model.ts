import {Player} from "./user.model";
import {Cells} from "./cells.model";
import {Pawn} from "./pawn.model";
import {Cell} from "./cell.model";
import {Move} from "./move.model";
import {Position} from "./position.model";



export class Board {
  cells: Cells;
  playerBlack: Player;
  playerWhite: Player;
  nextPlayer: string;

  get isFinished(): boolean {
    return this.playerWhite.nbPawns == 0 || this.playerBlack.nbPawns == 0;
  }


  getUser(pawn: Pawn): Player {
    if (pawn.color == this.playerBlack.colorPawn) {
      return this.playerBlack;
    }
    else if (pawn.color == this.playerWhite.colorPawn) {
      return this.playerWhite;
    }
    return null;
  }

  getUserFromPosition(destination: Position):Player {
    try {
      return this.getUser(this.cells.getFromPosition(destination).pawn);
    } catch(err) {
      return null;
    }
  }

  getPossibleMoves(originCell: Cell): Move[] {
    if (originCell == null) return null;
    let pawn = originCell.pawn;
    if (pawn == null) return null;

    let moves: Move[] = [];

    let up = pawn.isGoUp;
    let down = pawn.isGoDown;
    let queen = pawn.isQueen;
    let step = queen ? -1 : 1;

    let hasMandatoryMoves = false;

    if (up || queen) {
      hasMandatoryMoves = this.tryAddMultipleMoves(originCell, step, moves, 1) || hasMandatoryMoves;
    }

    if (down || queen) {
      hasMandatoryMoves = this.tryAddMultipleMoves(originCell, step, moves, -1) || hasMandatoryMoves;
    }

    if (hasMandatoryMoves) {
      moves = moves.filter(m => m.isMandatory);
    }

    return moves;

  }

  tryAddMultipleMoves(originCell: Cell, nbSteps: number, result: Move[], row: number): boolean {
    let hasMandatoryMoves = false;
    hasMandatoryMoves = this.tryAddMove(originCell, new Position(row, -1), nbSteps, result) || hasMandatoryMoves;
    hasMandatoryMoves = this.tryAddMove(originCell, new Position(row, 1), nbSteps, result) || hasMandatoryMoves;

    return hasMandatoryMoves;

  }

  tryAddMove(originCell: Cell, direction: Position, nbSteps: number, result: Move[]): boolean {
    let pawn = originCell.pawn;
    let isMandatory = false;
    let step = 1;
    let isPreviousPawn = 0;
    let isPawn = 0;
    let cellPawnToDelete : Cell = null;
    let cell: Cell;

    do {
      cell = this.cells.translate(originCell, direction, step + isPawn);
      if (cell != null) {
        if (!cell.hasPawn()) {
          result.push(new Move(cell, cellPawnToDelete));
          isMandatory = cellPawnToDelete != null && cellPawnToDelete.pawn != null;
          if (step != -1) step++;
          isPreviousPawn = 0;
        } else if (cell.hasOpponentPawn(pawn)) {
          if (isPreviousPawn == 1) {
            break;
          }
          isPreviousPawn = 1;
          isPawn = 1;
          cellPawnToDelete = cell;
        } else { //Player pawn
          cell = null; //Stop
        }
      }
    } while (cell != null && (step <= nbSteps || nbSteps == -1))

    return isMandatory;

  }

  static fromJson(board: Board): Board {
    let self = new Board();
    self.cells = Cells.fromJson(board.cells);
    self.playerBlack = Player.fromJson(board.playerBlack);
    self.playerWhite = Player.fromJson(board.playerWhite);
    self.nextPlayer = board.nextPlayer;
    return self;
  }



}
