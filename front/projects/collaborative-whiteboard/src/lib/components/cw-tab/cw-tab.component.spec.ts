import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwTabComponent } from './cw-tab.component';

describe('CwTabComponent', () => {
  let component: CwTabComponent;
  let fixture: ComponentFixture<CwTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
