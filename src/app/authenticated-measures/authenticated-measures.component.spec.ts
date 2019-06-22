import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedMeasuresComponent } from './authenticated-measures.component';

describe('AuthenticatedMeasuresComponent', () => {
  let component: AuthenticatedMeasuresComponent;
  let fixture: ComponentFixture<AuthenticatedMeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticatedMeasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
