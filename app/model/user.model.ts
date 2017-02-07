export class User {

  static get COLOR_WHITE(): string { return 'WHITE'; }
  static get COLOR_BLACK(): string { return 'BLACK'; }

  colorPawn: string;
  nbPawns: number;
  pawnDirection: string; //enum
  queenRow: number;
  name: string;

  static fromJson(user: User): User {
    let self = new User();
    self.colorPawn = user.colorPawn;
    self.pawnDirection = user.pawnDirection;
    self.queenRow = user.queenRow;
    self.nbPawns = user.nbPawns;
    self.name = user.name;
    return self;
  }

  isColorWhite():boolean {
    return this.colorPawn == User.COLOR_WHITE;
  }

  isColorBlack():boolean {
    return !this.isColorWhite();
  }
}
