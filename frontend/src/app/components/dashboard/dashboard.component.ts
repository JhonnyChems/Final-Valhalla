import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { FooterComponent } from "../footer/footer.component";
import { PeticionService } from '../../servicios/peticion.service';
declare var Chart:any
declare var document:any


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenulateralComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor (private peticion:PeticionService) {}

  ngOnInit(): void {
    this.grafico1()
    this.grafico2()
  }


  grafico1(){


      let data = {
        Host: this.peticion.urlHost,
        Path:"/usuarios/listar",
        Payload:{
        }
      }
  
  
      this.peticion.post(data.Host + data.Path, data.Payload).then((res:any) =>{
        
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', 
      data: {
        labels: ['Usuarios','ventas'], 
        datasets: [{
          label: 'Inicios de Sesion Web', 
          data: [res.datos.length, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
  
          ], 
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
  
          ],
          borderWidth: 1 
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true 
          }
        }
      }
    });
      })


    
  
}

grafico2(){
  const ctx = document.getElementById('myChart2') as HTMLCanvasElement;
  const config = {
    type: 'polarArea',
    data: {
      labels:['usuarios', 'ventas', 'news'],
      datasets:[{
        label: 'Inicios de sesion web',
        data: [100,200,500]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Polar Area Chart'
        }
      }
    },
  };
  new Chart(ctx, config)
}




}
