import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import App from "../src/App";
import { describe, expect } from "vitest";

describe("root render", () => {
  it("renders the root App component correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const rootComponent = container.firstChild;
    expect(rootComponent).toBeInTheDocument();
  });
});
