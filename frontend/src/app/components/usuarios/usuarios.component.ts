import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';


declare var Swal:any
declare var $:any

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MenulateralComponent, CommonModule, FormsModule,],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{
  constructor(private peticion: PeticionService){}

  datos:any[] = []
  nombre:string = ""
  email:string=""
  password:string=""
  IdSeleccionado:string = ""
  estado:string = "1"
  rol:string = "3"

  ngOnInit(): void {
    this.listar()
  }

  Nuevo(){
    $('#formdatos').modal('show')
    this.nombre = ""
    this.email = ""
    this.password = ""
    this.IdSeleccionado = ""
    this.estado = "1"
    this.rol = "3"
  }


  listar(){
    let data = {
      Host: this.peticion.urlHost,
      Path:"/usuarios/listar",
      Payload:{
      }
    }


    this.peticion.post(data.Host + data.Path, data.Payload).then((res:any) =>{
      console.log(res)
      this.datos = res.datos
    })
  }

  guardar(){
    let data = {
      Host: this.peticion.urlHost,
      Path:"/usuarios/guardar",
      Payload:{
        nombre:this.nombre,
        email:this.email,
        password:this.password,
        estado: this.estado,
        rol: this.rol,
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
        });
        $('#formdatos').modal('hide')
        this.listar()
      }
    })

  }

  EditarId(id:string){
    this.IdSeleccionado = id
    let data = {
      Host: this.peticion.urlHost,
      Path:"/usuarios/listarId",
      Payload:{
        _id:id
      }
    }


    this.peticion.post(data.Host + data.Path, data.Payload).then((res:any) =>{
      console.log(res)
      $('#formdatos').modal('show')
      this.nombre = res.datos [0].nombre
      this.email = res.datos [0].email
      this.estado = res.datos [0].estado
      this.rol = res.datos [0].rol
    })
  }

  Actualizar(){
    
    let data = {
      Host: this.peticion.urlHost,
      Path:"/usuarios/Actualizar",
      Payload:{
      nombre:this.nombre,
      _id:this.IdSeleccionado,
      estado: this.estado,
      rol: this.rol,
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
          title: "Elemento Actualizado",
        });
        $('#formdatos').modal('hide')
        this.listar()
      }
    })
  }

  Eliminar(){
    let data = {
      Host: this.peticion.urlHost,
      Path:"/usuarios/Eliminar",
      Payload:{
        _id:this.IdSeleccionado
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
          title: "Elemento Eliminado",
        });
        $('#formdatos').modal('hide')
        this.listar()
      }
    })

  }
}
