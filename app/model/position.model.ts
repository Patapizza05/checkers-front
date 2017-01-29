export class Position {
  column: number;
  row: number;

  constructor(row:number, col:number) {
    this.row = row;
    this.column = col;
  }

  translate(direction:Position, step:number):Position {
    return new Position(this.row + direction.row*step, this.column + direction.column*step);
  }

  static fromJson(position: Position): Position {
    return new Position(position.row, position.column);
  }

  equals(position: Position) : boolean {
    return this.row == position.row && this.column == position.column;
  }
}
