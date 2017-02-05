import {CheckersGameImpl} from "./checkers-game-impl.model";
export class GameResponse {

  token: String;
  creationDate: String;
  game: CheckersGameImpl;

  static fromJson(json: GameResponse): GameResponse {
    let gameResponse = new GameResponse();
    gameResponse.token = json.token;
    gameResponse.creationDate = json.creationDate;
    gameResponse.game = CheckersGameImpl.fromJson(json.game);
    return gameResponse;
  }


}
