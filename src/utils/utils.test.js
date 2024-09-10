import { getFullYear, getFooterCopy } from "./utils";

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
