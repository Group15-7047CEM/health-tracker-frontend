import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthProfileComponent } from './health-profile.component';

describe('HealthProfileComponent', () => {
  let component: HealthProfileComponent;
  let fixture: ComponentFixture<HealthProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
