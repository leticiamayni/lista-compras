import { Component } from '@angular/core';
import { Item } from '../../item';
import { Guid } from 'guid-typescript';
import { ItensFormComponent } from "../itens-form/itens-form.component";
import { ItensListComponent } from "../itens-list/itens-list.component";

@Component({
  selector: 'app-itens',
  standalone: true,
  imports: [ItensFormComponent, ItensListComponent],
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.css'
})
export class ItensComponent {
  //array
  itens: Item[] = [];
  editItem: string | null = null;

  ngOnInit(): void {
    this.exibirItem();
  }

  cadastrarItem(item : Item): void {
    if (this.editItem) {
      const indice: number = this.itens.findIndex(i => i.itemId === this.editItem);
      if (indice !== -1) {
        this.itens[indice] = item;
        this.itens = [...this.itens];
      }
      this.editItem = null;
    } else {
      item.itemId = Guid.create().toString();
      // this.itens.push(item);
      this.itens = [...this.itens, item];
    }
    localStorage.setItem('DB', JSON.stringify(this.itens));
  }

  exibirItem(): void {
    this.itens = JSON.parse(localStorage.getItem('DB') ?? '[]') || [];
  }

  atualizarItem(itemId: string): void {
    const indice: number = this.itens.findIndex(i => i.itemId === itemId);
    if (indice !== -1) {
      this.itens[indice].isComprado = !this.itens[indice].isComprado;
      localStorage.setItem('DB', JSON.stringify(this.itens));
    } else {
      console.warn(`Item com ID ${itemId} não encontrado.`);
    }
  }

  deletarItem(itemId: string): void {
    this.itens = this.itens.filter(i => i.itemId !== itemId);
    localStorage.setItem('DB', JSON.stringify(this.itens));
  }

  editarItem(itemId: string): void {
    const item = this.itens.find(i => i.itemId === itemId);
    if (item) {
      this.editItem = item.itemId;
    }
  }

  // Getter para retornar o item a ser editado
  get itemToEdit(): Item | null {
    return this.itens.find(i => i.itemId === this.editItem) ?? null;
  }
}