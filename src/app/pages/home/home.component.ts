import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tack } from '../../model/tack.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: 
  [
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tacks = signal<Tack[]>([
    {
      id : Date.now(),
      title : 'Instalar el CLI de angular',
      completed: false
    },
    {
      id : Date.now(),
      title : 'Crear el proyecto',
      completed: false
    },
    {
      id : Date.now(),
      title : 'Levantar el servicio',
      completed: false
    }
  ])

  changeHandler(event : Event){
    const input = event.target as HTMLInputElement;
    const newTack = input.value;
    this.addTack(newTack);
  }

  addTack(title: string){
    const newTack = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tacks.update((tacks)=>[...tacks, newTack])
  }

  deleteTack(index : number){
    this.tacks.update((tacks)=>tacks.filter((tacks,position)=>position != index))
  }

  onUpdateTack(index : number){
    this.tacks.update((tacks)=>{
      return tacks.map((tack,position)=>{
        if(position === index){
          return {
            ...tack,
            completed : !tack.completed
          }
        }
        return tack
      })
    })

  }




}
