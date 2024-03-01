import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should emit confirmDelete event when submitForm is called', () => {
    let eventEmitted = true;
    component.confirmDelete.subscribe((value: boolean) => {
      eventEmitted = value;
    });
    component.submitForm();
    expect(eventEmitted).toBeTrue();
  });
});
