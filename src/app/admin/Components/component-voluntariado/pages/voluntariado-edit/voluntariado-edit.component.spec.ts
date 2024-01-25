import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntariadoEditComponent } from './voluntariado-edit.component';

describe('VoluntariadoEditComponent', () => {
  let component: VoluntariadoEditComponent;
  let fixture: ComponentFixture<VoluntariadoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoluntariadoEditComponent]
    });
    fixture = TestBed.createComponent(VoluntariadoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
