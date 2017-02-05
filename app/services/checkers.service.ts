import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import {MoveResult} from "../model/move-result.model";
import {Position} from "../model/position.model";
import {Move} from "../model/move.model";
import {LightGame} from "../model/light-game.model";
import {CheckersApi} from "./checkers-api.service";
import {UserNameRequest} from "../model/requests/user-name-request.model";
import {GameResponse} from "../model/game-response.model";
import {PlayRequest} from "../model/requests/play-request.model";
import {Http} from "@angular/http";
import {ContentType} from "./http-utils";

@Injectable()
export class CheckersService extends CheckersApi {
  private url = `http://localhost:9090/checkers-web/api/checkers`;

  constructor(http: Http) {
    super(http, ContentType.JSON);
  }

  // GET : /games
  getGames(): Promise<LightGame[]> {
    const url = `${this.url}/games`;
    return this.get(url)
      .then(response => LightGame.fromJsonArray(response.json() as LightGame[]))
      .catch(this.handleError.bind(this, url));
  }

  // PUT : /game/{token}/name
  setName(token: string, request: UserNameRequest): Promise<string> {
    const url = `${this.url}/game/${token}/name`;
    return this.put(url, request)
      .then(response => response.text())
      .catch(this.handleError.bind(this, url));
  }

  // GET : /new
  createGame(): Promise<GameResponse> {
    const url = `${this.url}/new`;
    return this.get(url)
      .then(response => GameResponse.fromJson(response.json() as GameResponse))
      .catch(this.handleError.bind(this, url));
  }

  // GET : /game/{token}
  getGame(token: string): Promise<GameResponse> {
    const url = `${this.url}/game/${token}`;
    return this.get(url)
      .then(response => GameResponse.fromJson(response.json() as GameResponse))
      .catch(this.handleError.bind(this, url));
  }

  // POST : /game/{token}/play
  play(token: string, request: PlayRequest): Promise<MoveResult> {
    const url = `${this.url}/game/${token}/play`;
    return this.post(url, request)
      .then(response => MoveResult.fromJson(response.json() as MoveResult))
      .catch(this.handleError.bind(this, url));
  }

  // POST : /game/{token}/moves
  getPossibleMoves(token: string, position: Position): Promise<Move[]> {
    const url = `${this.url}/game/${token}/moves`;
    return this.post(url, position)
      .then(response => Move.fromJsonArray(response.json() as Move[]))
      .catch(this.handleError.bind(this, url));
  }

}
