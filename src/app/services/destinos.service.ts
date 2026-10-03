import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DestinoResponse {
  destino: {
    actividad: string | null;
    destino: string | null;
    producto: string | null;
    linea: string | null;
    plazo: string | null;
    programa: string | null;
  } | null;

  lec: {
    lec: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DestinosService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://backend-lecs-production.up.railway.app';

  buscarPorDestino(codigo: string): Observable<DestinoResponse> {
    return this.http.get<DestinoResponse>(
      `${this.apiUrl}/destinos/${codigo}/completo`
    );
  }
}
