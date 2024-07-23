import { Component, signal } from '@angular/core';
import { Empleado } from '../../model/empleados';
import { JsonPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [JsonPipe,FormsModule ],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})

export class EmpleadosComponent {
  public Titulo = "Administracion de empleados";

  public empleadoId: String = '';
  public nombreEmpleado: String = '';
  public telefonoEmpleado: String = '';

  printInputs() {
    console.log('empleadoId:', this.empleadoId);
    console.log('nombreEmpleado:', this.nombreEmpleado);
    console.log('telefonoEmpleado:', this.telefonoEmpleado);
   }

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

public agregarEmpleado(event:  Event) {
  let tag = event.target as HTMLInputElement
  let cuerpo = {
 
    NombreEmpleado: this.nombreEmpleado,
    TelefonoEmpleado: this.telefonoEmpleado
  }

  this.http.post('http://localhost/empleados', cuerpo).subscribe(
    () => {
    // const nuevaProvincia = Provincia as Provincia;
   //this.Empleados.update((Empleados) => [...Empleados, cuerpo]);
  }
);
};

public actualizarEmpleado( event:  Event) {
  
  let tag = event.target as HTMLInputElement
  let cuerpo = {
    NombreEmpleado: this.nombreEmpleado,
    TelefonoEmpleado: this.telefonoEmpleado
  }
  console.log(cuerpo)

 this.http.put('http://localhost/empleados/' +  this.empleadoId, cuerpo).subscribe(
    () => {
    // const nuevaProvincia = Provincia as Provincia;
   //this.Empleados.update((Empleados) => [...Empleados, cuerpo]);
  }
);
};


public borrarEmpleado() {
  this.http.delete('http://localhost/empleados/' + this.empleadoId).subscribe(() => {
   // this.Usuarios.update(Usuarios) => Usuarios.filter((Usuario) => Usuario.UsuarioId !== this.usuarioId));
  });
};




}
