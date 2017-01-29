import {Cell} from "./cell.model";
export class Move {
  destination: Cell;
  pawnToDeleteCell: Cell;

  constructor(cell: Cell, pawnToDeleteCell: Cell) {
    this.destination = cell;
    this.pawnToDeleteCell = pawnToDeleteCell;
  }

  get isMandatory():boolean {
    return this.pawnToDeleteCell != null;
  }

  static fromJsonArray(jsonArray: Move[]): Move[] {
    let moves: Move[] = [];
    for(let json of jsonArray) {
      moves.push(Move.fromJson(json));
    }
    return moves;
  }

  static fromJson(json: Move) : Move {
    let cell = Cell.fromJson(json.destination);
    let pawnToDeleteCell = json.pawnToDeleteCell != null ? Cell.fromJson(json.pawnToDeleteCell) : null;
    return new Move(cell, pawnToDeleteCell);
  }


}
