import { Link, useLocation, useNavigate } from "react-router-dom";

const GameSetup = () => {
  const { state } = useLocation();
  const { gameStartType } = state;

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const playerType: string = gameStartType == "Create" ? "host" : "non-host";

    navigate("/gamelobby", { state: { playerType } });

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
                  <input type="text" className="form-control" />
                  {gameStartType == "Join" && (
                    <div className="form-text">
                      This is the name of the lobby set by the host that invited
                      you
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" />
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
      <Link to="/gamelobby">Go to Game Lobby</Link>
    </div>
  );
};

export default GameSetup;
