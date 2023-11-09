import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Heroi } from '../models/heroi.model';
import { Superpoder } from '../models/superpoder.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'https://localhost:7168/api';

    constructor(private http: HttpClient) { }

    obterHeroi(heroiId: number): Observable<Heroi> {
        return this.http.get<Heroi>(`${this.apiUrl}/herois/${heroiId}`);
    }

    obterHerois(): Observable<Heroi[]> {
        return this.http.get<Heroi[]>(`${this.apiUrl}/herois`);
    }

    criarHeroi(heroi: Heroi): Observable<Heroi> {
        return this.http.post<Heroi>(`${this.apiUrl}/herois`, heroi);
    }

    atualizarHeroi(heroi: Heroi): Observable<Heroi> {
        return this.http.put<Heroi>(`${this.apiUrl}/herois/${heroi.id}`, heroi);
    }

    excluirHeroi(heroiId: number): Observable<any> {
        return this.http.delete<Heroi>(`${this.apiUrl}/herois/${heroiId}`);
    }

    obterPoderes(): Observable<Superpoder[]> {
        return this.http.get<Superpoder[]>(`${this.apiUrl}/superpoderes`);
    }
}
