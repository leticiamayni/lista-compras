import { Component } from '@angular/core';
import { Item } from '../../item';
import { Guid } from 'guid-typescript';
import { ItensFormComponent } from "../itens-form/itens-form.component";
import { ItensListComponent } from "../itens-list/itens-list.component";
import { ItensCompradosListComponent } from "../itens-comprados-list/itens-comprados-list.component";

@Component({
  selector: 'app-itens',
  standalone: true,
  imports: [ItensFormComponent, ItensListComponent, ItensCompradosListComponent],
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.css'
})
export class ItensComponent {
  //array
  itens: Item[] = [];
  itensComprados: Item[] = [];
  editItem: string | null = null;
  checkedItens: Set<string> = new Set();

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
      item.isComprado = false; //padrão
      // this.itens.push(item);
      this.itens = [...this.itens, item];
    }
    localStorage.setItem('DB', JSON.stringify(this.itens));
  }

  exibirItem(): void {
    this.itens = JSON.parse(localStorage.getItem('DB') ?? '[]') || [];
    this.itensComprados = JSON.parse(localStorage.getItem('DB_Comprados') ?? '[]') || [];
  }

  atualizarItem(itemId: string): void {
    const indiceComprado: number = this.itensComprados.findIndex(i => i.itemId === itemId);
    const indiceNaoComprado: number = this.itens.findIndex(i => i.itemId === itemId);
    if (indiceComprado !== -1) {
      // Itens comprados
      const itemComprado = this.itensComprados[indiceComprado];

      if (this.checkedItens.has(itemId)) {
          this.checkedItens.delete(itemId);
          itemComprado.isComprado = false; 
          this.itens.push({ ...itemComprado }); 
          this.itensComprados.splice(indiceComprado, 1); 
      } else {
        this.checkedItens.add(itemId);
      } 
    } else if (indiceNaoComprado !== -1) {
        const itemNaoComprado = this.itens[indiceNaoComprado];

        if (!this.checkedItens.has(itemId)) {
            this.checkedItens.add(itemId);
            itemNaoComprado.isComprado = true;
            this.itensComprados.push({ ...itemNaoComprado });
            this.itens.splice(indiceNaoComprado, 1);
        }
      } else {
        console.warn(`Item com ID ${itemId} não encontrado.`);
    }

      localStorage.setItem('DB', JSON.stringify(this.itens));
      localStorage.setItem('DB_Comprados', JSON.stringify(this.itensComprados)); //novo

      this.itens = [...this.itens];
      this.itensComprados = [...this.itensComprados];
  }

  deletarItem(itemId: string): void {
    this.itens = this.itens.filter(i => i.itemId !== itemId);
    localStorage.setItem('DB', JSON.stringify(this.itens));
    
    this.itensComprados = this.itensComprados.filter(i => i.itemId !== itemId);
    localStorage.setItem('DB_Comprados', JSON.stringify(this.itensComprados));
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

  getItensNaoComprados(): Item[] {
    return this.itens.filter(item => !item.isComprado);
  }

  getItensComprados(): Item[] {
    return this.itens.filter(item => item.isComprado);
  }
}