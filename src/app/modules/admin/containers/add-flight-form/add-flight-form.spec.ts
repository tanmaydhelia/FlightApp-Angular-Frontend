import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlightForm } from './add-flight-form';

describe('AddFlightForm', () => {
  let component: AddFlightForm;
  let fixture: ComponentFixture<AddFlightForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFlightForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFlightForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
