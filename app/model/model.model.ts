import {CheckersGameImpl} from "./checkers-game-impl.model";
export class Model {
  _error: boolean = false;
  _loading: boolean = false;

  debug: boolean = true;

  game: CheckersGameImpl;

  get error(): boolean {
    return this._error;
  }

  set error(error: boolean) {
    this.clear();
    this._error = error;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(loading: boolean) {
    this.clear();
    this._loading = loading;
  }

  clear(): void {
    this._error = false;
    this._loading = false;
  }
}
