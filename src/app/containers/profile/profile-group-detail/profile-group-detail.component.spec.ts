import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGroupDetailComponent } from './profile-group-detail.component';

describe('ProfileGroupDetailComponent', () => {
  let component: ProfileGroupDetailComponent;
  let fixture: ComponentFixture<ProfileGroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileGroupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
