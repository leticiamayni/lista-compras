import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Item } from '../../item';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-itens-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatInputModule,
    MatFormFieldModule, MatButtonModule, MatGridListModule, MatIconModule],
  templateUrl: './itens-form.component.html',
  styleUrl: './itens-form.component.css'
})

export class ItensFormComponent {
 @Input() editItem: string | null = null;
 @Input() itemToEdit: Item | null = null;
 @Output() itemAdded = new EventEmitter<Item>();
 @Output() itemUpdated = new EventEmitter<Item>();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      itemId: new FormControl(),
      nome: new FormControl('', [Validators.required]),
      quantidade: new FormControl('', [Validators.required, Validators.min(1)]),
      isComprado: new FormControl(false)
    });
  }

  submitForm() {
    if (this.form.invalid) { return; }

    const item : Item = { ...this.form.value };
    if (this.itemToEdit) {
      this.itemUpdated.emit(item);
    } else {
      item.itemId = Guid.create().toString();
      this.itemAdded.emit(item);
    }

    this.form.reset();
  }

  ngOnChanges(): void {
    if (this.itemToEdit) {
      this.form.patchValue(this.itemToEdit);
    } else {
      this.form.reset();
    }
  }
}