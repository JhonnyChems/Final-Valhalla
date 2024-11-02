import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import { CarritoService } from '../../servicios/carrito.service';
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';

declare var Swal: any
declare var $:any


@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{


  constructor(public peticion: PeticionService, public carrito:CarritoService, private router:Router){}

  cantidad: string = ""
  id: string = ""
  
  datos:any[] = []
  ngOnInit(): void {
    this.carrito.ListarCarrito();
    this.status();
  }

  nombre: string = "cargando"
  rol: string = "Cargando..."
  _id:string = ""
  random:number = 0


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

  AbrirModal(cantidad:string, id:string,){
    this.cantidad = cantidad
    this.id = id
    $('#editProducto').modal('show')
  }

  Actualizar(){
      let data = {
        Host: this.peticion.urlHost,
        Path:"/carrito/actualizar",
        Payload:{
          cantidad: this.cantidad,
          _id:this.id,
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
            Swal.fire({
              icon: "success",
              title: "Que bien",
              text: res.mensaje,
            });
            $('#editProducto').modal('hide')
            this.carrito.ListarCarrito();
          }
          })
  }

  Eliminar(){
    let data = {
      Host: this.peticion.urlHost,
      Path:"/carrito/eliminar",
      Payload:{
        _id:this.id,
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
          Swal.fire({
            icon: "success",
            title: "Que bien",
            text: res.mensaje,
          });
          $('#editProducto').modal('hide')
          this.carrito.ListarCarrito();
        }
        })
  }

}
