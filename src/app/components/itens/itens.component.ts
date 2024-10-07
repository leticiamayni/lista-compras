import { Component } from '@angular/core';
import { Item } from '../../item';
import { Guid } from 'guid-typescript';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-itens',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.css'
})
export class ItensComponent {
  //icon
  faCheckCircle = faCheckCircle;

  //array
  itens: Item[] = [];
  form: any;

  //onInit
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = new FormGroup({
      itemId: new FormControl(),
      nome: new FormControl(),
      quantidade: new FormControl(),
      isComprado: new FormControl()
    });
  }
}
