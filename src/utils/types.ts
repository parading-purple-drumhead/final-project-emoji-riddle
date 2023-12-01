export type PlayerProps = {
  uid: string;
  isTurn: boolean;
  isHost: boolean;
  score?: number;
};

export type GuessProps = {
  name: string;
  guess: string;
  correct: boolean;
};

export type PhraseProps = {
  phrase: string;
  show: boolean;
};

export type PlayerDetails = {
  player: string;
  score: number;
};
