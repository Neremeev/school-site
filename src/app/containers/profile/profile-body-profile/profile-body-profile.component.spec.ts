import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBodyProfileComponent } from './profile-body-profile.component';

describe('ProfileBodyProfileComponent', () => {
  let component: ProfileBodyProfileComponent;
  let fixture: ComponentFixture<ProfileBodyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBodyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBodyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
