import { doc, getDoc } from "firebase/firestore";
import { PlayerProps } from "../utils/types";
import { db } from "../firebase/client";
import { useEffect, useState } from "react";

const Player = ({ uid, isTurn, isHost }: PlayerProps) => {

  const [playerName, setPlayerName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const fetchUserData = async()=> {
    const userRef = doc(db, "users", uid);
    const userData = (await getDoc(userRef)).data();
    setPlayerName(userData?.name);
    setProfilePhoto(userData?.profilePhoto);
  }

  useEffect(()=>{
    fetchUserData();
  })

  return (
    <div className="row game-player py-2" style={{ fontSize: "1.5rem" }}>
      <div className="col-2 text-center">
        <img src={profilePhoto}></img>
        {/* <i className="bi-person-circle"></i> */}
      </div>
      <div className="col-10">
        {playerName}
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
