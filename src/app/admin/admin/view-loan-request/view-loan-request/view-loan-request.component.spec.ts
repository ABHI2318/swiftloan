import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoanRequestComponent } from './view-loan-request.component';

describe('ViewLoanRequestComponent', () => {
  let component: ViewLoanRequestComponent;
  let fixture: ComponentFixture<ViewLoanRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLoanRequestComponent]
    });
    fixture = TestBed.createComponent(ViewLoanRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
