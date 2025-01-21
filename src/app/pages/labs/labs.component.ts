import { Component, signal } from '@angular/core';
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
  tacks =signal([
    'Instalar el CLI de angular',
    'Crear el proyecto',
    'Levantar el servicio'
  ])
  name = signal('Rody Josue')
  age = 28
  address = 'URB. San Martin'

  person ={
    name : 'Rody Josue',
    age: 28,
    avatar: 'https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }


  clickHandler(){
    alert("Hello Angular!!!!!")
  }

  dblClickHandler(event : Event){
    console.log(event);
  }

  changeHandler(event : Event){
    console.log(event.target)
  }

  keydownHandler(event : KeyboardEvent){
    const input = event.target as HTMLInputElement
    console.log(input.value)
  }

  nameHandler(event : KeyboardEvent){
    let input = event.target as HTMLInputElement;
    let newValue= input.value;
    this.name.set(newValue)
  }




}
