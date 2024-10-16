import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';

declare var Swal:any

@Component({
  selector: 'app-menulateral',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './menulateral.component.html',
  styleUrl: './menulateral.component.css'
})
export class MenulateralComponent {
  constructor(public peticion: PeticionService, private router:Router){}

  ngOnInit(): void {
    this.status()
  }

  nombre: string = "Cargando..."
  rol: string = "Cargando..."
  ultimologin: string = "1900/01/01"
  random:number = 0
  _id:string = ""

  status(){
    let data = {
      Host: this.peticion.urlHost,
      Path:"/status",
      Payload:{
      }
    }


    this.peticion.post(data.Host + data.Path, data.Payload).then((res:any) =>{
      console.log(res)
      if(res.nombre == undefined || res.nombre == null){
        this.router.navigate(['login'])
      }
      this.nombre = res.nombre
      this.ultimologin = res.ultimologin
      this._id = res._id
      switch(res.rol){
        case "1":
          this.rol = "Administrador"
          break;
          case "2":
            this.rol = "Facturador"
              break;
              case "3":
              this.rol = "Cliente"
              break;

            default:
              break;
      }
  })
  }

  logout(){
    let data = {
      Host: this.peticion.urlHost,
      Path:"/logout",
      Payload:{
        
      }
    }


    this.peticion.post(data.Host + data.Path, data.Payload).then((res:any) =>{
      console.log(res)
      if(res.state == true){
      Swal.fire({
        icon: "success",
        title: "Que bien",
        text: res.mensaje,
      });
      this.router.navigate(['login'])
    }
  })
  }

  selectedFile:File | null = null
  OpenFileSelected(event:any){
    this.selectedFile = event.target.files[0]
    console.log(event)
    this.onUpload()
  }

  onUpload(){
    if(this.selectedFile){
      this.peticion.Upload(this.selectedFile, "/subirAvatar/" + this._id).subscribe((res:any) => {
        console.log(res)

          
        this.random = Math.random() * (9999 - 0) + 0;
        
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
            title: "Que bien",
            text: res.mensaje,
          });
        }
      })
    }
  }

}
