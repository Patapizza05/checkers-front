import {Component, Input, EventEmitter, Output, forwardRef, Inject, Host} from "@angular/core";
import {Move} from "../../model/move.model";
import {CheckersService} from "../../services/checkers.service";
import {CheckersGameImpl} from "../../model/checkers-game-impl.model";
import {Cell} from "../../model/cell.model";
import {MoveResult} from "../../model/move-result.model";
import {Model} from "../../model/model.model";
import {GameComponent} from "../game/game.component";
import {ModelService} from "../../services/model.service";
import {PlayRequest} from "../../model/requests/play-request.model";
import {MaterializeAction} from "angular2-materialize";
import {Player} from "../../model/user.model";

@Component({
  moduleId: module.id,
  selector: 'my-board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.css']
})
export class BoardComponent {

  /** VARIABLES **/

  private dashboard: GameComponent; //Parent
  private model: Model;
  private winningUser: Player = null;
  private localGetPossibleMoves = false;
  private activeCell: Cell;
  private activeMoves: Move[] = [];

  get debug(): boolean {
    return this.model.debug;
  }

  get token(): string {
    return this.model.token;
  }

  get game(): CheckersGameImpl {
    return this.model.game;
  }

  set game(game: CheckersGameImpl) {
    this.model.game = game;
  }

  /** CONSTRUCTOR **/

  constructor(private checkersService: CheckersService,
              private modelService: ModelService,
              @Host() @Inject(forwardRef(() => GameComponent)) dashboard: GameComponent) {
    this.dashboard = dashboard;
    this.model = modelService.model;
  }

  /** GAME METHODS **/

  //SELECT
  select(cell: Cell) {
    if (this.select_cancel(cell) || this.select_error(cell)) {
      return;
    }
    this.getPossibleMoves(cell);
  }

  select_cancel(cell: Cell): boolean {
    if (this.activeCell == cell) { //Clicking on the active cell : Cancel
      this.activeCell = null;
      this.activeMoves = [];
      return true;
    }
    return false;
  }

  select_error(cell: Cell): boolean {
    return cell == null || cell.pawn == null || cell.pawn.color != this.game.board.nextPlayer || this.game.board.isFinished;
  }

  getPossibleMoves(cell: Cell): void {
    this.activeMoves = [];

    if (this.localGetPossibleMoves) {
      this.getPossibleMoves_local(cell);
    }
    else {
      this.getPossibleMoves_remote(cell);
    }
  }

  getPossibleMoves_local(cell: Cell): void {
    let moves = this.game.board.getPossibleMoves(cell);
    for (let move of moves) {
      this.activeCell = cell;
      this.activeMoves.push(move);
    }
  }

  getPossibleMoves_remote(cell: Cell): void {
    let moves: Move[] = [];
    this.checkersService.getPossibleMoves(this.token, cell.position)
      .then(response => {
        moves = response;
        for (let move of moves) {
          this.activeCell = cell;
          this.activeMoves.push(move);
        }
      })
      .catch(err => {
        moves = this.game.board.getPossibleMoves(cell);
        for (let move of moves) {
          this.activeCell = cell;
          this.activeMoves.push(move);
        }
      })
  }

  //MOVE
  move(move: Move) {
    if (this.move_error(move)) {
      return;
    }
    this.checkersService.play(this.token, new PlayRequest(this.activeCell.position, move.destination.position))
      .then(moveResult => {
        this.move_apply(moveResult);
      });
  }

  move_error(move: Move): boolean {
    return this.activeCell == null || this.activeCell.pawn == null || move == null || move.destination == null || this.game.board.isFinished
  }

  getMoveFromCell(cell: Cell): Move {
    return this.activeMoves.find(m => m.destination.equals(cell));
  }

  move_apply(moveResult: MoveResult) {
    this.model.apply(moveResult);
    this.activeCell = null;
    this.activeMoves = [];
    if (moveResult.winningMove) {
      this.winningUser = this.model.game.board.getUserFromPosition(moveResult.destination);
      this.openModal();
    }
  }

  /** UI **/

  //MaterialColors
  boardClasses(cell: Cell): {[key: string]: boolean} {
    let result: {[key: string]: boolean} = {};
    let isPossibleDestinationCell = this.isPossibleDestinationCell(cell);
    let isActivePawnWhite = this.isActivePawnWhite();

    this.addClass(result, this.model.colors.light_cells, cell.isColorLight && !isPossibleDestinationCell);
    this.addClass(result, this.model.colors.dark_cells, cell.isColorDark && !isPossibleDestinationCell);
    this.addClass(result, this.model.colors.player_top_white_possible_cells, isPossibleDestinationCell && isActivePawnWhite);
    this.addClass(result, this.model.colors.player_bottom_black_possible_cells, isPossibleDestinationCell && !isActivePawnWhite);

    return result;
  };

  pawnClasses(cell: Cell): {[key: string]: boolean} {
    let result: {[key: string]: boolean} = {};
    let pawn = cell.pawn;
    let isColorWhite = pawn.isColorWhite;

    this.addClass(result, this.model.colors.player_top_white, isColorWhite);
    this.addClass(result, this.model.colors.player_bottom_black, !isColorWhite);
    this.addClass(result, this.model.colors.movable_pawn, this.isPawnMovable(cell));

    return result;
  }

  bottomBlackPlayerClasses(): {[key: string]: boolean} {
    //{'btn-large': winningUser.colorPawn == 'BLACK', 'btn-medium': winningUser.colorPawn == 'WHITE'}
    let result: {[key: string]: boolean} = {};

    let isBlackWins = this.isBlackWins();

    this.addClass(result, 'btn-large', isBlackWins);
    this.addClass(result, 'btn-medium', !isBlackWins);

    return result;
  }

  topWhitePlayerClasses(): {[key: string]: boolean} {
    //{'btn-large': winningUser.colorPawn == 'WHITE', 'btn-medium': winningUser.colorPawn == 'BLACK'}
    let result: {[key: string]: boolean} = {};

    let isWhiteWins = this.isWhiteWins();

    this.addClass(result, 'btn-large', isWhiteWins);
    this.addClass(result, 'btn-medium', !isWhiteWins);

    return result;
  }

  isPossibleDestinationCell(cell: Cell) {
    return this.activeMoves.find(m => m.destination.equals(cell)) != null;
  }

  isActivePawnWhite(): boolean {
    return this.activeCell != null && this.activeCell.pawn != null && this.activeCell.pawn.isColorWhite;
  }

  isWhiteWins(): boolean {
    return this.winningUser != null && this.winningUser.colorPawn == 'WHITE';
  }

  isBlackWins(): boolean {
    return this.winningUser != null && this.winningUser.colorPawn == 'BLACK';
  }

  isPawnMovable(cell: Cell): boolean {
    return cell.hasPawn() ? cell.pawn.color == this.model.game.board.nextPlayer : false;
  }

  private addClass(result: {[key: string]: boolean}, key: string, value: boolean): void {
    if (result.hasOwnProperty(key)) {
      result[key] = result[key] || value;
    }
    else {
      result[key] = value;
    }
  }


  //Modal
  modalActions = new EventEmitter<string|MaterializeAction>();

  openModal() {
    this.modalActions.emit({action: "modal", params: ['open']});
  }

  closeModal() {
    this.modalActions.emit({action: "modal", params: ['close']});
  }
}
