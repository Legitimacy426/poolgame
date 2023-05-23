import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase.config";

const useFetchPlayers = (pid) => {
const [cards, setCards] = useState([]);
const [isErrorC, setError] = useState(null);
const [isPendingC, setPendingC] = useState(true);

    useEffect(() => {
   
    const Cards = [];
    
      const userRef = collection(db, "players");
      const q = query(userRef,where("mid","==",pid))    
     
    getDocs(q)
      .then((users) => {
        users.forEach((user) => {
          Cards.push({ ...user.data(), id: user.id });
        });
        setCards(Cards);
        setPendingC(false);
      })
      .catch((err) => {
        console.log(err.message);
        setError(e.message);
      });
  }, []);
  return { cards , isErrorC, isPendingC };
};
export default useFetchPlayers;
