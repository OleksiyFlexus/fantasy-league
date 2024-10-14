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
    const querySnapshot = await getDocs(query(teamCollectionRef));

    const result = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return result;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
    return []; 
  }
};
