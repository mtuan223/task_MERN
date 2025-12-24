import "@testing-library/jest-dom";
import { server } from "./mockserver_msw";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
