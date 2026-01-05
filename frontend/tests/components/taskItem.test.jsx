import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../../src/features/task/taskSlice";
import authReducer from "../../src/features/auth/authSlice";
import TaskItem from "../../src/components/TaskItem";

describe("TaskItem", () => {
  const task = {
    _id: "task-123",
    createdAt: "2023-07-09T10:00:00",
    text: "Learn Blockchain",
  };

  function renderWithStore(ui) {
    const store = configureStore({
      reducer: {
        task: taskReducer,
        auth: authReducer,
      },
      preloadedState: {
        auth: { user: { token: "mock_token" } },
      },
    });

    return render(<Provider store={store}>{ui}</Provider>);
  }

  it("renders task details correctly", () => {
    renderWithStore(<TaskItem task={task} />);

    expect(screen.getByText(task.text)).toBeInTheDocument();

    const formattedDate = new Date(task.createdAt).toLocaleDateString();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
