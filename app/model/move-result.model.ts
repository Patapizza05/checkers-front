import {Position} from "./position.model";
export class MoveResult {

  origin: Position;
  destination:Position;
  kill: Position;
  becomesQueen: boolean;
  nextUser: string;
  nbPawnsPlayerWhite: number;
  nbPawnsPlayerBlack: number;
  winningMove: boolean;

  public static fromJson(json : MoveResult) : MoveResult {
    if (json == null) return null;

    let moveResult = new MoveResult();
    moveResult.origin = Position.fromJson(json.origin);
    moveResult.destination = Position.fromJson(json.destination);
    moveResult.kill = json.kill ? Position.fromJson(json.kill) : null;
    moveResult.becomesQueen = json.becomesQueen;
    moveResult.nextUser = json.nextUser;
    moveResult.nbPawnsPlayerBlack = json.nbPawnsPlayerBlack;
    moveResult.nbPawnsPlayerWhite = json.nbPawnsPlayerWhite;
    moveResult.winningMove = json.winningMove;
    return moveResult;
  }

}
