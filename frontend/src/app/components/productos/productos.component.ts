import { Component } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';


declare var Swal:any
declare var $:any

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [MenulateralComponent, CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  constructor(public peticion: PeticionService){}

  datos:any[] = []
  codigo:string = ""
  nombre:string= ""
  precio: string = ""
  descripcion: string = ""
  imagen:string = ""
  estado: string = "0"
  tipo: string = ""
  IdSeleccionado:string = ""
  random:number = 0
  ngOnInit(): void {
    this.listar()
  }

  Nuevo(){
    $('#formdatos').modal('show')
    this.nombre = ""
    this.codigo = ""
    this.precio = ""
    this.descripcion = ""
    this.imagen = ""
    this.estado = "0"
    this.tipo = ""
    this.IdSeleccionado = ""
  }


  listar(){
    let data = {
      Host: this.peticion.urlHost,
      Path:"/productos/listar",
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
      Path:"/productos/guardar",
      Payload:{
        nombre:this.nombre,
        codigo:this.codigo,
        precio: this.precio,
        imagen:this.imagen,
        descripcion: this.descripcion,
        tipo:this.tipo,
        estado:this.estado
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
        $('#formdatos').modal('hide')
        this.listar()
      }
    })

  }

  EditarId(id:string){
    this.IdSeleccionado = id
    let data = {
      Host: this.peticion.urlHost,
      Path:"/productos/listarId",
      Payload:{
        _id:id
      }
    }


    this.peticion.post(data.Host + data.Path, data.Payload).then((res:any) =>{
      console.log(res)
      $('#formdatos').modal('show')
      this.nombre = res.datos [0].nombre
      this.codigo = res.datos [0].codigo
      this.precio = res.datos [0].precio
      this.descripcion = res.datos [0].descripcion
      this.estado = res.datos [0].estado
    })
  }

  Actualizar(){
    
    let data = {
      Host: this.peticion.urlHost,
      Path:"/productos/Actualizar",
      Payload:{
      nombre:this.nombre,
      codigo:this.codigo,
      precio: this.precio,
      descripcion: this.descripcion,
      imagen: this.imagen,
      estado: this.estado,
      tipo: this.tipo,
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
      Path:"/productos/Eliminar",
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

  selectedFile:File | null = null
  OpenFileSelected(event:any){
    this.selectedFile = event.target.files[0]
    console.log(event)
  }

  onUpload(){
    if(this.selectedFile){
      this.peticion.Upload(this.selectedFile, "/subirProductos/" + this.IdSeleccionado).subscribe((res:any) => {
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
