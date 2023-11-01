import { useEffect, useState } from "react";
import Guess from "../components/Guess";
import Player from "../components/Player";
import Phrase from "../components/Phrase";
import { EmojiClickData } from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
import { useLocation } from "react-router-dom";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/client";
import { GuessProps, PlayerDetails } from "../utils/types";

const GameScreen = () => {
  const { state } = useLocation();
  const { gameDetails } = state;
  const [currentUserName, setCurrentUserName] = useState(null);
  const [roundStarted, setRoundStarted] = useState(false);
  const [roundCompleted, setRoundCompleted] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [isTurn, setIsTurn] = useState(false);
  const [round, setRound] = useState(1);
  const [phrases] = useState([
    "World is a stage",
    "Pants on fire",
    "Hot as hell",
  ]);
  const [phrase, setPhrase] = useState("");
  const [players, setPlayers] = useState<PlayerDetails[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<GuessProps[]>([]);

  const fetchGameData = async () => {
    const gameRef = doc(db, "games", gameDetails.name);
    const gameData = (await getDoc(gameRef)).data();

    const userRef = doc(db, "users", auth.currentUser!.uid);
    const userData = (await getDoc(userRef)).data();

    setPlayers(gameData?.players);
    setCurrentUserName(userData?.name);
  };

  useEffect(() => {
    fetchGameData();

    const roundRef = doc(
      db,
      `games/${gameDetails.name}/rounds`,
      `Round ${round}`
    );

    const unsubscribe = onSnapshot(roundRef, (doc) => {
      const roundData = doc.data();

      console.log(roundData);

      setGuesses(roundData?.guesses);
      setPhrase(roundData?.phrase);
      setCurrentTurn(roundData?.turn);
      setRoundStarted(roundData?.started);
      setRoundCompleted(roundData?.completed);
    });

    console.log(currentTurn == auth.currentUser?.uid);

    setIsTurn(currentTurn == auth.currentUser?.uid);

    console.log(isTurn);

    return () => unsubscribe();
  }, []);

  const handleGuessClick = async () => {
    const roundRef = doc(
      db,
      `games/${gameDetails.name}/rounds`,
      `Round ${round}`
    );
    if (currentGuess !== phrase) {
      await updateDoc(roundRef, {
        guesses: arrayUnion({
          name: currentUserName,
          guess: currentGuess,
          correct: false,
        }),
      });
      setCurrentGuess("");
    } else {
      await updateDoc(roundRef, {
        guesses: arrayUnion({
          name: currentUserName,
          guess: `${currentUserName} guessed`,
          correct: true,
        }),
      });
    }
  };

  const handlePhraseClick = async (e: React.FormEvent, phrase: string) => {
    e.preventDefault();

    const roundRef = doc(
      db,
      `games/${gameDetails.name}/rounds`,
      `Round ${round}`
    );

    await updateDoc(roundRef, {
      phrase: phrase,
      started: true,
    });
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
                uid={player.player}
                isTurn={player.player == currentTurn}
                isHost={i == 0}
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
                {!isTurn && !roundStarted && (
                  <p
                    className="text-white text-center"
                    style={{ fontSize: "2rem" }}
                  >
                    <i>Player 1 is picking...</i>
                  </p>
                )}

                {isTurn && !roundStarted && (
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
                {isTurn && roundStarted && (
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
                {!isTurn && roundStarted && (
                  <div>
                    <div
                      className="row bg-primary"
                      id="emoji-display"
                      style={{
                        height: "70vh",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      <h3>Emoji display</h3>
                    </div>
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
