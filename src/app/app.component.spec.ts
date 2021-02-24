import {
  waitForAsync,
  fakeAsync,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  tick,
} from "@angular/core/testing";
import { Component, Input } from "@angular/core";

@Component({
  selector: `inner`,
  template: ``,
})
class InnerComponent {
  @Input() myInput: string;

  ngOnChanges() {
    throw "Some unhandled exception";
  }
}

@Component({
  template: `<inner [myInput]="someVar"></inner>`,
})
class TestHostComponent {
  someVar = null;
}

fdescribe("Some test", () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        InnerComponent,
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
    }).compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.autoDetectChanges();
  }));

  it("does stuff", fakeAsync(() => {
    tick();
  }));
});
