import { GuessProps } from "../utils/types";

const Guess = ({ name, guess, correct }: GuessProps) => {
  return (
    <div
      className={
        correct ? "chat col-12 py-2 bg-success text-white" : "chat col-12 py-2"
      }
      style={{ borderBottom: "1px solid #ddd" }}
    >
      <span className="me-1" style={{ fontWeight: "bold" }}>
        {name}:
      </span>
      <span>{guess}</span>
    </div>
  );
};

export default Guess;
