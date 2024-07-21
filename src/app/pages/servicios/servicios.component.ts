import { Component, signal } from '@angular/core';
import { Servicio } from '../../model/servicios';
import { JsonPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

  public Titulo = "Administracion de servicios";

  public servicioId: String = '';
  public nombreServicio: String = '';
  public descripcionServicio: String = '';
  public empleadoId: String = '';


  printInputs() {
    console.log('servicioId:', this.servicioId);
    console.log('nombreServicio:', this.nombreServicio);
    console.log('descripcionServicio:', this.descripcionServicio);
    console.log('empleadoId:', this.empleadoId);    
  }

  public Servicios = signal<Servicio[]>([]); 
  


  constructor(private http: HttpClient) {
    this.metodoGETServicios();
  };

  public metodoGETServicios() {
    let cuerpo = {};
    this.http.get('http://localhost/servicios', cuerpo)
    .subscribe((Servicios) => {
      const arr = Servicios as Servicio[];
      arr.forEach((Servicio) => {
        this.agregarServicioALaSenial(
          Servicio.ServicioId
          ,Servicio.NombreServicio
          ,Servicio.DescripcionServicio
          ,Servicio.EmpleadoId
          );
      });
    });
  };

  public agregarServicioALaSenial(
    ServicioId?: string
    ,NombreServicio?: string
    ,DescripcionServicio?: string
    ,EmpleadoId?: string 

  ) {
  let nuevaServicio = {
   
      ServicioId: ServicioId
    , NombreServicio: NombreServicio
    , DescripcionServicio: DescripcionServicio
    , EmpleadoId: EmpleadoId
  };
  this.Servicios.update((Servicios) => [...Servicios, nuevaServicio]);
  };

 public agregarServicio(event:  Event) {
    let tag = event.target as HTMLInputElement
    let cuerpo = {
      NombreServicio: this.nombreServicio,
      DescripcionServicio:  this.descripcionServicio,
      EmpleadoId: this.empleadoId
    }
    this.http.post('http://localhost/servicios/', cuerpo).subscribe(
      () => {
      //this.Usuarios.update((Usuarios) => [...Usuarios, cuerpo]);
    }
  );
  };


  public borrarServicio() {
    this.http.delete('http://localhost/servicios/' + this.servicioId).subscribe(() => {
     // this.Usuarios.update(Usuarios) => Usuarios.filter((Usuario) => Usuario.UsuarioId !== this.usuarioId));
    });
  };
}
