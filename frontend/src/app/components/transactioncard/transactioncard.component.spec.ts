import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactioncardComponent } from './transactioncard.component';

describe('TransactioncardComponent', () => {
  let component: TransactioncardComponent;
  let fixture: ComponentFixture<TransactioncardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactioncardComponent]
    });
    fixture = TestBed.createComponent(TransactioncardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
