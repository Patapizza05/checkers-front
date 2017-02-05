import {Position} from '../position.model'

export class PlayRequest {
  origin: Position;
  destination: Position;

  constructor(origin: Position, destination: Position) {
    this.origin = origin;
    this.destination = destination;
  }
}
