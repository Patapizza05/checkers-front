import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './components/app.component';
import "/node_modules/materialize-css"
import {MaterializeModule} from 'angular2-materialize';
import {FormsModule} from "@angular/forms";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {NavBarComponent} from "./components/navbar/navbar.component";
import {BoardComponent} from "./components/board/board.component";
import {CheckersService} from "./services/checkers.service";
import {PlayerInformationComponent} from "./components/player-information/player-information.component";
import {ModelService} from "./services/model.service";
import {GamesComponent} from "./components/games/games.component";


@NgModule({
  declarations: [DashboardComponent, AppComponent, NavBarComponent, BoardComponent, PlayerInformationComponent, GamesComponent],
  imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule, MaterializeModule],
  providers: [CheckersService, ModelService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
