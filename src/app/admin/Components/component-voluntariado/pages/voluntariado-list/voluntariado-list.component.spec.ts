import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntariadoListComponent } from './voluntariado-list.component';

describe('VoluntariadoListComponent', () => {
  let component: VoluntariadoListComponent;
  let fixture: ComponentFixture<VoluntariadoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoluntariadoListComponent]
    });
    fixture = TestBed.createComponent(VoluntariadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
