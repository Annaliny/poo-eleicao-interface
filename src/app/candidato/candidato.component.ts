import { Component, OnInit } from '@angular/core';
import { Candidato, EleicaoService } from '../eleicao.service';
import { MatDialog } from '@angular/material/dialog';
import { CandidatoDialogComponent } from '../candidato-dialog/candidato-dialog.component';

@Component({
  selector: 'app-candidato',
  templateUrl: '../candidato/candidato.component.html',
  styleUrl: '../candidato/candidato.component.css'
})

export class CandidatoComponent implements OnInit {
  candidatos: Candidato[] = [];

  constructor(private eleicaoService: EleicaoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.listarCandidatos();
  }

  listarCandidatos(): void {
    this.eleicaoService.listarTodosCandidatos().subscribe({
      next: (candidatos) => {
        this.candidatos = candidatos;
      },
      error: (err) => {
        console.error('Erro ao listar candidatos:', err);
      }
    });
  }

  criarCandidato(): void {
    const dialogRef = this.dialog.open(CandidatoDialogComponent, {
      width: '300px',
      data: { nome: '', numero: null, cpf: '', partido: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eleicaoService.criarCandidato(result).subscribe({
          next: () => this.listarCandidatos(),
          error: (err) => console.error('Erro ao criar candidato:', err)
        });
      }
    });
  }

  editarCandidato(candidato: Candidato): void {
    const dialogRef = this.dialog.open(CandidatoDialogComponent, {
      width: '300px',
      data: { ...candidato }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eleicaoService.editarCandidato(result, candidato.nome).subscribe({
          next: () => this.listarCandidatos(),
          error: (err) => console.error('Erro ao editar candidato:', err)
        });
      }
    });
  }

  removerCandidato(nome: string): void {
    this.eleicaoService.removerCandidato(nome).subscribe({
      next: () => this.listarCandidatos(),
      error: (err) => console.error('Erro ao remover candidato:', err)
    });
  }

  gravarCandidatos(): void {
    this.eleicaoService.gravarCandidatos('candidatos').subscribe({
      next: (response) => {
        alert('Candidatos gravados com sucesso.');
      },
      error: (err) => {
        console.error('Erro ao gravar candidatos:', err);
      }
    });
  }

  recuperarCandidatos(): void {
    this.eleicaoService.recuperarCandidatos('candidatos', 'partidos').subscribe({
      next: (candidatosMap) => {
        this.candidatos = Object.values(candidatosMap);
        alert('Candidatos recuperados com sucesso.');
      },
      error: (err) => {
        console.error('Erro ao recuperar candidatos:', err);
      }
    });
  }
}
