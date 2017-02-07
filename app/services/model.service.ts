import {Model} from "../model/model.model";
export class ModelService {

  private _model: Model = new Model();

  get model(): Model {
    return this._model;
  }

  clear() {
    this._model.resetModel();
  }
}
