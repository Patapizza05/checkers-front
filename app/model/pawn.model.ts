export class Pawn {
  color: string;
  direction: string;

  get isGoUp(): boolean {
    return this.direction == 'UP';
  }

  get isGoDown(): boolean {
    return this.direction == 'DOWN';
  }

  get isQueen(): boolean {
    return this.direction == 'QUEEN';
  }

  set isQueen(val:boolean) {
    if (val) {
      this.direction = 'QUEEN';
    }
  }

  get isColorWhite(): boolean {
    return this.color == 'WHITE';
  }


  static fromJson(pawn: Pawn): Pawn {
    let self = new Pawn();
    self.color = pawn.color;
    self.direction = pawn.direction;
    return self;
  }
}
