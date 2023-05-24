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
import useAuth from "./useAuth";

const useFetchUser = (rand) => {
const [userInfo, setCards] = useState([]);
const [isErrorC, setError] = useState(null);
const [isPendingC, setPendingC] = useState(true);
const {userId} = useAuth()
    useEffect(() => {
   
    const Cards = [];
     
      const userRef = collection(db, "accounts");
      const q = query(
        userRef
    
       );
   
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
  }, [rand]);
  return { userInfo, isErrorC, isPendingC };
};
export default useFetchUser;
