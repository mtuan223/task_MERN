import { render, screen } from "@testing-library/react";
import Spinner from "./spinner";

describe("Spinner", () => {
  test("render correctly", () => {
    render(<Spinner />);
    //tìm element có data-testid="spin-container"
    const containerDiv = screen.getByTestId("spin-container");
    //kiểm tra xem element có nằm trong DOM không.
    expect(containerDiv).toBeInTheDocument();
  });
});
