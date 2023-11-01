import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/client";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [displayName, setDisplayName] = useState("");

  const navigate = useNavigate();

  const getUserData = async () => {
    const userRef = doc(db, "users", auth.currentUser!.uid);
    const userData = (await getDoc(userRef)).data();
    setDisplayName(userData?.name);
  };

  useEffect(() => {
    getUserData();
  }, []);

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
              <div
                className="alert alert-primary alert-dismissible fade show text-center mt-4"
                role="alert"
              >
                <strong>How to Play: </strong>
                Welcome to Emoji Riddle with Friends. The rules of the game are
                simple. When it's your turn, you pick a phrase from the list and
                emojis that best describe the phrase. The other participants
                have to try to guess the original phrase from the emojis picked
                by you. Currently, we're not playing with a timer, so take your
                time guessing!
              </div>
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
    </div>
  );
};

export default Dashboard;
