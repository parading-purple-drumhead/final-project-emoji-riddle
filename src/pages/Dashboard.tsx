import { Link, useLocation, useNavigate } from "react-router-dom";
// import { addDoc, collection } from "firebase/firestore";

const Dashboard = () => {
  const { state } = useLocation();
  const { displayName } = state;

  const navigate = useNavigate();

  const handleClick = (gameStartType: string) => {
    navigate("/gamesetup", { state: { gameStartType } });
  };

  return (
    <div className="dashboard container">
      <div className="row mt-5">
        <div className="col-lg-6 offset-lg-3 mt-5">
          <div className="card">
            <div className="card-body my-3">
              <h3 className="text-center">Welcome, {displayName}!</h3>
              <p className="text-center" style={{ fontSize: "1.5rem" }}>
                Select One
              </p>
              <div className="row">
                <button
                  className="btn btn-success mb-2 mx-auto"
                  style={{ width: "50%" }}
                  onClick={() => handleClick("Join")}
                >
                  Join a Game
                </button>
              </div>
              <div className="row">
                <button
                  className="btn btn-primary mb-2 mx-auto"
                  style={{ width: "50%" }}
                  onClick={() => handleClick("Create")}
                >
                  Create a Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/gamesetup">Go to Game Setup</Link>
    </div>
  );
};

export default Dashboard;
