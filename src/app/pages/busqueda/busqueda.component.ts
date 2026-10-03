import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DestinosService,
  DestinoResponse
} from '../../services/destinos.service';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {

  private readonly destinosService = inject(DestinosService);

  codigo = '';
  resultado: DestinoResponse | null = null;
  error = '';

  tipoProductor = ' ';
  programa = ' ';
  enfoque = ' ';
  snca = ' ';

  buscar(): void {
    this.error = '';
    this.resultado = null;

    const codigo = this.codigo.trim();

    if (!codigo) {
      this.error = 'CÓDIGO DEL DESTINO.';
      return;
    }

    this.destinosService.buscarPorDestino(codigo).subscribe({
      next: (respuesta) => {
        this.resultado = respuesta;
      },
      error: (error) => {
        console.error(error);
        this.error = 'NO SE ENCUENTRA EL CÓDIGO';
      }
    });
  }

  frase = '';

 private obtenerPrograma(): string {
    switch (this.programa) {
      case 'CRÉDITO ORDINARIO':
        return 'CRÉDITO ORDINARIO';

      case 'SITUACIÓN ESPECIAL':
        return 'SITUACIÓN ESPECIAL';

      case 'LEC DESARROLLO PRODUCTIVO':
        return 'LEC DESARROLLO PRODUCTIVO';

      case 'LEC REFORMA AGRARIA':
        return 'LEC REFORMA AGRARIA';

      case 'FNC':
        return 'FNC';

      case 'INCENTIVO CAPITALIZACIÓN GESTIÓN RIESGOS':
        return 'INCENTIVO CAPITALIZACIÓN GESTIÓN RIESGOS';

      case 'LÍNEA RESTABLECIMIENTO PRODUCTIVO':
        return 'LÍNEA RESTABLECIMIENTO PRODUCTIVO';

      default:
        return '';
    }
  }

  private obtenerEnfoque(): string {
    switch (this.enfoque) {
      case 'ENFOQUE ÉTNICO':
        return 'ENFOQUE ETNICO';

      case 'ENFOQUE INDIVIDUAL':
        return 'ENFOQUE INDIVIDUAL';

      case 'ENFOQUE ASOCIATIVO':
        return 'ENFOQUE ASOCIATIVO';

      default:
        return '';
    }
  }

  private obtenerSnca(): string {
    return this.snca === 'PRIMERA VEZ'
      ? 'PRIMERA VEZ'
      : ' ';
  }

  generarFrase(): void {
    if (!this.resultado?.destino) {
      this.error = 'CÓDIGO ?.';
      return;
    }

    const programa = this.obtenerPrograma();
    const enfoque = this.obtenerEnfoque();
    const snca = this.obtenerSnca();
    const plazo = this.resultado.destino.plazo ?? '';
    const actividad = this.resultado.destino.actividad ?? '';

    this.frase = [
      programa,
      enfoque,
      snca,
      plazo,
      actividad,
    ]
      .filter(valor => valor.trim() !== '')
      .join(' ') +' 2026';
  }


  copiado = false;

  async copiarFrase(): Promise<void> {
    if (!this.frase) {
      return;
    }

    try {
      await navigator.clipboard.writeText(this.frase);

      this.copiado = true;

      setTimeout(() => {
        this.copiado = false;
      }, 2500);

    } catch (error) {
      console.error('ERROR AL COPIAR LA FRASE:', error);
    }
  }
}
