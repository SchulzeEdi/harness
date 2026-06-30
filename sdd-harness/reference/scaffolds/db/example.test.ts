import { describe, it, expect } from "vitest";

// Toda feature nasce com teste de dominio (constitution). Exemplo minimo.
function isAllowedSeats(plan: "free" | "pro", seats: number): boolean {
  const limit = plan === "pro" ? 50 : 3;
  return seats <= limit;
}

describe("isAllowedSeats", () => {
  it("free trava em 3 assentos", () => {
    expect(isAllowedSeats("free", 3)).toBe(true);
    expect(isAllowedSeats("free", 4)).toBe(false);
  });
  it("pro permite ate 50", () => {
    expect(isAllowedSeats("pro", 50)).toBe(true);
  });
});
