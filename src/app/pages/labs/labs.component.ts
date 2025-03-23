import { Component, signal } from '@angular/core';

/*formularios reactivos */
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [
    ReactiveFormsModule
],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = 'Hello TodoApp';

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50,
    {
      nonNullable: true,
    }

  )

  nameCtrl = new FormControl('',
    {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
      ]
    }
  )

  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value)
    })
  }


  tacks = signal([
    'Instalar el CLI de angular',
    'Crear el proyecto',
    'Levantar el servicio'
  ])
  name = signal('Rody Josue')
  age = 28
  address = 'URB. San Martin'

  person = signal({
    name: 'josue',
    age: 28,
    avatar: 'https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  })


  clickHandler() {
    alert("Hello Angular!!!!!")
  }

  dblClickHandler(event: Event) {
    console.log(event);
  }

  changeHandler(event: Event) {
    console.log(event.target)
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement
    console.log(input.value)
  }

  nameHandler(event: KeyboardEvent) {
    let input = event.target as HTMLInputElement;
    let newValue = input.value;
    this.name.set(newValue)
  }

  ageHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newAge = input.value;
    this.person.update((person => {
      return {
        ...person,
        age: parseInt(newAge, 10)
      }
    }))
  }

  nameHandlerFooter(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((person) => {
      return {
        ...person,
        name: newValue
      }
    })
  }



}
