import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBobyGroupsComponent } from './profile-boby-groups.component';

describe('ProfileBobyGroupsComponent', () => {
  let component: ProfileBobyGroupsComponent;
  let fixture: ComponentFixture<ProfileBobyGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBobyGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBobyGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
