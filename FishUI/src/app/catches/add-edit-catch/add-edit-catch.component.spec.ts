import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCatchComponent } from './add-edit-catch.component';

describe('AddEditCatchComponent', () => {
  let component: AddEditCatchComponent;
  let fixture: ComponentFixture<AddEditCatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
