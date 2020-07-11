import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConciliaionesPendientesComponent } from './conciliacionespendientes.component';

describe('ConciliaionesPendientesComponent', () => {
  let component: ConciliaionesPendientesComponent;
  let fixture: ComponentFixture<ConciliaionesPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConciliaionesPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliaionesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
