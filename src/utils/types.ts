export type PlayerProps = {
  uid: string;
  isTurn: boolean;
  isHost: boolean;
};

export type GuessProps = {
  name: string;
  guess: string;
  correct: boolean;
};

export type PhraseProps = {
  phrase: string;
};

export type PlayerDetails = {
  player: string;
  score: number;
};