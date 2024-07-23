import { Component, signal } from '@angular/core';
import { Cliente } from '../../model/clientes';
import { JsonPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  public Titulo = "Administracion de Clientes";
  
  public clienteId: string = '';
  public nombreCliente: string = '';
  public cedulaCliente: string = '';
  public telefonoCliente: string = '';
  public correoCliente: string = ''; 
  public contrasenaCliente: string = '';
  

  printInputs() {
    console.log('clienteId:', this.clienteId);
    console.log('nombreCliente:', this.nombreCliente);
    console.log('cedulaCliente:', this.cedulaCliente);
    console.log('telefonoCliente:', this.telefonoCliente);    
    console.log('correoCliente:', this.correoCliente);    
    console.log('contrasenaCliente:', this.contrasenaCliente);    
  }



  public Clientes = signal<Cliente[]>([]);

  constructor(private http: HttpClient) {
    this.metodoGETClientes();
  };
  
  public metodoGETClientes() {
    let cuerpo = {};
    this.http.get('http://localhost/clientes', cuerpo)
    .subscribe((Clientes) => {
      const arr = Clientes as Cliente[];
      arr.forEach((Cliente) => {
        this.agregarClienteALaSenial(
          Cliente.ClienteId 
          ,Cliente.NombreCliente
          ,Cliente.CedulaCliente
          ,Cliente.TelefonoCliente
          ,Cliente.CorreoCliente
          ,Cliente.ContrasenaCliente
          );
      });
      // console.log(typeof(arr));
    });
  };

  public agregarClienteALaSenial(
      ClienteId?: string
    , NombreCliente?: string
    , CedulaCliente?: string
    , TelefonoCliente?: string
    , CorreoCliente?: string
    , ContrasenaCliente?: string) {
    let nuevaCliente = {
      ClienteId: ClienteId,
      NombreCliente: NombreCliente,
      CedulaCliente: CedulaCliente,
      TelefonoCliente: TelefonoCliente, 
      CorreoCliente: CorreoCliente,
      ContrasenaCliente: ContrasenaCliente, 
    };
    this.Clientes.update((Clientes) => [...Clientes, nuevaCliente]);
  };

  
  public agregarCliente(event:  Event) {
    let tag = event.target as HTMLInputElement
    let cuerpo = {
      NombreCliente: this.nombreCliente,
      CedulaCliente: this.cedulaCliente,
      TelefonoCliente: this.telefonoCliente,
      CorreoCliente: this.correoCliente,
      ContrasenaCliente: this.contrasenaCliente,
    }
    this.http.post('http://localhost/clientes', cuerpo).subscribe(
      () => {
      // const nuevaProvincia = Provincia as Provincia;
     this.Clientes.update((Clientes) => [...Clientes, cuerpo]);
    }
  );
  };

  public borrarCliente() {
    this.http.delete('http://localhost/clientes/' + this.clienteId).subscribe(() => {
     //this.Clientes.update(Clientes) => Clientes.filter((Cliente) => Cliente,this.clienteId !== this.clienteId));
    });
  };

  public actualizarCliente( event:  Event) {
  
    let tag = event.target as HTMLInputElement
    let cuerpo = {
      NombreCliente: this.nombreCliente,
      CedulaCliente: this.cedulaCliente,
      TelefonoCliente: this.telefonoCliente,
      CorreoCliente: this.correoCliente,
      ContrasenaCliente: this.contrasenaCliente,
    }
    console.log(cuerpo)
  
   this.http.put('http://localhost/clientes/' +  this.clienteId, cuerpo).subscribe(
      () => {
      // const nuevaProvincia = Provincia as Provincia;
     //this.Empleados.update((Empleados) => [...Empleados, cuerpo]);
    }
  );
  };

}
