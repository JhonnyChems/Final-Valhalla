import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';


declare var Swal: any

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  constructor(private peticion: PeticionService){}

  nombre: string = ""
  email: string = ""
  password: string = ""

    Registrar(){
      let data = {
        Host: this.peticion.urlHost,
        Path:"/usuarios/registro",
        Payload:{
          nombre:this.nombre,
          email:this.email,
          password:this.password
        }
      }

      this.peticion.post(data.Host + data.Path, data.Payload).then((res:any) => {
        console.log(res)
        if(res.state == false){
          Swal.fire({
            icon: "error",
            title: "Ouch",
            text: res.mensaje,
          });
        }
        else{
          Swal.fire({
            icon: "success",
            title: "Usuario registrado, por favor verifica tu correo electronico para Activar tu cuenta",
          });
        }
      })
  }


}
