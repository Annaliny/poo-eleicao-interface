import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Partido } from '../eleicao.service';

@Component({
  selector: 'app-partido-dialog',
  templateUrl: './partido-dialog.component.html',
  styleUrl: './partido-dialog.component.css'
})

export class PartidoDialogComponent {
  partidoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PartidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partido,
    private fb: FormBuilder
  ) {
    this.partidoForm = this.fb.group({
      nome: [data.nome, Validators.required],
      numero: [data.numero, [Validators.required, Validators.min(1)]],
      cnpj: [data.cnpj, Validators.required]
    });
  }

  onSave(): void {
    if (this.partidoForm.valid) {
      this.dialogRef.close(this.partidoForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}



