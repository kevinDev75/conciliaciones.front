import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillasImportadasComponent } from './planillasimportadas.component';

describe('PlanillasimportadasComponent', () => {
  let component: PlanillasImportadasComponent;
  let fixture: ComponentFixture<PlanillasImportadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanillasImportadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillasImportadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
