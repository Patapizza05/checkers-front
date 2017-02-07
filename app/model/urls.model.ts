export class Urls {
  games(): string[] {
    return ['/games'];
  }

  game(token: string): string[] {
    return ['/dashboard', token];
  }

  new(): string[] {
    return ['/dashboard', 'new'];
  }

  static toUrl(url: string[]) {
    let str = url[0];
    for(let i = 1; i < url.length; i++) {
      str += '/' + url[i];
    }
    return str;
}

}
