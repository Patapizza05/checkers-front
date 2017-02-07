import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {GamesComponent} from "./components/games/games.component";
import {Urls} from "./model/urls.model";

const routes: Routes = [
  { path: '', redirectTo: '/'+Urls.GAMES_URL, pathMatch: 'full' },
  { path: `${Urls.GAME_URL}/:${Urls.PARAM_TOKEN}`,  component: DashboardComponent },
  { path: Urls.GAMES_URL, component: GamesComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
