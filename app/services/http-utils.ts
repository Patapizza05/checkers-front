import {Response, Headers, Http} from "@angular/http";
export abstract class HttpService {

  private headers = new Headers({'Content-Type': 'application/json' });

  constructor(private http: Http) {}

  /*** UTILS ***/
  get(url: string): Promise<Response> {
    return this.http.get(url, {headers: this.headers}).toPromise();
  }

  post(url: string, data: any) : Promise<Response> {
    return this.http.post(url, data, {headers: this.headers}).toPromise();
  }

  handleError(error: any, url: string): Promise<any> {
    console.error('An error occured at', url); //for demo purposes only
    console.error(error);
    return Promise.reject(error.message || error);
  }
}
