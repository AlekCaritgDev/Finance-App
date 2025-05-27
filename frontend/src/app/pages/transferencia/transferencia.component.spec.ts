import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciasComponent } from './transferencia.component';

describe('TransferenciaComponent', () => {
  let component: TransferenciasComponent;
  let fixture: ComponentFixture<TransferenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
