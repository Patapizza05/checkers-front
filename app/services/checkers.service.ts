import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {HttpService} from "./http-utils";
import {CheckersGameImpl} from "../model/checkers-game-impl.model";

@Injectable()
export class CheckersService extends HttpService {
  private url = `http://localhost:8080/api/checkers`;

  constructor(http: Http) {
    super(http);
  }

  createCheckersGame() : Promise<CheckersGameImpl> {
    const url = `${this.url}/new`;
    console.log(url);
    return this.get(url)
      .then(response => CheckersGameImpl.fromJson(response.json() as CheckersGameImpl))
      .catch(this.handleError.bind(this, url));
  }

}
