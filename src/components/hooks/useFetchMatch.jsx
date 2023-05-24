import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import useAuth from "./useAuth";

const useFetchMatch = (id) => {
const [matchInfo, setCards] = useState([]);
const [isErrorC, setError] = useState(null);
const [isPendingC, setPendingC] = useState(true);
const {userId} = useAuth()
    useEffect(() => {
   
    const Cards = [];
     
      const userRef = doc(db, "matches",id);
    //   const q = query(
    //     userRef,where('')
    
    //    );
   
    getDoc(userRef)
      .then((users) => {
       
          Cards.push({ ...users.data(), id: users.id });
       
        setCards(Cards);
        setPendingC(false);
      })
      .catch((err) => {
        console.log(err.message);
        setError(e.message);
      });
  }, [id]);
  return { matchInfo, isErrorC, isPendingC };
};
export default useFetchMatch;
