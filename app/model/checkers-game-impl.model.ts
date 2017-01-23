import {Board} from "./board.model";
export class CheckersGameImpl {
  board: Board;
  nbColumns: number;
  nbPawnRows: number;
  nbPawnsPerUser: number;
  nbRows: number;

  public static fromJson(game: CheckersGameImpl): CheckersGameImpl {
    let self = new CheckersGameImpl();
    self.board = Board.fromJson(game.board);
    self.nbColumns = game.nbColumns;
    self.nbPawnRows = game.nbPawnRows;
    self.nbPawnsPerUser = game.nbPawnsPerUser;
    self.nbRows = game.nbRows;
    return self;
  }

}
