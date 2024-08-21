import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {Payload} from '../../model/payload';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})


export class LogInComponent {

  public Usuario: String = '';
  public Clave: String = '';

  constructor(private http: HttpClient, private router: Router) {
  };


  public autenticar() {
    let cuerpo = {
      CorreoUsuario: this.Usuario,
      ContrasenaUsuario: this.Clave
    };
    localStorage.setItem('Usuario', String(this.Usuario));
    this.http.post('http://localhost/usuarios/autenticar', cuerpo).subscribe((token) => {
      localStorage.setItem('Token', String(token));
      const encabezados = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
      });
      this.http.post('http://localhost/usuarios/validarToken', {}, { headers: encabezados }).subscribe((token) => {
        const datos = token as Payload;
        localStorage.setItem('Rol', String(datos.Rol));
        this.irAProvincias();
      });
    });
  }

  public desautenticar() {
    let cuerpo = {
      CorreoUsuario: this.Usuario
    };
    this.http.post('http://localhost/usuarios/desautenticar', cuerpo).subscribe((token) => {
      localStorage.setItem('Token', "");
      localStorage.setItem('Rol', "");
      localStorage.setItem('Usuario', "");
    });
    this.router.navigate(['']);
  }

  public irAProvincias() {
    this.router.navigate(['']);
  }

}
