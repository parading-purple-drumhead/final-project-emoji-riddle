import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/client";
import { PlayerDetails } from "../utils/types";
// import { doc, getDoc } from "firebase/firestore";

const GameSetup = () => {
  const { state } = useLocation();
  const { gameStartType } = state;
  const [gameDetails, setGameDetails] = useState({
    name: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const createGame = async () => {
    if (gameDetails.name && gameDetails.password) {
      await setDoc(doc(db, "games", gameDetails.name), {
        lobby_password: gameDetails.password,
        players: [{ player: auth.currentUser?.uid, score: 0 }],
        started: false,
        currentRound: 1,
      });
      return true;
    }
    return false;
  };

  const isPlayer = (uid: string, players: PlayerDetails[]) => {
    let i = 0;
    for (i = 0; i < players.length; i++) {
      if (players[i].player == uid) return true;
    }
    return false;
  };

  const joinGame = async () => {
    const gameRef = doc(db, "games", gameDetails.name);
    const gameSnap = await getDoc(gameRef);

    if (
      !gameSnap.exists() ||
      gameSnap.data().lobby_password !== gameDetails.password
    ) {
      setErrorMessage("Game name or password is incorrect");
      return false;
    }

    if (
      gameSnap.data().started &&
      !isPlayer(auth.currentUser!.uid, gameSnap.data().players)
    ) {
      setErrorMessage("Game has already started");
      return false;
    }

    await updateDoc(gameRef, {
      players: arrayUnion({ player: auth.currentUser?.uid, score: 0 }),
    });

    setErrorMessage("");
    return true;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let pass = false;

    const playerType: string = gameStartType == "Create" ? "host" : "non-host";
    if (gameStartType == "Create") {
      pass = await createGame();
    } else {
      pass = await joinGame();
    }

    if (pass) navigate("/gamelobby", { state: { playerType, gameDetails } });
    console.log(gameStartType + " a game requested");
  };

  return (
    <div className="game-setup container">
      <div className="row mt-5">
        <div className="col-lg-6 offset-lg-3 mt-5">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">{gameStartType} A Game</h3>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="mb-3">
                  <label className="form-label">Lobby Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={gameDetails.name}
                    onChange={(e) => {
                      const gameDets = { ...gameDetails };
                      gameDets["name"] = e.target.value;
                      setGameDetails(gameDets);
                      // console.log(gameDetails);
                    }}
                  />
                  {gameStartType == "Join" && (
                    <div className="form-text">
                      This is the name of the lobby set by the host that invited
                      you
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={gameDetails.password}
                    onChange={(e) => {
                      const gameDets = { ...gameDetails };
                      gameDets["password"] = e.target.value;
                      setGameDetails(gameDets);
                      // console.log(gameDetails);
                    }}
                  />
                  {gameStartType == "Join" && errorMessage != "" && (
                    <div className="form-text text-danger">{errorMessage}</div>
                  )}
                </div>
                <div className="row">
                  <button
                    type="submit"
                    className="btn btn-primary mx-auto"
                    style={{ width: "50%" }}
                  >
                    {gameStartType} Game
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;
