import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionExactusComponent } from './generacionexactus.component';

describe('GeneracionexactusComponent', () => {
  let component: GeneracionExactusComponent;
  let fixture: ComponentFixture<GeneracionExactusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneracionExactusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneracionExactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
