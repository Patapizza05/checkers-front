import {Position} from "./position.model";
export class MoveResult {

  origin: Position;
  destination:Position;
  kill: Position;
  becomesQueen: boolean;
  nextUser: string;

  public static fromJson(moveResult : MoveResult) : MoveResult {
    return moveResult;
  }

}
