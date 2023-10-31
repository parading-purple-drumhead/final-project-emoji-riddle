import { useLocation, useNavigate } from "react-router-dom";
import Player from "../components/Player";

const GameLobby = () => {
  const { state } = useLocation();
  const { playerType, gameDetails } = state;
  const navigate = useNavigate();
  
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
            </div>
            <div>
              <h3>Password:</h3>
              <h6>{playerType == "host" && gameDetails.password}</h6>
            </div>
            <div>
              {playerType == "non-host" && <p>Waiting for Host...</p>}
              {playerType == "host" && 
              <button className="btn btn-primary" onClick={
                ()=>navigate("/gamescreen", { state: { playerType, gameDetails } })}>Start Game</button>}
              <br></br>
              <button className="btn btn-outline-danger" onClick={()=>navigate("/gamesetup", { state: { playerType } })}>Leave Game</button>
            </div>
          </div>
          <div className="col">
          <h2>Players</h2>
          <Player name={"Player 1"} isTurn={false} isHost={false}></Player>
          <Player name={"Player 2"} isTurn={false} isHost={false}></Player>
          <Player name={"Player 3"} isTurn={false} isHost={false}></Player>
          </div>
          </div>
        </div>
      </div>
      {/* <Link to="/gamescreen">Go to Game Screen</Link> */}
      </div>
      {/* <Link to="/gamescreen">Go to Game Screen</Link> */}
    </div>
  );
};

export default GameLobby;
