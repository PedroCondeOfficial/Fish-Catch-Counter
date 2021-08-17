import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FishComponent } from './fish/fish.component';
import { CatchesComponent } from './catches/catches.component';
import { SharedService } from './shared.service';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEditCatchComponent } from './catches/add-edit-catch/add-edit-catch.component';

@NgModule({
  declarations: [
    AppComponent,
    FishComponent,
    CatchesComponent,
    AddEditCatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
