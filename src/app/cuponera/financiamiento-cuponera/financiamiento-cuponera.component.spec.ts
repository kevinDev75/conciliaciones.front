import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanciamientoCuponeraComponent } from './financiamiento-cuponera.component';

describe('FinanciamientoCuponeraComponent', () => {
  let component: FinanciamientoCuponeraComponent;
  let fixture: ComponentFixture<FinanciamientoCuponeraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanciamientoCuponeraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanciamientoCuponeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
