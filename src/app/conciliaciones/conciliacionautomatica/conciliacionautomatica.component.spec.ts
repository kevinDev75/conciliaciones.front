import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliacionAutomaticaComponent } from './conciliacionautomatica.component';

describe('ConciliacionautomaticaComponent', () => {
  let component: ConciliacionAutomaticaComponent;
  let fixture: ComponentFixture<ConciliacionAutomaticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConciliacionAutomaticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliacionAutomaticaComponent); 
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});