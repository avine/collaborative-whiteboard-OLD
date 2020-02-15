import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwToolComponent } from './cw-tool.component';

describe('CwToolComponent', () => {
  let component: CwToolComponent;
  let fixture: ComponentFixture<CwToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CwToolComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
