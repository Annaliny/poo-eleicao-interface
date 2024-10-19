import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Candidato, Partido, EleicaoService } from '../eleicao.service';

@Component({
  selector: 'app-candidato-dialog',
  templateUrl: './candidato-dialog.component.html',
  styleUrls: ['./candidato-dialog.component.css']
})
export class CandidatoDialogComponent implements OnInit {
  candidatoForm: FormGroup;
  partidos: Partido[] = [];

  constructor(
    public dialogRef: MatDialogRef<CandidatoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Candidato,
    private fb: FormBuilder,
    private eleicaoService: EleicaoService
  ) {
    this.candidatoForm = this.fb.group({
      nome: [data.nome, Validators.required],
      numero: [data.numero, [Validators.required, Validators.min(1)]],
      cpf: [data.cpf, Validators.required],
      partido: [data.partido, Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    await this.eleicaoService.listarTodosPartidos().subscribe({
      next: (partidos) => {
        this.partidos = partidos;
      },
      error: (err) => {
        console.error('Erro ao carregar partidos:', err);
      }
    });
  }

  onSave(): void {
    if (this.candidatoForm.valid) {
      this.dialogRef.close(this.candidatoForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
