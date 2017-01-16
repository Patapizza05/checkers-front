export class Position {
  column: number;
  row: number;

  constructor(column: number, row: number) {
    this.column = column;
    this.row = row;
  }

  translate(direction:Position, step:number):Position {
    return new Position(this.column + direction.column*step, this.row + direction.row*step);
  }

}
