import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';


declare var Swal:any

@Component({
  selector: 'app-solicitar-code',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './solicitar-code.component.html',
  styleUrl: './solicitar-code.component.css'
})
export class SolicitarCodeComponent {
  constructor(private peticion: PeticionService, private router:Router){}
  email: string = ""
  password: string = ""

  solicitar(){
    let data = {
      Host: this.peticion.urlHost,
      Path:"/usuarios/solicitarcodigo",
      Payload:{
        email:this.email,
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
          this.router.navigate(["recuperarpass"])
          Swal.fire({
            icon: "success",
            text: res.mensaje,
            title: "Que bien",
          });
        }
    })
  }


}
