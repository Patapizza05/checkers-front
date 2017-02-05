import {Position} from "./position.model";
export class MoveResult {

  origin: Position;
  destination:Position;
  kill: Position;
  becomesQueen: boolean;
  nextUser: string;
  nbPawnsUserWhite: number;
  nbPawnsUserBlack: number;

  public static fromJson(json : MoveResult) : MoveResult {
    let moveResult = new MoveResult();
    moveResult.origin = Position.fromJson(json.origin);
    moveResult.destination = Position.fromJson(json.destination);
    moveResult.kill = Position.fromJson(json.kill);
    moveResult.becomesQueen = json.becomesQueen;
    moveResult.nextUser = json.nextUser;
    moveResult.nbPawnsUserBlack = json.nbPawnsUserBlack;
    moveResult.nbPawnsUserWhite = json.nbPawnsUserWhite;
    return moveResult;
  }

}
