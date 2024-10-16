import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../servicios/peticion.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  datos:any[] = []
  constructor(private peticion: PeticionService){}
  ngOnInit(): void {
    this.listarProductos()
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
}
