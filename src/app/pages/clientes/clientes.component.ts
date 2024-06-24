import { Component, signal } from '@angular/core';
import { Cliente } from '../../model/clientes';
import { JsonPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  public Titulo = "Administracion de clientes";
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
      NombreCliente: tag.value,
      CedulaCliente: tag.value,
      TelefonoCliente: tag.value,
      CorreoCliente: tag.value,
      ContrasenaCliente: tag.value,
    }
    this.http.post('http://localhost/clientes', cuerpo).subscribe(
      () => {
      // const nuevaProvincia = Provincia as Provincia;
      this.Clientes.update((Clientes) => [...Clientes, cuerpo]);
    }
  );
  };


}
