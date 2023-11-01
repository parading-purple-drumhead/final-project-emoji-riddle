import { useState } from "react";
import Guess from "../components/Guess";
import Player from "../components/Player";
import Phrase from "../components/Phrase";
import { EmojiClickData } from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";

const GameScreen = () => {
  const [roundStarted, setRoundStarted] = useState(false);
  const [isTurn] = useState(true);
  const [round] = useState(1);
  const [phrases] = useState([
    "World is a stage",
    "Pants on fire",
    "Hot as hell",
  ]);
  const [phrase, setPhrase] = useState("");
  const [players] = useState([
    { name: "Player 1", isHost: true, isTurn: false },
    { name: "Player 2", isHost: false, isTurn: false },
    { name: "Player 3", isHost: false, isTurn: true },
  ]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([
    { name: "Player 1", guess: "Lorem ipsum dolor sit amet", correct: false },
    { name: "Player 2", guess: "Lorem ipsum dolor sit amet", correct: false },
    { name: "Player 3", guess: "Lorem ipsum dolor sit amet", correct: false },
  ]);

  const handleGuessClick = () => {
    if (currentGuess !== phrase) {
      setGuesses([
        ...guesses,
        { name: "Player 1", guess: currentGuess, correct: false },
      ]);
      setCurrentGuess("");
    } else {
      setGuesses([
        ...guesses,
        { name: "Player 1", guess: "Player 1 guessed", correct: true },
      ]);
    }
  };

  const handlePhraseClick = (e: React.FormEvent, phrase: string) => {
    e.preventDefault();
    setPhrase(phrase);
    setRoundStarted(true);
  };

  const [currentEmojiSelected, setCurrentEmoji] = useState([""]);
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    console.log(emojiData.emoji);
    setCurrentEmoji([...currentEmojiSelected, emojiData.emoji]);
  };

  return (
    <div className="game-screen">
      <div className="container-fluid">
        <div
          className="row p-2"
          id="round-stats"
          style={{ borderBottom: "1px solid #ddd" }}
        >
          <div className="col-lg-3" id="round-counter">
            <h3 className="my-2">Round {round} of 3</h3>
          </div>
          <div
            className="col-lg-6 text-center phrase-space"
            style={{ fontSize: "2rem" }}
          >
            <Phrase phrase={phrase} />
          </div>
        </div>

        <div className="row" id="round-panels">
          <div
            className="col-lg-3"
            id="playerPanel"
            style={{ borderRight: "1px solid #ddd", height: "80vh" }}
          >
            {players.map((player, i) => (
              <Player
                key={i}
                uid={player.name}
                isTurn={player.isTurn}
                isHost={player.isHost}
              />
            ))}
          </div>

          <div className="col-lg-9" id="gamePanel">
            {!roundStarted && (
              <div
                className="row"
                style={{
                  position: "fixed",
                  width: "75%",
                  height: "85%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  zIndex: 2,
                  backdropFilter: "blur(2px)",
                  alignItems: "center",
                }}
              >
                {!isTurn && (
                  <p
                    className="text-white text-center"
                    style={{ fontSize: "2rem" }}
                  >
                    <i>Player 1 is picking...</i>
                  </p>
                )}

                {isTurn && (
                  <div className="phrase-picker">
                    <h2 className="text-center text-white">Pick a Phrase</h2>
                    <div className="row mt-4">
                      <div className="col-12 text-center">
                        {phrases.map((phrase) => {
                          return (
                            <button
                              className="btn btn-outline-light btn-large mx-2"
                              style={{ fontSize: "1.25rem" }}
                              onClick={(e) => handlePhraseClick(e, phrase)}
                            >
                              {phrase}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="row">
              <div
                className="col-lg-8"
                id="emoji-panel"
                style={{
                  borderRight: "1px solid #ddd",
                  height: "80vh",
                }}
              >
                {isTurn && (
                  <div>
                    <div
                      className="row bg-primary"
                      id="emoji-display"
                      style={{
                        height: "40vh",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      <h3>Emoji display</h3>
                      <p style={{ fontSize: 50 }}>{currentEmojiSelected}</p>
                    </div>
                    <div
                      className="row bg-success"
                      id="emoji-picker"
                      style={{ height: "40vh" }}
                    >
                      <EmojiPicker
                        height="100%"
                        width="100%"
                        onEmojiClick={(emoji) => handleEmojiClick(emoji)}
                      />
                    </div>
                  </div>
                )}
                {!isTurn && (
                  <div
                    className="row py-4"
                    style={{ borderTop: "1px solid #ddd" }}
                  >
                    <div className="col-10">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Type your guess..."
                        value={currentGuess}
                        onChange={(e) => setCurrentGuess(e.target.value)}
                      />
                    </div>
                    <div className="col-2">
                      <button
                        className="btn btn-success btn-small"
                        style={{ width: "100%" }}
                        onClick={handleGuessClick}
                      >
                        Guess
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-lg-4 pt-2" id="chat-panel">
                <h4 className="text-center">Guesses</h4>
                <div className="chats row mt-3">
                  {guesses.map((guess) => (
                    <Guess
                      name={guess.name}
                      guess={guess.guess}
                      correct={guess.correct}
                    />
                  ))}
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
