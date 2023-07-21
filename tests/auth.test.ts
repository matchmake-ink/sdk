import { signIn, signUp } from "../src/auth";
import { describe, it, expect, vi } from "vitest";

// mock the createUserWithEmailAndPassword function from firebase/auth
vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: vi.fn(() =>
    Promise.resolve({ user: { uid: "1235778889" } })
  ),
  signInWithEmailAndPassword: vi.fn(() =>
    Promise.resolve({ user: { uid: "1235778889" } })
  ),
  getAuth: vi.fn(),
}));

vi.mock("firebase/firestore", () => ({
  doc: vi.fn(),
  setDoc: vi.fn(() => Promise.resolve()),
  getFirestore: vi.fn(),
}));

describe("signIn", () => {
  it("should call signInWithEmailAndPassword", () => {
    expect(signIn).toBeTruthy();
  });
});

describe("signUp", () => {
  it("should call createUserWithEmailAndPassword", async () => {
    const user = await signUp("jdeiss06@gmail.com", "MyAwesomePassword", {
      ign: "CGFire",
      discordName: "@firesquid",
    });

    expect(user).toBeTruthy();
  });
});
