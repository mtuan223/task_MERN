import { describe, it, expect } from "vitest";
import taskService from "../../src/features/task/taskService";

describe("taskService", () => {
  it("fetches tasks successfully", async () => {
    const result = await taskService.getTasks("mock_token");

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      _id: "1",
      text: "Learn Tailwind",
    });
  });
});
