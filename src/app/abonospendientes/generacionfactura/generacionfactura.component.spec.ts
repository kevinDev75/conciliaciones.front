import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneracionFacturaComponent } from './generacionfactura.component';

describe('GeneracionFacturaComponent', () => {
  let component: GeneracionFacturaComponent;
  let fixture: ComponentFixture<GeneracionFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneracionFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneracionFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
