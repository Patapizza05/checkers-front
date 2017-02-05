import {HttpService, ContentType} from "./http-utils";
import {Http} from "@angular/http";
import {MoveResult} from "../model/move-result.model";
import {LightGame} from "../model/light-game.model";
import {Move} from "../model/move.model";
import {UserNameRequest} from "../model/requests/user-name-request.model";
import {PlayRequest} from "../model/requests/play-request.model";
import {Position} from "../model/position.model";
import {GameResponse} from "../model/game-response.model";

export abstract class CheckersApi extends HttpService {

  constructor(http: Http, contentType: ContentType) {
    super(http, contentType);
  }

  // GET : /games
  abstract getGames(): Promise<LightGame[]>;

  // PUT : /game/{token}/name
  abstract setName(token: String, request: UserNameRequest): Promise<String>;

  // GET : /new
  abstract createGame(): Promise<GameResponse>;

  // GET : /game/{token}
  abstract getGame(token: String): Promise<GameResponse>;

  // POST : /game/{token}/play
  abstract play(token: String, request: PlayRequest): Promise<MoveResult>;

  // POST : /game/{token}/moves
  abstract getPossibleMoves(token: String, position: Position): Promise<Move[]>;

}
