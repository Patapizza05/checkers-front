import {CheckersGameImpl} from "./checkers-game-impl.model";
import {MoveResult} from "./move-result.model";
export class Model {
  _error: boolean = false;
  _loading: boolean = false;

  debug: boolean = false;

  game: CheckersGameImpl;
  token: string;

  get error(): boolean {
    return this._error;
  }

  set error(error: boolean) {
    this.clear();
    this._error = error;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(loading: boolean) {
    this.clear();
    this._loading = loading;
  }

  clear(): void {
    this._error = false;
    this._loading = false;
  }

  apply(moveResult: MoveResult) {
    console.log(moveResult);
      if (moveResult != null) {
        if (moveResult.kill != null) {
          let killPawn = this.game.board.cells.getFromPosition(moveResult.kill).pawn;
          this.game.board.cells.getFromPosition(moveResult.kill).pawn = null;
          this.game.board.userWhite.nbPawns = moveResult.nbPawnsUserWhite;
          this.game.board.userBlack.nbPawns = moveResult.nbPawnsUserBlack;
        }

        let origin = this.game.board.cells.getFromPosition(moveResult.origin);
        let pawn = origin.pawn;
        origin.pawn = null;
        this.game.board.cells.getFromPosition(moveResult.destination).pawn = pawn;

        if (moveResult.becomesQueen) {
          pawn.isQueen = true;
        }

        this.game.board.nextUser = moveResult.nextUser;
        console.log('done');
      }
      else {
        //on failure
      }
  }
}
