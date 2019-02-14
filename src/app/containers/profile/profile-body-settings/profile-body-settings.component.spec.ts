import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBodySettingsComponent } from './profile-body-settings.component';

describe('ProfileBodySettingsComponent', () => {
  let component: ProfileBodySettingsComponent;
  let fixture: ComponentFixture<ProfileBodySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBodySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBodySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
