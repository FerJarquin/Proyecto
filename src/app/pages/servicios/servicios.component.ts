import { Component, signal } from '@angular/core';
import { Servicio } from '../../model/servicios';
import { JsonPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

  public Titulo = "Administracion de servicios";
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
}
