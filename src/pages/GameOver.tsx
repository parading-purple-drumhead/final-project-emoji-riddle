import { useLocation } from "react-router-dom";
import { PlayerDetails } from "../utils/types";
import Player from "../components/Player";

const GameOver = () => {
  const { state } = useLocation();
  const { players } = state;

  let highScore = 0;
  for (let i = 0; i < players.length; i++) {
    if (players[i].score > highScore) {
      highScore = players[i].score;
    }
  }

  return (
    <div className="game-over" style={{ paddingTop: "10vh" }}>
      <h1 className="text-center text-success">Game Over!</h1>
      <br></br>
      <div className="score-board">
        <h3 className="text-center text-secondary">Score Board</h3>
        <div className="players col-4 offset-4 alert alert-secondary alert-dismissible fade show text-center mt-4">
          {players.map((player: PlayerDetails, i: number) => {
            return (
              <Player
                uid={player.player}
                isTurn={false}
                isHost={i == 0}
                score={player.score}
                winner={player.score == highScore}
              ></Player>
            );
          })}
        </div>

        {/* {players.map((player: PlayerDetails)=> {
                return (<div>
                <span>Player ID: {player.player}</span>
                <br></br>
                <span>Score: {player.score}</span>
                </div>)
            })} */}
      </div>
    </div>
  );
};

export default GameOver;
