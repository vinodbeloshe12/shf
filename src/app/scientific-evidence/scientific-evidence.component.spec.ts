import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificEvidenceComponent } from './scientific-evidence.component';

describe('ScientificEvidenceComponent', () => {
  let component: ScientificEvidenceComponent;
  let fixture: ComponentFixture<ScientificEvidenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScientificEvidenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientificEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
