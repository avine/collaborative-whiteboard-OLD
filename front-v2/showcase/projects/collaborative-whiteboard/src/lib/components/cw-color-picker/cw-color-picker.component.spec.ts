import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwColorPickerComponent } from './cw-color-picker.component';

describe('CwColorPickerComponent', () => {
  let component: CwColorPickerComponent;
  let fixture: ComponentFixture<CwColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CwColorPickerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
