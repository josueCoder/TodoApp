import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: 
  [
    CommonModule
  ],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = 'Hello TodoApp';
  tacks =[
    'Instalar el CLI de angular',
    'Crear el proyecto',
    'Levantar el servicio'
  ]
}
