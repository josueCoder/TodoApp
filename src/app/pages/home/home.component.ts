import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tack } from '../../model/tack.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:
    [
      CommonModule,
      ReactiveFormsModule,
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  tacksControl = new FormControl('',
    {
      nonNullable: true,
      validators:
        [
          Validators.required
        ]
    }
  )

  tacks = signal<Tack[]>([
    {
      id: Date.now(),
      title: 'Instalar el CLI de angular',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear el proyecto',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Levantar el servicio',
      completed: false
    }
  ])

  changeHandler() {
    if (this.tacksControl.valid && this.tacksControl.value.trim() != '') {
      const newTack = this.tacksControl.value;
      this.addTack(newTack);
      this.tacksControl.setValue('');
    }

  }

  addTack(title: string) {
    const newTack = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tacks.update((tacks) => [...tacks, newTack])
  }

  deleteTack(index: number) {
    this.tacks.update((tacks) => tacks.filter((tacks, position) => position != index))
  }

  onUpdateTack(index: number) {
    this.tacks.update((tacks) => {
      return tacks.map((tack, position) => {
        if (position === index) {
          return {
            ...tack,
            completed: !tack.completed
          }
        }
        return tack
      })
    })

  }

  updateTackEditingMode(index: number) {
    this.tacks.update((prevState) => {
      return prevState.map((tack, position) => {
        if (position == index) {
          return {
            ...tack,
            editing: true
          }
        }
        return {
          ...tack,
          editing:false
        };
      })
    })
  }


  updateTackText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tacks.update((prevState) => {
      return prevState.map((tack, position) => {
        if (position == index) {
          return {
            ...tack,
            title : input.value,
            editing: false,
          }
        }
        return tack
      })
    })
  }




}
