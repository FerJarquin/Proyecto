import { Component, signal } from '@angular/core';
import { Programacion } from '../../model/programaciones';
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'app-programaciones',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './programaciones.component.html',
  styleUrl: './programaciones.component.css'
})

export class ProgramacionesComponent {

  public Titulo = "Administracion de solicitudes";
  public Programaciones = signal<Programacion[]>([
    {
      ProgramacionId: 'String',
      ActualizadaEn: 'String',
      UsuarioId: 'String',
      EstadoProgramacion: 'String',
      SolicitudId: 'String'
    }
  ]);  //Como se llame mi intefaz



}
