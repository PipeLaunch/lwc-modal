import * as utils from "../lwcModalUtils";

describe("isColor", () => {
  test("valid hex", () => {
    expect(utils.isColor("#000")).toBe(true);
  });
});

describe("normalizeBoolean", () => {
  test("1", () => {
    expect(utils.normalizeBoolean(1)).toBe(true);
  });
});
