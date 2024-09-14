import {
  getFullYear,
  getFooterCopy,
  initializeCarouselState,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleMouseLeave,
} from "./utils";

describe("Get full year", function () {
  it("should return the correct year", function () {
    const currentYear = new Date().getFullYear();
    expect(getFullYear()).toBe(currentYear);
  });
});

describe("Get footer message", function () {
  const trueMessage = "VocaFlip main dashboard";
  const falseMessage = "VocaFlip";

  it("should return the true footer message", function () {
    const currentMessage = getFooterCopy(true);
    expect(currentMessage).toBe(trueMessage);
  });

  it("should return the false footer message", function () {
    const currentMessage = getFooterCopy(false);
    expect(currentMessage).toBe(falseMessage);
  });
});

// Tests for carousel utility functions
describe("Carousel Utilities", () => {
  let setIsDragging, setStartX, setScrollLeft, index;

  beforeEach(() => {
    setIsDragging = jest.fn();
    setStartX = jest.fn();
    setScrollLeft = jest.fn();
    index = Math.floor(Math.random() * 10); // Use a random index for testing
  });

  describe("initializeCarouselState", () => {
    it("should initialize carousel state for given index", () => {
      // Simulate the previous state
      setIsDragging.mockImplementation((cb) => cb(new Array(10).fill(false)));
      setStartX.mockImplementation((cb) => cb(new Array(10).fill(0)));
      setScrollLeft.mockImplementation((cb) => cb(new Array(10).fill(0)));

      initializeCarouselState(setIsDragging, setStartX, setScrollLeft, index);

      expect(setIsDragging).toHaveBeenCalled();
      expect(setStartX).toHaveBeenCalled();
      expect(setScrollLeft).toHaveBeenCalled();
    });
  });

  describe("handleMouseDown", () => {
    it("should set dragging state and initialize start position", () => {
      const e = { pageX: 100 };
      const carouselRefs = {
        current: [
          { offsetLeft: 50, scrollLeft: 0 },
        ],
      };

      handleMouseDown(e, index, carouselRefs, setIsDragging, setStartX, setScrollLeft, initializeCarouselState);

      expect(setIsDragging).toHaveBeenCalled();
      expect(setStartX).toHaveBeenCalledWith(expect.any(Function));
      expect(setScrollLeft).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe("handleMouseMove", () => {
    it("should scroll carousel if dragging is active", () => {
      const e = { pageX: 150 };
      const isDragging = Array(10).fill(false);
      isDragging[index] = true; // Set dragging active for the random index
      const startX = Array(10).fill(0);
      startX[index] = 100;
      const carouselRefs = {
        current: [
          { offsetLeft: 50, scrollLeft: 0 },
        ],
      };
      const scrollLeft = Array(10).fill(0);

      handleMouseMove(e, index, isDragging, startX, carouselRefs, scrollLeft);

      // Ensure scrollLeft is modified; however, we can't check DOM directly.
      expect(carouselRefs.current[index].scrollLeft).toBeLessThan(0); // since walk would be positive
    });

    it("should not scroll if dragging is not active", () => {
      const e = { pageX: 150 };
      const isDragging = Array(10).fill(false); // dragging is inactive
      const startX = Array(10).fill(0);
      const carouselRefs = {
        current: [
          { offsetLeft: 50, scrollLeft: 0 },
        ],
      };
      const scrollLeft = Array(10).fill(0);

      handleMouseMove(e, index, isDragging, startX, carouselRefs, scrollLeft);

      expect(carouselRefs.current[index].scrollLeft).toBe(0); // no change
    });
  });

  describe("handleMouseUp", () => {
    it("should set dragging state to false", () => {
      handleMouseUp(setIsDragging, index);
      expect(setIsDragging).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe("handleMouseLeave", () => {
    it("should set dragging state to false", () => {
      handleMouseLeave(setIsDragging, index);
      expect(setIsDragging).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
