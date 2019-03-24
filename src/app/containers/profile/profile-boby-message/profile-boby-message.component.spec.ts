import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBobyMessageComponent } from './profile-boby-message.component';

describe('ProfileBobyMessageComponent', () => {
  let component: ProfileBobyMessageComponent;
  let fixture: ComponentFixture<ProfileBobyMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBobyMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBobyMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
