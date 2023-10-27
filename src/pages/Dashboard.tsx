import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {/* 
      TO-DO:
      Create card with "Join A Game" and "Create A Game" functionality 
      */}
      <p>Create card with "Join A Game" and "Create A Game" functionality</p>
      <Link to="/gamesetup">Go to Game Setup</Link>
    </div>
  );
};

export default Dashboard;
