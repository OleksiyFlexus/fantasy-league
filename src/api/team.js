import { firestoreDb } from "@/firebase";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";

export const createTeamInDb = async (teamData) => {
  const collectionName = "teams";
  try {
    const teamCollectionRef = collection(firestoreDb, collectionName);

    const teamWithPlayers = {
      ...teamData,
      players: [],
    };
    const docRef = await addDoc(teamCollectionRef, teamWithPlayers);
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

export const findTeamById = async (teamId) => {
  const collectionName = "teams";
  try {
    const teamCollectionRef = collection(firestoreDb, collectionName);
    const q = query(teamCollectionRef, where("id", "==", teamId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const team = querySnapshot.docs[0];
      return { ...team.data(), id: team.id };
    } else {
      console.error(`Команда с ID ${teamId} не найдена`);
      return null;
    }
  } catch (error) {
    console.error("Помилка при отриманні даних команди:", error);
    return null;
  }
};
