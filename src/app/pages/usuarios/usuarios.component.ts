import { Component, signal } from '@angular/core';
import { Usuario } from '../../model/usuarios';
import { JsonPipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms'


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
 
  public Titulo = "Administracion de usuarios";

  public nombreUsuario: String = '';
  public correoUsuario: String = '';
  public contrasenaUsuario: String = '';
  public rolUsuario: String = '';
  public usuarioId: String = '';

  printInputs() {
    console.log('nombreUsuario:', this.nombreUsuario);
    console.log('correoUsuario:', this.correoUsuario);
    console.log('contrasenaUsuario:', this.contrasenaUsuario);
    console.log('rolUsuario:', this.rolUsuario);
    console.log('usuarioId:', this.usuarioId);
    
  }

  public Usuarios = signal<Usuario[]>([]); 
  
  constructor(private http: HttpClient) {
    this.metodoGETUsuarios();
  };

  public metodoGETUsuarios() {
    let cuerpo = {};
    this.http.get('http://localhost/usuarios', cuerpo)
    .subscribe((Usuarios) => {
      const arr = Usuarios as Usuario[];
      arr.forEach((Usuario) => {
        this.agregarUsuarioALaSenial(
          Usuario.UsuarioId
          ,Usuario.NombreUsuario
          ,Usuario.CorreoUsuario
          ,Usuario.ContrasenaUsuario
          ,Usuario.Rol
          );
      });
    });
  };

  public agregarUsuarioALaSenial(
    UsuarioId?: string,
    NombreUsuario?: string,
    CorreoUsuario?: string,
    ContrasenaUsuario?: string,
    Rol?: string
  ) {
  let nuevaUsuario = {
    UsuarioId:UsuarioId
    ,NombreUsuario: NombreUsuario
    ,CorreoUsuario: CorreoUsuario 
    ,ContrasenaUsuario: ContrasenaUsuario 
    ,Rol:Rol 

  };
  this.Usuarios.update((Usuarios) => [...Usuarios, nuevaUsuario]);
  };

  public agregarUsuario(event:  Event) {
    let tag = event.target as HTMLInputElement
    let cuerpo = {
      NombreUsuario:  this.nombreUsuario,
      CorreoUsuario: this.correoUsuario,
      ContrasenaUsuario:  this.contrasenaUsuario,
      Rol:  this.rolUsuario,
    }
    this.http.post('http://localhost/usuarios', cuerpo).subscribe(
      () => {
      //this.Usuarios.update((Usuarios) => [...Usuarios, cuerpo]);
    }
  );
  };

public borrarUsuario() {
  this.http.delete('http://localhost/usuarios/' + this.usuarioId).subscribe(() => {
   // this.Usuarios.update(Usuarios) => Usuarios.filter((Usuario) => Usuario.UsuarioId !== this.usuarioId));
  });
};


}
