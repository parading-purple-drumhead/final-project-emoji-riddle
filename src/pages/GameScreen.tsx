import { useEffect, useMemo, useState } from "react";
import Guess from "../components/Guess";
import Player from "../components/Player";
import Phrase from "../components/Phrase";
import { EmojiClickData } from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/client";
import { GuessProps, PlayerDetails } from "../utils/types";
import Timer from "../components/Timer";

const GameScreen = () => {
  const { state } = useLocation();
  const { gameDetails } = state;

  const navigate = useNavigate();

  const listOfPhrases: string[] = [
    "World is a stage",
    "Pants on fire",
    "Break a leg",
    "When pigs fly",
    "Speak of the devil",
    "Penny for your thoughts",
    "Storm in a tea cup",
    "Elephant in the room",
    "Two birds one stone",
    "Hit the nail on the head",
    "Fish out of water",
    "Piece of cake",
    "Spill the beans",
  ];

  const getRandomPhrases = (listOfPhrases: string[]) => {
    const selectedPhrases = [];
    while (selectedPhrases.length < 3) {
      const randomIndex = Math.floor(Math.random() * listOfPhrases.length);
      selectedPhrases.push(listOfPhrases.splice(randomIndex, 1)[0]);
    }
    return selectedPhrases;
  };

  const [currentUserName, setCurrentUserName] = useState(null);
  const [roundStarted, setRoundStarted] = useState(false);
  const [roundCompleted, setRoundCompleted] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [currentTurnName, setCurrentTurnName] = useState(null);
  const [isTurn, setIsTurn] = useState(false);
  const [round, setRound] = useState(1);
  const [phrases] = useState(getRandomPhrases(listOfPhrases));
  const [phrase, setPhrase] = useState("");
  const [players, setPlayers] = useState<PlayerDetails[]>([]);
  const [currentEmojisSelected, setCurrentEmojisSelected] = useState([""]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<GuessProps[]>([]);
  const [showPhrase, setShowPhrase] = useState(false);
  const [timerVisible, setTimerVisible] = useState(false);

  const gameRef = useMemo(
    () => doc(db, "games", gameDetails.name),
    [gameDetails.name]
  );

  const fetchCurrentUserData = async () => {
    const userRef = doc(db, "users", auth.currentUser!.uid);
    const userData = (await getDoc(userRef)).data();
    setCurrentUserName(userData?.name);
  };

  const roundRef = useMemo(
    () => doc(db, `games/${gameDetails.name}/rounds`, `Round ${round}`),
    [gameDetails.name, round]
  );

  const fetchCurrentTurnUserData = async () => {
    const userRef = doc(db, "users", currentTurn!);
    const userData = (await getDoc(userRef)).data();
    setCurrentTurnName(userData?.name);
  };

  useEffect(() => {
    fetchCurrentUserData();
    const unsubscribe = onSnapshot(gameRef, (document) => {
      const gameData = document.data();

      console.log(gameData);

      setRound(gameData?.currentRound);
      setPlayers(gameData?.players);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(roundRef, (doc) => {
      const roundData = doc.data();

      console.log(roundData);

      setGuesses(roundData?.guesses);
      setPhrase(roundData?.phrase);
      setCurrentTurn(roundData?.turn);
      setRoundStarted(roundData?.started);
      setRoundCompleted(roundData?.completed);
      setCurrentEmojisSelected(roundData?.emojis);
    });

    console.log("Round", round);

    if (currentTurn == auth.currentUser?.uid)
      setCurrentTurnName(currentUserName);
    else fetchCurrentTurnUserData();

    // Start timer once round starts
    setTimerVisible(roundStarted);

    setIsTurn(currentTurn == auth.currentUser?.uid);
    setShowPhrase(currentTurn == auth.currentUser?.uid);

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentTurn,
    gameDetails.name,
    isTurn,
    round,
    roundCompleted,
    roundStarted,
  ]);

  const handleGuessClick = async () => {
    if (currentGuess.toLowerCase() !== phrase.toLowerCase()) {
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
      const playersWithUpdatedScores = players.map((player) => {
        if (player.player === auth.currentUser?.uid) player.score += 1;
        return player;
      });
      await updateDoc(gameRef, { players: playersWithUpdatedScores });
      setShowPhrase(true);
    }
  };

  const handleEndRoundOrGame = async () => {
    await updateDoc(roundRef, {
      completed: true,
    });

    if (round < players.length) {
      await updateDoc(gameRef, {
        currentRound: increment(1),
      });
      // setRound(round + 1);
      setTimerVisible(false); // Reset the timer visibility for the next round
      setRoundCompleted(true);
    } else {
      await updateDoc(gameRef, {
        completed: true,
      });
      navigate("/gameover", { state: { players } });
    }
  };

  const handlePhraseClick = async (e: React.FormEvent, phrase: string) => {
    e.preventDefault();

    await updateDoc(roundRef, {
      phrase: phrase,
      started: true,
    });

    setTimerVisible(true);
  };

  const handleEmojiClick = async (emojiData: EmojiClickData) => {
    console.log(emojiData.emoji);

    await updateDoc(roundRef, {
      emojis: arrayUnion(emojiData.emoji),
    });
  };

  // const handleEndRoundClick = async () => {
  //   await updateDoc(roundRef, {
  //     completed: true,
  //   });

  //   if (round < players.length)
  //     await updateDoc(gameRef, {
  //       currentRound: increment(1),
  //     });

  //   setRound(round + 1);
  // };

  // const handleEndGameClick = async () => {
  //   await updateDoc(roundRef, {
  //     completed: true,
  //   });

  //   navigate("/gameover", {state:{players}});
  // };

  return (
    <div className="game-screen">
      <div className="container-fluid">
        <div
          className="row p-2"
          id="round-stats"
          style={{ borderBottom: "1px solid #ddd" }}
        >
          <div className="col-lg-3" id="round-counter">
            <h3 className="my-2">
              Round {round} of {players && players.length}
            </h3>
          </div>
          <div
            className="col-lg-6 text-center phrase-space"
            style={{ fontSize: "2rem" }}
          >
            <Phrase phrase={phrase} show={showPhrase} />
          </div>
          <div className="col-lg-3" id="round-counter">
            <h3 className="my-2">
              {timerVisible && <Timer onTimesUp={handleEndRoundOrGame} />}{" "}
              {/* Render Timer when timerVisible is true */}
            </h3>
          </div>
        </div>
        <div className="row" id="round-panels">
          <div
            className="col-lg-3"
            id="playerPanel"
            style={{ borderRight: "1px solid #ddd", height: "80vh" }}
          >
            {players &&
              players.map((player, i) => (
                <Player
                  uid={player.player}
                  isTurn={player.player == currentTurn}
                  isHost={i == 0}
                  score={player.score}
                />
              ))}
            {isTurn && roundStarted && round != players.length && (
              <div className="row mt-5">
                <div className="col-6 offset-3 col-xl-4 offset-xl-4">
                  <button
                    className="btn btn-danger"
                    style={{ width: "100%" }}
                    onClick={handleEndRoundOrGame}
                  >
                    End Round
                  </button>
                </div>
              </div>
            )}
            {/* {isTurn && roundStarted && players && round == players.length && (
              <div className="row mt-5">
                <div className="col-6 offset-3 col-xl-4 offset-xl-4">
                  <button
                    className="btn btn-danger"
                    style={{ width: "100%" }}
                    onClick={handleEndRoundOrGame}
                  >
                    End Game
                  </button>
                </div>
              </div>
            )} */}
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
                    <i>{currentTurnName} is picking...</i>
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
                      className="row bg-light"
                      id="emoji-display"
                      style={{
                        height: "40vh",
                        textAlign: "center",
                      }}
                    >
                      <h3 className="py-3">Emoji display</h3>
                      <p style={{ fontSize: 50 }}>{currentEmojisSelected}</p>
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
                      className="row bg-light"
                      id="emoji-display"
                      style={{
                        height: "70vh",
                        textAlign: "center",
                      }}
                    >
                      <h3 className="py-3">Emoji display</h3>
                      <p style={{ fontSize: 50 }}>{currentEmojisSelected}</p>
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
