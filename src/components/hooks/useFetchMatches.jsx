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

const useFetchMatches = (name) => {
const [cards, setCards] = useState([]);
const [isErrorC, setError] = useState(null);
const [isPendingC, setPendingC] = useState(true);

    useEffect(() => {
   
    const Cards = [];
      let q;
      const userRef = collection(db, "matches");
      if (name == 'all') {
         q = query(
           userRef,
           where('status','!=',"Deactivated")
          ); 
      } else {
        q = query(
            userRef,
          where('name', '==', name),
          where('status','!=',"Deactivated")
          );
          
      }
   
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
  }, [name]);
  return { cards, isErrorC, isPendingC };
};
export default useFetchMatches;
