import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentoAbonoComponent } from './documentoabono.component';

describe('DocumentoAbonoComponent', () => {
  let component: DocumentoAbonoComponent;
  let fixture: ComponentFixture<DocumentoAbonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoAbonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
