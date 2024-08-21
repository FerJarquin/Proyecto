import { Component, signal } from '@angular/core';
import { Solicitud } from '../../model/solicitudes';
import { Programacion } from '../../model/programaciones';
import { JsonPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [JsonPipe, FormsModule, CommonModule, ReactiveFormsModule],
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

  }


  public Solicitudes = signal<Solicitud[]>([]);

  public Programaciones = signal<Programacion[]>([]);

  public solicitudArray: any[] = [];


  constructor(private http: HttpClient,  private router: Router) {
    if (!this.validaAcceso()) {
      this.router.navigate(['logIn']);
    }
    this.metodoGETSolicitudes();
  };


  public validaAcceso() {
    if (String(localStorage.getItem('Rol')) === "Administrador") {
      return true;
    }
    return false;
  };

  public metodoGETSolicitudes() {
    let cuerpo = {};
    this.http.get('http://localhost/solicitudes', cuerpo)
      .subscribe((Solicitudes) => {
        const arr = Solicitudes as Solicitud[];
        arr.forEach((Solicitud) => {
          this.agregarSolicitudALaSenial(
            Solicitud.SolicitudId
            , Solicitud.FechaSolicitud
            , Solicitud.FechaCita
            , Solicitud.ComentarioSolicitud
            , Solicitud.ClienteId
            , Solicitud.ServicioId
          );

          // Agregar a appointments
          this.solicitudArray.push({
            solicitud: Solicitud.SolicitudId,
            fechaSolicitud: Solicitud.FechaCita,
            comentario: Solicitud.ComentarioSolicitud, // Suponiendo que hay un campo para la hora, cámbialo según corresponda
            cliente: Solicitud.ClienteId,
            servicioId : Solicitud.ServicioId,
          });
        });
        // console.log(typeof(arr));
      });
  };

  public agregarSolicitudALaSenial(
    SolicitudId?: string
    , FechaSolicitud?: string
    , FechaCita?: string
    , ComentarioSolicitud?: string
    , ClienteId?: string
    , ServicioId?: string
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

  public agregarSolicitud(event: Event) {

    console.log(this.fechaCita)

    let tag = event.target as HTMLInputElement

    let cuerpo = {
      ComentarioSolicitud: this.comentarioSolicitud,
      ClienteId: this.clienteId,
      ServicioId: this.servicioId,
      FechaCita: this.fechaCita

    }

    this.http.post('http://localhost/solicitudes', cuerpo).subscribe(
      () => {
        // const nuevaProvincia = Provincia as Provincia;
        //this.Empleados.update((Empleados) => [...Empleados, cuerpo]);
      }
    );
  };


  public actualizarSolicitud(event: Event) {
    let tag = event.target as HTMLInputElement
    let cuerpo = {
      FechaSolicitud: this.fechaSolicitud,
      FechaCita: this.fechaCita,
      ComentarioSolicitud: this.comentarioSolicitud,
      ClienteId: this.clienteId,
      ServicioId: this.servicioId,
    }
    console.log(cuerpo)

    this.http.put('http://localhost/solicitudes/' + this.solicitudId, cuerpo).subscribe(
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
  }

 

  public reporte() {
    const doc = new jsPDF();
    // Encabezado
    doc.setFontSize(20);
    doc.setTextColor("FE6B00"); // Cambia el color del texto del encabezado
    doc.text("Reporte de Solicitudes", 105, 20, { align: 'center' });
  
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Fecha de generación: " + new Date().toLocaleDateString(), 105, 30, { align: 'center' });
  
    let startY = 40;
    const lineHeight = 10;
    const boxPadding = 4;
  
    this.solicitudArray.forEach((solicitud, index) => {
      if (startY > 260) {
        // Si la página está llena, crear una nueva
        doc.addPage();
        startY = 20;
      }
  
      // Dibuja un rectángulo alrededor de cada solicitud
      doc.setFillColor("#999"); // Alterna el color de fondo entre solicitudes
      doc.roundedRect(10, startY, 190, 70, 3, 3, 'F');
  
      // Título de la solicitud
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204);
      doc.text(`Reporte N° ${index + 1}`, 15, startY + lineHeight);
  
      // Contenido de la solicitud
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Solicitud Id: ${solicitud.solicitud}`, 15, startY + lineHeight * 2 + boxPadding);
      doc.text(`Fecha Solicitud: ${solicitud.fechaSolicitud || ''}`, 15, startY + lineHeight * 3 + boxPadding);
      doc.text(`Cliente: ${solicitud.cliente}`, 15, startY + lineHeight * 4 + boxPadding);
      doc.text(`Servicio: ${solicitud.servicioId}`, 15, startY + lineHeight * 5 + boxPadding);
      doc.text(`Comentario: ${solicitud.comentario || ''}`, 15, startY + lineHeight * 6 + boxPadding);
      startY += 90; // Espacio entre cada solicitud
    });
  
    // Guardar el documento
    doc.save("calendarizacion.pdf");
  }

  
}

