import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EleicaoService, Partido } from '../eleicao.service';
import { MatDialog } from '@angular/material/dialog';
import { PartidoDialogComponent } from '../partido-dialog/partido-dialog.component';
import { response } from 'express';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css']
})
export class PartidoComponent implements OnInit {
  partidos: Partido[] = [];

  constructor(private eleicaoService: EleicaoService, public dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    await this.listarPartidos();
  }

  listarPartidos(): void {
    this.eleicaoService.listarTodosPartidos().subscribe({
      next: (partidos) => {
        this.partidos = partidos;
        console.log('Partidos atualizados:', this.partidos);
      },
      error: (err) => {
        console.error('Erro ao listar partidos:', err);
      }
    });
  }

  criarPartido(): void {
    const dialogRef = this.dialog.open(PartidoDialogComponent, {
      width: '300px',
      data: { nome: '', numero: null, cnpj: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eleicaoService.criarPartido(result).subscribe({
          next: () => this.listarPartidos(),
          error: (err) => console.error('Erro ao criar partido:', err)
        });
      }
    });
  }

  editarPartido(partido: Partido): void {
    const dialogRef = this.dialog.open(PartidoDialogComponent, {
      width: '300px',
      data: { ...partido }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eleicaoService.editarPartido(result, partido.nome).subscribe({
          next: () => {
            this.listarPartidos();
            console.log('Partido editado com sucesso.');
          },
          error: (err) => {
            console.error('Erro ao editar partido:', err);
          }
        });
      }
    });
  }

  removerPartido(nome: string): void {
    this.eleicaoService.removerPartido(nome).subscribe({
      next: () => this.listarPartidos(),
      error: (err) => console.error('Erro ao remover partido:', err)
    });
  }

  gravarPartidos(nomeArquivo: string): void {
    this.eleicaoService.gravarPartidos(nomeArquivo).subscribe(response => {
      alert(response);
    });
  }

  async recuperarPartidos(nomeArquivo: string): Promise<void> {
    await this.eleicaoService.recuperarPartidos(nomeArquivo).subscribe(partidos => {
      this.partidos = Object.values(partidos);
    });
    await this.listarPartidos();
  }
}
