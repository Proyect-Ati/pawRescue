import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntariadoAddComponent } from './voluntariado-add.component';

describe('VoluntariadoAddComponent', () => {
  let component: VoluntariadoAddComponent;
  let fixture: ComponentFixture<VoluntariadoAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoluntariadoAddComponent]
    });
    fixture = TestBed.createComponent(VoluntariadoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
