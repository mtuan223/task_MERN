import { describe, it, expect } from "vitest";
import { store } from "../../src/app/store";

describe("Redux store", () => {
  it("creates the store with correct reducers", () => {
    const state = store.getState();
    expect(state).toHaveProperty("auth");
    expect(state).toHaveProperty("task");
  });

  it("initial state matches slice defaults", () => {
    const state = store.getState();
    expect(state.auth).toMatchObject({
      user: null,
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: "",
    });
    expect(state.task).toMatchObject({
      tasks: [],
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: "",
    });
  });
});
