import Spinner from "./spinner";
import { render, screen } from "@testing-library/react";

describe("Spinner", () => {
  it("render correctly", () => {
    render(<Spinner />);

    const containerDiv = screen.getByTestId("spin-container");
    expect(containerDiv).toBeInTheDocument();

    const innerDiv = screen.getByTestId("inner-container");
    expect(innerDiv).toBeInTheDocument();
  });
});
