export class User {
  static index : number = 1;

  colorPawn: string;
  nbPawns: number;
  pawnDirection: string; //enum
  queenRow: number;
  name: string = "Player "+User.index++;

  static fromJson(user: User): User {
    let self = new User();
    self.colorPawn = user.colorPawn;
    self.pawnDirection = user.pawnDirection;
    self.queenRow = user.queenRow;
    self.nbPawns = user.nbPawns;
    return self;
  }
}
