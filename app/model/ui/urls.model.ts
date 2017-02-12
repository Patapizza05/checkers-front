export class Urls {

  static get GAMES_URL() : string { return 'games'; }
  static get GAME_URL() : string { return 'game'; }
  static get PARAM_TOKEN(): string { return 'token'; }
  static get TOKEN_NEW(): string { return 'new'; }

  get token_new(): string { return Urls.TOKEN_NEW; }
  get param_token(): string { return Urls.PARAM_TOKEN; }

  games(): string[] {
    return ['/'+Urls.GAMES_URL];
  }

  game(token: string): string[] {
    return ['/'+Urls.GAME_URL, token];
  }



  new(): string[] {
    return ['/'+Urls.GAME_URL, this.token_new];
  }

  static toUrl(url: string[]) {
    let str = url[0];
    for(let i = 1; i < url.length; i++) {
      str += '/' + url[i];
    }
    return str;
}

}
