import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponeraTratamientoComponent } from './cuponera-tratamiento.component';

describe('CuponeraTratamientoComponent', () => {
  let component: CuponeraTratamientoComponent;
  let fixture: ComponentFixture<CuponeraTratamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuponeraTratamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponeraTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
