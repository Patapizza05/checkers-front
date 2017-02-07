import {CheckersGameImpl} from "./checkers-game-impl.model";
export class GameResponse {

  token: string;
  creationDate: string;
  game: CheckersGameImpl;

  static fromJson(json: GameResponse): GameResponse {
    if (json == null) return null;
    let gameResponse = new GameResponse();
    gameResponse.token = json.token;
    gameResponse.creationDate = json.creationDate;
    gameResponse.game = CheckersGameImpl.fromJson(json.game);
    return gameResponse;
  }


}
