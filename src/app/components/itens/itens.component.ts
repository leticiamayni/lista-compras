import { Component } from '@angular/core';
import { Item } from '../../item';
import { Guid } from 'guid-typescript';
import { faCheckCircle, faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-itens',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.css'
})
export class ItensComponent {
  //icons
  faCheckCircle = faCheckCircle;
  faTimes = faTimes;
  faPen = faPen;

  //array
  itens: Item[] = [];
  form: any;
  editItem: string | null = null;

  //onInit
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.exibirItem();
    this.form = new FormGroup({
      itemId: new FormControl(),
      nome: new FormControl(),
      quantidade: new FormControl(),
      isComprado: new FormControl()
    });
  }

  cadastrarItem(): void {

    if(this.editItem) {
      const indice: number = this.itens.findIndex(i => i.itemId === this.editItem);
      if(indice !== -1) {
        this.itens[indice] = { ...this.form.value };
      }
      this.editItem = null;
    } else {
      this.form.value.itemId = Guid.create().toString();
      this.form.value.isComprado = false;
      const item : Item = this.form.value;
      this.itens.push(item);
    }
    localStorage.setItem('DB', JSON.stringify(this.itens));
    this.form.reset();
  }

  exibirItem(): void {
    if(localStorage.getItem('DB')){
      this.itens = JSON.parse(localStorage.getItem('DB') ?? '[]'); // Garante que o valor nunca será null
    } else {
      this.itens = [];
    }
  }

  atualizarItem(itemId: string): void {
    const indice : number = this.itens.findIndex(i => i.itemId === itemId);

    if(this.itens[indice].isComprado) {
      this.itens[indice].isComprado = false;
    } else {
      this.itens[indice].isComprado = true;
    }
    localStorage.setItem('DB', JSON.stringify(this.itens));
  }

  deletarItem(itemId: string): void {
    this.itens = this.itens.filter(i => i.itemId !== itemId);
    localStorage.setItem('DB', JSON.stringify(this.itens));
  }

  editarItem(itemId: string): void {
    const item = this.itens.find(i => i.itemId === itemId);

    if(item) {
      this.editItem = item.itemId;
      this.form.patchValue(item);
    }
  }
}