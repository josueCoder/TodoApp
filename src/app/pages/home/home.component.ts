import { Component, computed, signal,effect, Injector,inject } from '@angular/core';

import { Tack } from '../../model/tack.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tacks = signal<Tack[]>([]);
  injector=inject(Injector);


  ngOnInit(){
    const storageTacks = localStorage.getItem('tacks');
    if(storageTacks){
      this.tacks.set(JSON.parse(storageTacks));
    }
    this.trackTacks();
  }

  trackTacks(){
    effect(()=>{
      const tacks = this.tacks();
      localStorage.setItem('tacks', JSON.stringify(tacks));
    },{injector: this.injector});
  }



  tacksControl = new FormControl('',
    {
      nonNullable: true,
      validators:
        [
          Validators.required
        ]
    }
  )


  filter = signal<'all'|'pending'|'completed'>('all');
  tacksByFilter = computed(()=>{
    const filter = this.filter();
    const tacks = this.tacks();
    if(filter  === 'pending'){
      return tacks.filter(tack => !tack.completed)
    }
    if(filter  === 'completed'){
      return tacks.filter(tack => tack.completed)
    }
    return tacks;
  })


 



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

  changeFilter(filter : 'all'|'pending'|'completed'){
    this.filter.set(filter);

  }


}
