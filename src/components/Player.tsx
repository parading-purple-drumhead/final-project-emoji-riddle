import { doc, getDoc } from "firebase/firestore";
import { PlayerProps } from "../utils/types";
import { db } from "../firebase/client";
import { useEffect, useState } from "react";

const Player = ({ uid, isTurn, isHost, score, winner }: PlayerProps) => {
  const [playerName, setPlayerName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const fetchUserData = async () => {
    const userRef = doc(db, "users", uid);
    const userData = (await getDoc(userRef)).data();
    setPlayerName(userData?.name);
    setProfilePhoto(userData?.profilePhoto);
  };

  useEffect(() => {
    fetchUserData();
  });

  return (
    <div className="row game-player py-3" style={{ fontSize: "1.25rem" }}>
      <div className="col-2">
        <img
          src={profilePhoto}
          className="img-fluid ms-2"
          style={{ borderRadius: "50%" }}
        ></img>
        {/* <i className="bi-person-circle"></i> */}
      </div>
      <div className={winner? "col-10 py-1 text-success" : "col-10 py-1"}>
        {playerName}
        {isHost && (
          <span className="ms-1" style={{ color: "#777" }}>
            (Host)
          </span>
        )}
        {winner && <span className="ms-2 text-warning" style={{fontSize: "1.5rem"}}>👑</span>}
        {isTurn && (
          <span className="ms-1" style={{ color: "#777" }}>
            (Turn)
          </span>
        )}
        <br />
        <span style={ winner? { fontSize: "1rem", color: "#198754" } : { fontSize: "1rem", color: "#777" }}>Score: {score}</span>
      </div>
    </div>
  );
};

export default Player;
