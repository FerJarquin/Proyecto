import { Component, signal } from '@angular/core';
import { Solicitud } from '../../model/solicitudes';
import { Programacion } from '../../model/programaciones';
import { JsonPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [JsonPipe, FormsModule,CommonModule ],
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
  public estadoProgramacion: String = '';


  printInputs() {
    console.log('solicitudId:', this.solicitudId);
    console.log('fechaSolicitud:', this.comentarioSolicitud);
    console.log('fechaCita:', this.fechaCita);
    console.log('comentarioSolicitud:', this.comentarioSolicitud);
    console.log('clienteId:', this.clienteId);    
    console.log('servicioId:', this.servicioId);   
    this.obtenerEstadoProgramacion("38");

  }


  public Solicitudes = signal<Solicitud[]>([]); 

  public Programaciones = signal<Programacion[]>([]); 


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

  console.log(this.fechaCita)

  let tag = event.target as HTMLInputElement

  let cuerpo = {
    ComentarioSolicitud: this.comentarioSolicitud,
    ClienteId: this.clienteId, 
    ServicioId : this.servicioId,
    FechaCita : this.fechaCita

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


seleccionarSolicitud(solicitud: any) {
  this.solicitudId = solicitud.SolicitudId;
  this.fechaSolicitud = solicitud.FechaSolicitud;
  this.fechaCita = solicitud.FechaCita;
  this.comentarioSolicitud = solicitud.ComentarioSolicitud;
  this.clienteId = solicitud.ClienteId;
  this.servicioId = solicitud.ServicioId;
  this.obtenerEstadoProgramacion(solicitud.SolicitudId);

}

obtenerEstadoProgramacion(solicitudId: string) {
  this.http.get(`http://localhost/programaciones/estado/${solicitudId}`)
    .subscribe((Programaciones: any) => {
      this.estadoProgramacion = Programaciones.EstadoProgramacion; // Suponiendo que la respuesta tiene un campo 'EstadoProgramacion'
      console.log('estadoProgramacion:', this.estadoProgramacion);
    }, error => {
      console.error('Error al obtener el estado de la programación:', error);
    });
}





}
