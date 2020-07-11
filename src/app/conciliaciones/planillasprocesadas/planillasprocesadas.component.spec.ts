import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanillasProcesadasComponent } from './planillasprocesadas.component';

describe('PlanillasProcesadasComponent', () => {
  let component: PlanillasProcesadasComponent;
  let fixture: ComponentFixture<PlanillasProcesadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanillasProcesadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillasProcesadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});