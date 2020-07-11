import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConciliacionManualComponent } from './conciliacionmanual.component';

describe('ConciliacionManualComponent', () => {
  let component: ConciliacionManualComponent;
  let fixture: ComponentFixture<ConciliacionManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConciliacionManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliacionManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});