import { Component, signal } from '@angular/core';
import { Programacion } from '../../model/programaciones';
import { JsonPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-programaciones',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './programaciones.component.html',
  styleUrl: './programaciones.component.css'
})

export class ProgramacionesComponent {

  public Titulo = "Administracion de programaciones de citas";
  public Programaciones = signal<Programacion[]>([]); 
  
  constructor(private http: HttpClient) {
    this.metodoGETProgramaciones();
  };

  public metodoGETProgramaciones() {
    let cuerpo = {};
    this.http.get('http://localhost/programaciones', cuerpo)
    .subscribe((Programaciones) => {
      const arr = Programaciones as Programacion[];
      arr.forEach((Programacion) => {
        this.agregarProgramacionALaSenial(
          Programacion.ProgramacionId
          ,Programacion.ActualizadaEn
          ,Programacion.UsuarioId
          ,Programacion.EstadoProgramacion
          ,Programacion.SolicitudId
          );
      });
    });
  };


  public agregarProgramacionALaSenial(
    ProgramacionId?: string, 
    ActualizadaEn?: string,
    UsuarioId?: string,
    EstadoProgramacion?: string,
    SolicitudId?: string,
  ) {
  let nuevaProgramacion = {
    ProgramacionId: ProgramacionId
    ,ActualizadaEn: ActualizadaEn
    ,UsuarioId: UsuarioId 
    ,EstadoProgramacion: EstadoProgramacion 
    ,SolicitudId:SolicitudId 

  };
  this.Programaciones.update((Programaciones) => [...Programaciones, nuevaProgramacion]);
};

}

