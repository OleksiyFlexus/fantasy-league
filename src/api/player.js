import { firestoreDb } from "@/firebase";
import { collection, addDoc, query, getDocs } from "firebase/firestore";

export const createPlayerInDb = async (playerData) => {
  const collectionName = "players";
  try {
    const playersCollectionRef = collection(firestoreDb, collectionName);

    const docRef = await addDoc(playersCollectionRef, playerData);

    console.log("Гравець успішно створений ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Помилка при додаванні гравця: ", error);
  }
};

export const findAllPlayerInDb = async () => {
  const collectionName = "players";
  try {
    const playersCollectionRef = collection(firestoreDb, collectionName);

    const docRef = await getDocs(query(playersCollectionRef));

    const result = [];
    docRef.docs.map((el) => result.push({...el.data(), id: el.id}));
    if (result.length) {
      console.log("Гравці знайдені");
    } else console.log("Не знайдено жодного гравця");

    return result;
  } catch (error) {
    console.error("Помилка при отриманні данних", error);
  }
};

export const fetchPlayers = async () => {
  try {
    const playerDocs = await findAllPlayerInDb();
    return playerDocs.map(doc => doc); 
  } catch (error) {
    console.error('Помилка при завантаженні гравців:', error);
    return [];
  }
};