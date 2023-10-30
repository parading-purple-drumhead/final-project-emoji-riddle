import { PlayerProps } from "../utils/types";

const Player = ({ name, isTurn, isHost }: PlayerProps) => {
  return (
    <div className="row game-player py-2" style={{ fontSize: "1.5rem" }}>
      <div className="col-2 text-center">
        <i className="bi-person-circle"></i>
      </div>
      <div className="col-10">
        {name}
        {isHost && (
          <span className="ms-1" style={{ color: "#777" }}>
            (Host)
          </span>
        )}
        {isTurn && (
          <span className="ms-1" style={{ color: "#777" }}>
            (Turn)
          </span>
        )}
      </div>
    </div>
  );
};

export default Player;
