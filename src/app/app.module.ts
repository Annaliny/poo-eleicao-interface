import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { AppComponent } from './app.component';
import { PartidoComponent } from '../app/partido/partido.component';
import { AppRoutingModule } from './app-routing.module';
import { CandidatoComponent } from './candidato/candidato.component';
import { PartidoDialogComponent } from './partido-dialog/partido-dialog.component';
import { CandidatoDialogComponent } from './candidato-dialog/candidato-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PartidoComponent,
    CandidatoComponent,
    PartidoDialogComponent,
    CandidatoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
