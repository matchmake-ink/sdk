import { User } from "../src/index";
import { describe, it, expect, vi } from "vitest";

vi.mock("../src/auth", () => ({
  signIn: vi.fn(() => Promise.resolve({ uid: "1235778889" })),
}));

describe("User", () => {
  const user = new User();
  it("should get the uid after signing in", async () => {
    await user.signIn("awesomeuser@gmail.com", "12345678");

    expect(user.authStatus).toEqual(0);
    expect(user.uid).not.toEqual("");
  });
});
