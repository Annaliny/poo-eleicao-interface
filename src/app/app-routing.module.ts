import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartidoComponent } from './partido/partido.component';
import { CandidatoComponent } from './candidato/candidato.component';

const routes: Routes = [
  { path: '', redirectTo: '/partido', pathMatch: 'full' }, // Redireciona para Partido por padrão
  { path: 'partido', component: PartidoComponent },
  { path: 'candidato', component: CandidatoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
