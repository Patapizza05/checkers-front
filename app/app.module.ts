import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './components/app.component';
import {MaterializeModule} from 'angular2-materialize';
import {FormsModule} from "@angular/forms";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {NavBarComponent} from "./components/navbar/navbar.component";
import {BoardComponent} from "./components/board/board.component";

@NgModule({
  declarations: [ DashboardComponent, AppComponent, NavBarComponent, BoardComponent ],
  imports:      [ BrowserModule, FormsModule, HttpModule, MaterializeModule, AppRoutingModule ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
