import { Component } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenulateralComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
