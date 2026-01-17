import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TaskForm from "./taskform";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!user) navigate("/login");
  // }, [user, navigate]);
  // (đã có protectedRoute)

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn" onClick={() => navigate("/tasklist")}>
            Check Tasks
          </button>
        </div>
        <p>Tasks Dashboard</p>
        <TaskForm />
      </section>
    </>
  );
};

export default Dashboard;
