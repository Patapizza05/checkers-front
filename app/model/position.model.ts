export class PositionFromApi {
  column: number;
  row: number;

  constructor(row:number, col:number) {
    this.row = row;
    this.column = col;
  }

  translate(direction:PositionFromApi, step:number):PositionFromApi {
    return new PositionFromApi(this.row + direction.row*step, this.column + direction.column*step);
  }

  static fromJson(position: PositionFromApi): PositionFromApi {
    return new PositionFromApi(position.row, position.column);
  }
}
