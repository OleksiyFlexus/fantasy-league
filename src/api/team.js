import { firestoreDb } from "@/firebase";
import { collection, addDoc, query, getDocs } from "firebase/firestore";

export const createTeamInDb = async (teamData) => {
  const collectionName = "teams";
  try {
    const teamCollectionRef = collection(firestoreDb, collectionName);

    const docRef = await addDoc(teamCollectionRef, teamData);

    console.log("Команда успішно створена ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Помилка при створенні команди: ", error);
  }
};

export const findAllTeamInDb = async () => {
  const collectionName = "teams";
  try {
    const teamCollectionRef = collection(firestoreDb, collectionName);

    const docRef = await getDocs(query(teamCollectionRef));

    const result = [];
    docRef.docs.map((el) => result.push({...el.data(), id: el.id}));
    if (result.length) {
      console.log("Команди знайдені");
    } else console.log("Не знайдено жодної команди");

    return result;
  } catch (error) {
    console.error("Помилка при отриманні данних", error);
  }
};
