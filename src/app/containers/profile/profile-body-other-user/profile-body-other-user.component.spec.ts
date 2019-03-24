import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBodyOtherUserComponent } from './profile-body-other-user.component';

describe('ProfileBodyOtherUserComponent', () => {
  let component: ProfileBodyOtherUserComponent;
  let fixture: ComponentFixture<ProfileBodyOtherUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBodyOtherUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBodyOtherUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
