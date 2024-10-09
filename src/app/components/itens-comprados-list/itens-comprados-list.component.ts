import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Item } from '../../item';

@Component({
  selector: 'app-itens-comprados-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule],
  templateUrl: './itens-comprados-list.component.html',
  styleUrl: './itens-comprados-list.component.css'
})

export class ItensCompradosListComponent {
  @Input() itensComprados: Item[] = []; // itens comprados
  @Input() checkedItens: Set<string> = new Set();
  @Output() itemDeleted = new EventEmitter<string>();
  @Output() itemUpdated = new EventEmitter<string>();

  updateItem(itemId: string) {
    this.itemUpdated.emit(itemId);
  }

  deleteItem(itemId: string) {
    this.itemDeleted.emit(itemId);
  }
}
