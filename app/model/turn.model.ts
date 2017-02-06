import {Position} from './position.model';

export class Turn {
  origin: Position;
  destination: Position;

  toString(): string {
    return `${this.origin.toString()} --> ${this.destination.toString()}`;
  }

  static fromJsonArray(jsonArray: Turn[]) : Turn[] {
    let turns : Turn[] = [];
    for(let json of jsonArray) {
      turns.push(Turn.fromJson(json));
    }
    return turns;
  }

  static fromJson(json: Turn): Turn {
    let turn = new Turn();
    turn.origin = Position.fromJson(json.origin);
    turn.destination = Position.fromJson(json.destination);
    return turn;
  }
}
