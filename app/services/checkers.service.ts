import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {HttpService} from "./http-utils";
import {CheckersGameImpl} from "../model/checkers-game-impl.model";
import {MoveResult} from "../model/move-result.model";
import {Position} from "../model/position.model";
import {Move} from "../model/move.model";

@Injectable()
export class CheckersService extends HttpService {
  private url = `http://localhost:8080/api/checkers`;

  constructor(http: Http) {
    super(http);
  }

  createGame() : Promise<CheckersGameImpl> {
    const url = `${this.url}/new`;
    console.log(url);
    return this.get(url)
      .then(response => CheckersGameImpl.fromJson(response.json() as CheckersGameImpl))
      .catch(this.handleError.bind(this, url));
  }

  getGame() : Promise<CheckersGameImpl> {
    const url = `${this.url}/game`;
    console.log(url);
    return this.get(url)
      .then(response => CheckersGameImpl.fromJson(response.json() as CheckersGameImpl))
      .catch(this.handleError.bind(this, url));
  }

  play(origin: Position, destination: Position) : Promise<MoveResult> {
    const url = `${this.url}/play`;
    console.log(url);
    return this.post(url, {'origin':origin, 'destination':destination })
      .then(response => MoveResult.fromJson(response.json() as MoveResult))
      .catch(this.handleError.bind(this, url));
  }

  getPossibleMoves(position: Position) : Promise<Move[]> {
    const url = `${this.url}/moves`;
    console.log(url);
    return this.post(url, position)
      .then(response => Move.fromJsonArray(response.json() as Move[]))
      .catch(this.handleError.bind(this, url));
  }

}
