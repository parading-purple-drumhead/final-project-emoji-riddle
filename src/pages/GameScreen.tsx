import Player from "../components/Player";

const GameScreen = () => {
  return (
    <div className="game-screen">
      <div className="container-fluid">
        <div
          className="row p-2"
          id="round-stats"
          style={{ borderBottom: "1px solid #ddd" }}
        >
          <div className="col-lg-3" id="round-counter">
            <h3 className="my-2">Round 1 of 3</h3>
          </div>
          <div
            className="col-lg-6 text-center"
            id="phrase-space"
            style={{ fontSize: "2rem" }}
          >
            <span className="me-2">_ _ _ _</span> &nbsp;
            <span className="me-2">_ _</span> &nbsp;
            <span>_ _ _ _</span>
          </div>
        </div>

        <div className="row" id="round-panels">
          <div
            className="col-lg-3"
            id="playerPanel"
            style={{ borderRight: "1px solid #ddd", height: "80vh" }}
          >
            <Player name="Player 1" isTurn={true} isHost={true} />
            <Player name="Player 2" isTurn={false} isHost={false} />
            <Player name="Player 3" isTurn={false} isHost={false} />
          </div>

          <div className="col-lg-9" id="gamePanel">
            <div className="row">
              <div
                className="col-lg-8"
                id="emoji-panel"
                style={{ borderRight: "1px solid #ddd", height: "80vh" }}
              ></div>
              <div className="col-lg-4 pt-2" id="chat-panel">
                <h4 className="text-center">Guesses</h4>
                <div className="chats row mt-3">
                  <div
                    className="chat col-12 py-2"
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    <span className="me-1" style={{ fontWeight: "bold" }}>
                      Player 1:
                    </span>
                    <span>Lorem ipsum dolor sit amet</span>
                  </div>
                  <div
                    className="chat col-12 py-2"
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    <span className="me-1" style={{ fontWeight: "bold" }}>
                      Player 1:
                    </span>
                    <span>Lorem ipsum dolor sit amet</span>
                  </div>
                  <div
                    className="chat col-12 py-2"
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    <span className="me-1" style={{ fontWeight: "bold" }}>
                      Player 1:
                    </span>
                    <span>Lorem ipsum dolor sit amet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
