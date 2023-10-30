export type PlayerProps = {
  name: string;
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
