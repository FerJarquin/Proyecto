import { Component, signal } from '@angular/core';
import { Solicitud } from '../../model/solicitudes';
import { JsonPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [JsonPipe, FormsModule ],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})

export class SolicitudesComponent {

  public Titulo = "Administracion de Solicitudes";

  public solicitudId: String = '';
  public fechaSolicitud: String = '';
  public fechaCita: String = '';
  public comentarioSolicitud: String = '';
  public clienteId: String = '';
  public servicioId: String = '';


  printInputs() {
    console.log('solicitudId:', this.solicitudId);
    console.log('fechaSolicitud:', this.comentarioSolicitud);
    console.log('fechaCita:', this.fechaCita);
    console.log('comentarioSolicitud:', this.comentarioSolicitud);
    console.log('clienteId:', this.clienteId);    
    console.log('servicioId:', this.servicioId);    
  }


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
          ,Solicitud.FechaCita
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
    ,FechaCita?: string
    ,ComentarioSolicitud?: string
    ,ClienteId?: string
    ,ServicioId?: string
  ) {
  let nuevaSolicitud = {
    SolicitudId: SolicitudId,
    FechaSolicitud: FechaSolicitud, 
    FechaCita: FechaCita, 
    ComentarioSolicitud: ComentarioSolicitud,
    ClienteId: ClienteId,
    ServicioId: ServicioId 

  };
  this.Solicitudes.update((Solicitudes) => [...Solicitudes, nuevaSolicitud]);
};

public agregarSolicitud(event:  Event) {
  let tag = event.target as HTMLInputElement
  let cuerpo = {
 
    ComentarioSolicitud: this.comentarioSolicitud,
    ClienteId: this.clienteId, 
    ServicioId : this.servicioId

  }

  this.http.post('http://localhost/solicitudes', cuerpo).subscribe(
    () => {
    // const nuevaProvincia = Provincia as Provincia;
   //this.Empleados.update((Empleados) => [...Empleados, cuerpo]);
  }
);
};


public actualizarSolicitud( event:  Event) {
  
  let tag = event.target as HTMLInputElement
  let cuerpo = {
    FechaSolicitud: this.fechaSolicitud,
    FechaCita: this.fechaCita, 
    ComentarioSolicitud: this.comentarioSolicitud,
    ClienteId: this.clienteId, 
    ServicioId: this.servicioId, 
  }
  console.log(cuerpo)

 this.http.put('http://localhost/solicitudes/' +  this.solicitudId, cuerpo).subscribe(
    () => {
    // const nuevaProvincia = Provincia as Provincia;
   //this.Empleados.update((Empleados) => [...Empleados, cuerpo]);
  }
);
};



public borrarSolicitud() {
  this.http.delete('http://localhost/solicitudes/' + this.solicitudId).subscribe(() => {
   // this.Usuarios.update(Usuarios) => Usuarios.filter((Usuario) => Usuario.UsuarioId !== this.usuarioId));
  });
};


}
