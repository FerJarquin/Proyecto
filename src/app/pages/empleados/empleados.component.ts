import { Component, signal } from '@angular/core';
import { Empleado } from '../../model/empleados';
import { JsonPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})

export class EmpleadosComponent {
  public Titulo = "Administracion de empleados";
  public Empleados = signal<Empleado[]>([]); 

  constructor(private http: HttpClient) {
    this.metodoGETEmpleados();
  };

  public metodoGETEmpleados() {
    let cuerpo = {};
    this.http.get('http://localhost/empleados', cuerpo)
    .subscribe((Empleados) => {
      const arr = Empleados as Empleado[];
      arr.forEach((Empleado) => {
        this.agregarEmpleadoALaSenial(
          Empleado.EmpleadoId
          ,Empleado.NombreEmpleado
          ,Empleado.TelefonoEmpleado
          );
      });
      // console.log(typeof(arr));
    });
  };

  public agregarEmpleadoALaSenial(
    EmpleadoId?: string
    ,NombreEmpleado?: string
    ,TelefonoEmpleado?: string
  ) {
  let nuevaEmpleado = {
    EmpleadoId: EmpleadoId, 
    NombreEmpleado: NombreEmpleado,
    TelefonoEmpleado: TelefonoEmpleado

  };
  this.Empleados.update((Empleados) => [...Empleados, nuevaEmpleado]);
};

}
