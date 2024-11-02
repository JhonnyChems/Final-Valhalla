import { Injectable } from '@angular/core';
import { PeticionService } from './peticion.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private peticion:PeticionService) { }

  datoscarrito: any[] = []
  total: number = 0

  ListarCarrito(){
    let data = {
      Host: this.peticion.urlHost,
      Path:"/carrito/listar",
      Payload:{
        
      }
    }


    this.peticion.post(data.Host + data.Path, data.Payload).then((res:any) =>{
      console.log(res)
      this.datoscarrito = res.datos

      this.total = 0;
      
      for (let a = 0; a < this.datoscarrito.length; a++) {

        this.total = this.total + (this.datoscarrito[a].precio * this.datoscarrito[a].cantidad);
      }
  })
  }
}
