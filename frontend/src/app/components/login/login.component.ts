import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';

declare var Swal:any

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private peticion: PeticionService, private router:Router){}
  email: any = ""
  password: string = ""
  rol: string = ""
  recordar: boolean = true


  ngOnInit(): void {
    this.recordar = localStorage.getItem("recordar") == "true" ? true : false

    if(this.recordar == true){
      this.email = localStorage.getItem("email")?.toString()
    }
  }

  login(){
    let data = {
      Host: this.peticion.urlHost,
      Path:"/usuarios/login",
      Payload:{
        email:this.email,
        password:this.password,
        rol:this.rol
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
          localStorage.setItem("recordar", this.recordar.toString())
          if(this.recordar == true){
            localStorage.setItem("email", this.email)
          }
          else{
            localStorage.setItem("email", "")
          }

          if(res.rol == "1" || res.rol == "2"){
            this.router.navigate(["dashboard"])
          Swal.fire({
            icon: "success",
            text: res.mensaje,
            title: "Que bien",
          });
          }
          else{
            this.router.navigate(["inicio"])
          Swal.fire({
            icon: "success",
            text: res.mensaje,
            title: "Que bien",
          });
          }
        }
    })
  }

}
