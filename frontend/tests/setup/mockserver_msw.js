import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const server = setupServer(
  http.get("http://localhost:3000/api/tasks/", () => {
    return HttpResponse.json([
      {
        _id: "1",
        text: "Learn Tailwind",
      },
      { _id: "2", text: "Learn Redux" },
    ]);
  })
);
