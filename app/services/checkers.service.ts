import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {HttpService} from "./http-utils";

@Injectable()
export class CheckersService extends HttpService {
  private url = `http://localhost:8080/api`;

  constructor(http: Http) {
    super(http);
  }

  getHelloWorld() : Promise<string> {
    const url = `${this.url}/hello/test`;
    console.log(url);
    return this.get(url)
      .then(response => { return response.text() as string; }) //response.json() for json
      //Attention : response.json() as T ne renvoie pas vraiment un élément de classe T : Pas les fonctions. Il faut recréer un nouvel objet via une méthode static T.fromJson(...)
      .catch(this.handleError.bind(this, url));
  }


}
