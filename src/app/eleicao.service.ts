import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Partido {
  nome: string;
  numero: number;
  cnpj: string;
}

export interface Candidato {
  nome: string;
  numero: number;
  cpf: string;
  partido: Partido;
}

@Injectable({
  providedIn: 'root'
})
export class EleicaoService {
  private apiUrl = 'http://localhost:8080/eleicao'; // URL base da API

  constructor(private http: HttpClient) {}

  // Métodos para Partido
  criarPartido(partido: Partido): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/partido`, partido);
  }

  listarTodosPartidos(): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.apiUrl}/partidos`);
  }

  listarPartidoPorNome(nome: string): Observable<Partido> {
    return this.http.get<Partido>(`${this.apiUrl}/partido/${nome}`);
  }

  editarPartido(partido: Partido, nomeAntigo: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/partido?nomeAntigo=${nomeAntigo}`, partido);
  }

  removerPartido(nome: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/partido/${nome}`);
  }

  // Métodos para Candidato
  criarCandidato(candidato: Candidato): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/candidato`, candidato);
  }

  listarTodosCandidatos(): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(`${this.apiUrl}/candidatos`);
  }

  listarCandidatoPorNome(nome: string): Observable<Candidato> {
    return this.http.get<Candidato>(`${this.apiUrl}/candidato/${nome}`);
  }

  editarCandidato(candidato: Candidato, nomeAntigo: string): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/candidato?nomeAntigo=${nomeAntigo}`, candidato);
  }

  removerCandidato(nome: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/candidato/${nome}`);
  }

  // Métodos de gravação e recuperação
  gravarPartidos(nomeArquivo: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/gravar-partidos`, null, { params: { nomeArquivo } });
  }

  gravarCandidatos(nomeArquivo: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/gravar-candidatos`, null, { params: { nomeArquivo } });
  }

  recuperarPartidos(nomeArquivo: string): Observable<Map<string, Partido>> {
    return this.http.get<Map<string, Partido>>(`${this.apiUrl}/recuperar-partidos`, { params: { nomeArquivo } });
  }

  recuperarCandidatos(nomeArquivo: string, arquivoPartidos: string): Observable<Map<string, Candidato>> {
    return this.http.get<Map<string, Candidato>>(`${this.apiUrl}/recuperar-candidatos`, { params: { nomeArquivo, arquivoPartidos } });
  }
}
