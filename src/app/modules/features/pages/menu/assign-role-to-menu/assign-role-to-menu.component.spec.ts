import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRoleToMenuComponent } from './assign-role-to-menu.component';

describe('AssignRoleToMenuComponent', () => {
  let component: AssignRoleToMenuComponent;
  let fixture: ComponentFixture<AssignRoleToMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignRoleToMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignRoleToMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
