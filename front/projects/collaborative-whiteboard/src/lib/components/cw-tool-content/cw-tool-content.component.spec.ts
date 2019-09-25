import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwToolContentComponent } from './cw-tool-content.component';

describe('CwToolContentComponent', () => {
  let component: CwToolContentComponent;
  let fixture: ComponentFixture<CwToolContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CwToolContentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwToolContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
