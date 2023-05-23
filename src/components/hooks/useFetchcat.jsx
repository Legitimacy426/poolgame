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

const useFetchCat = (cat,time) => {
const [cards, setCards] = useState([]);
const [isErrorC, setError] = useState(null);
const [isPendingC, setPendingC] = useState(true);

    useEffect(() => {
   
    const Cards = [];
      let q;
      const userRef = collection(db, "tables");
      if (cat == 'all') {
         q = query(
           userRef,
           where('status','!=',"Deactivated")
          ); 
      } else {
        q = query(
            userRef,
          where('name', '==', cat),
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
  }, [cat]);
  return { cards, isErrorC, isPendingC };
};
export default useFetchCat;
