import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';

declare var Swal:any

@Component({
  selector: 'app-recuperarpass',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recuperarpass.component.html',
  styleUrl: './recuperarpass.component.css'
})
export class RecuperarpassComponent {
  constructor(private peticion: PeticionService, private router:Router){}
  email: string = ""
  password: string = ""
  confirmar: string = ""
  codigo: string = ""

  recuperar(){
    let data = {
      Host: this.peticion.urlHost,
      Path:"/usuarios/recuperarpass",
      Payload:{
        email:this.email,
        password:this.password,
        codigo: this.codigo,
      }
    }


    this.peticion.post(data.Host + data.Path, data.Payload).then((res:any) =>{
      console.log(res)
        if(res.state == false){
          Swal.fire({
            icon: "error",
            title: "Ouch",
            text: res.mensaje,
          });
        }
        else{
          this.router.navigate(["login"])
          Swal.fire({
            icon: "success",
            text: res.mensaje,
            title: "Que bien",
          });
        }
    })
  }
}
