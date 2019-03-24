import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBobyMessageDetailComponent } from './profile-boby-message-detail.component';

describe('ProfileBobyMessageDetailComponent', () => {
  let component: ProfileBobyMessageDetailComponent;
  let fixture: ComponentFixture<ProfileBobyMessageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBobyMessageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBobyMessageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
