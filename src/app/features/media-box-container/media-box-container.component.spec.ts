import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaBoxContainerComponent } from './media-box-container.component';

describe('MediaBoxContainerComponent', () => {
  let component: MediaBoxContainerComponent;
  let fixture: ComponentFixture<MediaBoxContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaBoxContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaBoxContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
