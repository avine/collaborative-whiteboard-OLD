import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwCutComponent } from './cw-cut.component';

describe('CwCutComponent', () => {
  let component: CwCutComponent;
  let fixture: ComponentFixture<CwCutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwCutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwCutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
