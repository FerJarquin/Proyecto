import { Component, signal } from '@angular/core';
import { Solicitud } from '../../model/solicitudes';
import { JsonPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})

export class SolicitudesComponent {

  public Titulo = "Administracion de Solicitudes";
  public Solicitudes = signal<Solicitud[]>([]); 

  constructor(private http: HttpClient) {
    this.metodoGETSolicitudes();
  };

  public metodoGETSolicitudes() {
    let cuerpo = {};
    this.http.get('http://localhost/solicitudes', cuerpo)
    .subscribe((Solicitudes) => {
      const arr = Solicitudes as Solicitud[];
      arr.forEach((Solicitud) => {
        this.agregarSolicitudALaSenial(
          Solicitud.SolicitudId
          ,Solicitud.FechaSolicitud
          ,Solicitud.ComentarioSolicitud
          ,Solicitud.ClienteId
          ,Solicitud.ServicioId
          );
      });
      // console.log(typeof(arr));
    });
  };

  public agregarSolicitudALaSenial(
    SolicitudId?: string
    ,FechaSolicitud?: string
    ,ComentarioSolicitud?: string
    ,ClienteId?: string
    ,ServicioId?: string
  ) {
  let nuevaSolicitud = {
    SolicitudId: SolicitudId,
    FechaSolicitud: FechaSolicitud, 
    ComentarioSolicitud: ComentarioSolicitud,
    ClienteId: ClienteId,
    ServicioId: ServicioId 

  };
  this.Solicitudes.update((Solicitudes) => [...Solicitudes, nuevaSolicitud]);
};

}
