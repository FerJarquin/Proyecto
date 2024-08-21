import { Component, signal } from '@angular/core';
import { Programacion } from '../../model/programaciones';
import { JsonPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-programaciones',
  standalone: true,
  imports: [JsonPipe, FormsModule,CommonModule,ReactiveFormsModule ],
  templateUrl: './programaciones.component.html',
  styleUrl: './programaciones.component.css'
})

export class ProgramacionesComponent {

  public Titulo = "Administracion de programaciones de citas";

  public programacionId: string = '';
  public usuarioId: string = '';
  public estadoProgramacion: string = '';
  public solicitudId: string = '';
  public actualizadoEn: string = '';

  printInputs() {
    console.log('programacionId:', this.programacionId);
    console.log('estadoProgramacion:', this.estadoProgramacion);
    console.log('solicitudId:', this.solicitudId);
  
  }

  public Programaciones = signal<Programacion[]>([]); 
  
  constructor(private http: HttpClient, private router: Router) {
    if (!this.validaAcceso()) {
      this.router.navigate(['logIn']);
    }
    this.metodoGETProgramaciones();
  };

  public validaAcceso() {
    if (String(localStorage.getItem('Rol')) === "Administrador") {
      return true;
    }
    return false;
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


  public agregarProgramacion(event:  Event) {
    let tag = event.target as HTMLInputElement
    let cuerpo = {
      UsuarioId: this.usuarioId,
      EstadoProgramacion:  this.estadoProgramacion,
      SolicitudId:  this.solicitudId,
    }
    this.http.post('http://localhost/programaciones', cuerpo).subscribe(
      () => {
      //this.Usuarios.update((Usuarios) => [...Usuarios, cuerpo]);
    }
  );
  };

  public actualizarProgramacion( event:  Event) {
  
    let tag = event.target as HTMLInputElement
    let cuerpo = {
      UsuarioId: this.usuarioId,
      EstadoProgramacion: this.estadoProgramacion, 
      SolicitudId: this.solicitudId,

   
    }
    console.log(cuerpo)
  
   this.http.put('http://localhost/programaciones/' +  this.programacionId, cuerpo).subscribe(
      () => {
      //const nuevaUsuario = Usuario as Usuario;
     //this.Usuarios.update((Usuarios) => [...Usuarios, cuerpo]);
    }
  );
  };

  public borrarProgramacion() {
    this.http.delete('http://localhost/programaciones/' + this.programacionId).subscribe(() => {
     // this.Usuarios.update(Usuarios) => Usuarios.filter((Usuario) => Usuario.UsuarioId !== this.usuarioId));
    });
  };

  seleccionarProgramacion(programacion: any) {
    this.programacionId = programacion.ProgramacionId;
    this.usuarioId = programacion.UsuarioId;
    this.estadoProgramacion = programacion.EstadoProgramacion;
    this.solicitudId = programacion.SolicitudId;
    this.actualizadoEn = programacion.ActualizadaEn; 
  }


}

