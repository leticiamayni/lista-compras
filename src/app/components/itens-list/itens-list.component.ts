import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Item } from '../../item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-itens-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule],
  templateUrl: './itens-list.component.html',
  styleUrl: './itens-list.component.css'
})
export class ItensListComponent {
  @Input() itens: Item[] = [];
  @Output() itemDeleted = new EventEmitter<string>();
  @Output() itemUpdated = new EventEmitter<string>();
  @Output() itemEdited = new EventEmitter<string>();

  updateItem(itemId: string) {
    this.itemUpdated.emit(itemId);
  }

  editItem(itemId: string) {
    this.itemEdited.emit(itemId);
  }

  deleteItem(itemId: string) {
    this.itemDeleted.emit(itemId);
  }
}
