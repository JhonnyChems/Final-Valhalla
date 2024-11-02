import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../servicios/carrito.service';


declare var Swal:any

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  constructor(public peticion: PeticionService, private router:Router, public carrito: CarritoService){}
  datos:any[] = []
  ngOnInit(): void {
    this.status();
    this.listarProductos();
  }

  nombre: string = "Cargando..."
  rol: string = "Cargando..."
  ultimologin: string = "1900/01/01"
  random:number = 0
  _id:string = ""
  tipo:string = "0"

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
      if(res.nombre != undefined){
        this.carrito.ListarCarrito()
      }

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

  listarProductos(){
    let data = {
      Host: this.peticion.urlHost,
      Path:"/productos/listarProductosActivos",
      Payload:{
      }
    }


    this.peticion.post(data.Host + data.Path, data.Payload).then((res:any) =>{
      console.log(res)
      this.datos = res.datos
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

  Menu(){
    document.addEventListener('DOMContentLoaded', function(): void {
      const dropdownBtn = document.querySelector('.dropbtn') as HTMLElement;
      const dropdown = document.querySelector('.dropdown') as HTMLElement;
  
      dropdownBtn.addEventListener('click', function(): void {
          dropdown.classList.toggle('show');
      });
  
      // Cerrar el menú si se hace clic fuera de él
      window.addEventListener('click', function(event: MouseEvent): void {
          if (!event.target || !(event.target as HTMLElement).matches('.dropbtn')) {
              if (dropdown.classList.contains('show')) {
                  dropdown.classList.remove('show');
              }
          }
      });
  });
  }

  Agregar(item:any){

    let data = {
      Host: this.peticion.urlHost,
      Path:"/carrito/guardar",
      Payload:{
        nombre: item.nombre,
        cantidad:1,
        _idProducto: item._id,
        precio: item.precio
      }
    }


    this.peticion.post(data.Host + data.Path, data.Payload).then((res:any) =>{
      console.log(res)
      this.carrito.ListarCarrito()
      if(res.state == true){
        Swal.fire({
          icon: "success",
          text: res.mensaje,
          title: "Que bien",
        });
      }
      else{
        Swal.fire({
          icon: "error",
          text: res.mensaje,
          title: "Ouch!",
        });
      }
    })

  }

}
