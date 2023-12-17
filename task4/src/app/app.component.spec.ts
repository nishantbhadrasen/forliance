import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { of } from "rxjs";
import { ReverseApiService } from "./reverse-api.service";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let reverseApiServiceSpy: jasmine.SpyObj<ReverseApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize the map", () => {
    component.ngOnInit();
    expect(component.map).toBeDefined();
  });

  it("should handle click event on the map", fakeAsync(() => {
    const mockCoordinate = [0, 0];
    const mockResponse = { address: "Mock Address" }; // Replace with your mock response

    component.ngOnInit();
    const clickEvent = new Event("singleclick") as any;
    Object.defineProperty(clickEvent, "coordinate", { value: mockCoordinate });

    component.map.dispatchEvent(clickEvent);

    // Simulate API response
    reverseApiServiceSpy.postData.and.returnValue(of(mockResponse));

    // Ensure that the click event is handled correctly
    tick();
    expect(reverseApiServiceSpy.postData).toHaveBeenCalledWith(mockCoordinate);
    // Add more expectations based on your click event handling logic
  }));
});
