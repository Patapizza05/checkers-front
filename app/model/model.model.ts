import {CheckersGameImpl} from "./checkers-game-impl.model";
import {MoveResult} from "./move-result.model";
import {Turn} from "./turn.model";
import {MaterialColors} from "./ui/colors.model";
import {Urls} from "./ui/urls.model";
import {Icons} from "./ui/icons.model";
import {Vocabulary} from "./ui/vocabulary.model";
export class Model {
  _error: boolean = false;
  _loading: boolean = false;

  debug: boolean = false;

  game: CheckersGameImpl;
  token: string;

  colors: MaterialColors = new MaterialColors();
  urls: Urls = new Urls();
  icons: Icons = new Icons();
  vocabulary: Vocabulary = new Vocabulary();

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

  resetModel(): void {
    this.game = null;
    this.token = null;
  }

  apply(moveResult: MoveResult) {
      if (moveResult != null) {
        if (moveResult.kill != null) {
          let killPawn = this.game.board.cells.getFromPosition(moveResult.kill).pawn;
          this.game.board.cells.getFromPosition(moveResult.kill).pawn = null;
          this.game.board.playerWhite.nbPawns = moveResult.nbPawnsPlayerWhite;
          this.game.board.playerBlack.nbPawns = moveResult.nbPawnsPlayerBlack;
        }

        let origin = this.game.board.cells.getFromPosition(moveResult.origin);
        let pawn = origin.pawn;
        origin.pawn = null;
        this.game.board.cells.getFromPosition(moveResult.destination).pawn = pawn;

        if (moveResult.becomesQueen) {
          pawn.isQueen = true;
        }

        this.game.board.nextPlayer = moveResult.nextUser;

        let turn: Turn = { origin: moveResult.origin, destination: moveResult.destination};
        this.game.history.push(turn);
      }
      else {
        //on failure
      }
  }
}
