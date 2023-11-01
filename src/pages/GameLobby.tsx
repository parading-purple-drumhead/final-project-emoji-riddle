import { useLocation, useNavigate } from "react-router-dom";
import Player from "../components/Player";
import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/client";
import { PlayerDetails } from "../utils/types";

const GameLobby = () => {
  const { state } = useLocation();
  const { gameDetails } = state;
  const [playerType, setPlayerType] = useState("");
  const [players, setPlayers] = useState<PlayerDetails[]>([]);
  const [started, setStarted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const gameRef = doc(db, "games", gameDetails.name);
    const unsubscribe = onSnapshot(gameRef, (doc) => {
      const gameData = doc.data();
      if (auth.currentUser?.uid == gameData?.players[0].player) {
        setPlayerType("host");
      } else {
        setPlayerType("non-host");
      }
      setPlayers(gameData?.players);
      setStarted(gameData?.started);
    });

    if (started)
      navigate("/gamescreen", { state: { playerType, gameDetails } });
    // Stop listening to changes
    return () => unsubscribe();
  }, [gameDetails, navigate, playerType, started]);

  const startGame = () => {
    if (players.length >= 2) {
      players.forEach(async (player, i) => {
        await setDoc(
          doc(db, `games/${gameDetails.name}/rounds`, `Round ${i + 1}`),
          {
            guesses: [],
            phrase: "",
            turn: player.player,
            started: false,
            completed: false,
            emojis: [],
          }
        );

        await updateDoc(doc(db, "games", gameDetails.name), {
          started: true,
        });
      });
    }
  };

  return (
    <div className="game-lobby">
      <h1 className="text-center">Game Lobby ({playerType})</h1>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div>
                  <h3>Lobby Name:</h3>
                  <h6>{gameDetails.name}</h6>
                  <h1>{started && "Hello"}</h1>
                </div>
                <div>
                  <h3>Password:</h3>
                  <h6>{playerType == "host" && gameDetails.password}</h6>
                </div>
                <div>
                  {playerType == "non-host" && <p>Waiting for Host...</p>}
                  {playerType == "host" && (
                    <button className="btn btn-primary" onClick={startGame}>
                      Start Game
                    </button>
                  )}
                  <br></br>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() =>
                      navigate("/gamesetup", { state: { playerType } })
                    }
                  >
                    Leave Game
                  </button>
                </div>
              </div>
              <div className="col">
                <h2>Players</h2>
                <>
                  {players.map((player, i) => {
                    return (
                      <Player
                        uid={player.player}
                        isTurn={false}
                        isHost={i == 0}
                      ></Player>
                    );
                  })}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
