export class LightUser {

  name: String;
  color: String;
  nbPawns : number;

  static fromJson(json: LightUser): LightUser {
    return json;
  }

  static fromJsonArray(jsonArray: LightUser[]): LightUser[] {
    return jsonArray;
  }
}
