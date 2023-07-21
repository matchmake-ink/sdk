import { User } from "../src/index";
import { describe, it, expect } from "vitest";

describe("User", () => {
  const user = new User();
  it("should have a signIn method", () => {
    expect(user.signIn).toBeDefined();
  });
});
