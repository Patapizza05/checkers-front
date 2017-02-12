export class Player {

  static get COLOR_WHITE(): string { return 'WHITE'; }
  static get COLOR_BLACK(): string { return 'BLACK'; }

  colorPawn: string;
  nbPawns: number;
  pawnDirection: string; //enum
  queenRow: number;
  name: string;

  static fromJson(json: Player): Player {
    let self = new Player();
    self.colorPawn = json.colorPawn;
    self.pawnDirection = json.pawnDirection;
    self.queenRow = json.queenRow;
    self.nbPawns = json.nbPawns;
    self.name = json.name;
    return self;
  }

  isColorWhite():boolean {
    return this.colorPawn == Player.COLOR_WHITE;
  }

  isColorBlack():boolean {
    return this.colorPawn == Player.COLOR_BLACK;
  }
}
