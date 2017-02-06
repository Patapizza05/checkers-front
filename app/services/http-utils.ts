import {Response, Headers, Http} from "@angular/http";

export enum ContentType {
  JSON, XML
}

export abstract class HttpService {

  private headers: Headers;

  constructor(private http: Http, contentType: ContentType) {
    this.headers = new Headers({'Content-Type': this.convertContentType(contentType)});
  }

  get(url: string): Promise<Response> {
    console.log(url);
    return this.http.get(url, {headers: this.headers}).toPromise();
  }

  post(url: string, data: any) : Promise<Response> {
    console.log(url);
    return this.http.post(url, data, {headers: this.headers}).toPromise();
  }

  put(url: string, data: any): Promise<Response> {
    console.log(url);
    return this.http.put(url, data, {headers: this.headers}).toPromise();
  }

  delete(url: string): Promise<Response> {
    console.log(url);
    return this.http.delete(url, {headers: this.headers}).toPromise();
  }

  handleError(error: any, url: string): Promise<any> {
    console.error('An error occured at', url); //for demo purposes only
    console.error(error);
    return Promise.reject(error.message || error);
  }

  private convertContentType(contentType: ContentType): String {
    switch(contentType) {
      case ContentType.JSON: return 'application/json';
      case ContentType.XML: return 'text/xml';
      default: return 'application/json';
    }
  }
}
