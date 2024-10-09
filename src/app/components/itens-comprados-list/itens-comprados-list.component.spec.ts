import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensCompradosListComponent } from './itens-comprados-list.component';

describe('ItensCompradosListComponent', () => {
  let component: ItensCompradosListComponent;
  let fixture: ComponentFixture<ItensCompradosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItensCompradosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItensCompradosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
