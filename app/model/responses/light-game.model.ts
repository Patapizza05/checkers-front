import {LightUser} from "./light-user.model";
import {DatePipe} from "@angular/common";
export class LightGame {

  date: number;
  token: String;
  players: LightUser[];

  get dateFormat(): String {
    var datePipe = new DatePipe('fr-FR');
    let format = datePipe.transform(new Date(this.date), 'dd/MM/yyyy hh:mm:ss');
    return format;
  }

  static fromJson(json: LightGame): LightGame {
    let lightGame = new LightGame();
    lightGame.date = json.date;
    lightGame.token = json.token;
    lightGame.players = LightUser.fromJsonArray(json.players);
    return lightGame;

  }

  static fromJsonArray(jsonArray: LightGame[]): LightGame[] {
    if (jsonArray == null) return [];

    let lightGames: LightGame[] = [];
    for(let json of jsonArray) {
      lightGames.push(LightGame.fromJson(json));
    }
    return lightGames;
  }

  get playerWhite(): LightUser {
    return this.players.find(user => user.color == 'WHITE');
  }

  get playerBlack(): LightUser {
    return this.players.find(user => user.color == 'BLACK');
  }

}
