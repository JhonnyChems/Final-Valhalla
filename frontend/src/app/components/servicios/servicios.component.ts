import { Component } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';


declare var Swal:any
declare var $:any

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [MenulateralComponent, CommonModule, FormsModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  constructor(private peticion: PeticionService){}

  datos:any[] = []
  nombre:string = ""
  codigo:string=""
  IdSeleccionado:string = ""

  ngOnInit(): void {
    this.listar()
  }

  Nuevo(){
    $('#formdatos').modal('show')
    this.nombre = ""
    this.codigo = ""
    this.IdSeleccionado = ""
  }


  listar(){
    let data = {
      Host: this.peticion.urlHost,
      Path:"/servicios/listar",
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
      Path:"/servicios/guardar",
      Payload:{
        nombre:this.nombre,
        codigo:this.codigo,
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
      Path:"/servicios/listarId",
      Payload:{
        _id:id
      }
    }


    this.peticion.post(data.Host + data.Path, data.Payload).then((res:any) =>{
      console.log(res)
      $('#formdatos').modal('show')
      this.nombre = res.datos [0].nombre
      this.codigo = res.datos [0].codigo
    })
  }

  Actualizar(){
    
    let data = {
      Host: this.peticion.urlHost,
      Path:"/servicios/Actualizar",
      Payload:{
      nombre:this.nombre,
      codigo:this.codigo,
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
      Path:"/servicios/Eliminar",
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

