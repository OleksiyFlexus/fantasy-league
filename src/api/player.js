import { firestoreDb } from "@/firebase";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  query,
  getDocs,
  deleteDoc,
  where,
  arrayUnion,
} from "firebase/firestore";

export const createPlayerInDb = async (playerData) => {
  const collectionName = "players";
  try {
    const playersCollectionRef = collection(firestoreDb, collectionName);

    const playerWithTeams = {
      ...playerData,
      teams: [],
    };
    const docRef = await addDoc(playersCollectionRef, playerWithTeams);
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

    const result = docRef.docs.map((el) => ({ ...el.data(), id: el.id }));

    return result;
  } catch (error) {
    console.error("Помилка при отриманні данних", error);
  }
};

export const findPlayersByTeamId = async (teamId) => {
  const collectionName = "players";
  try {
    console.log("Загружаем игроков для команды с ID:", teamId);
    const playersCollectionRef = collection(firestoreDb, collectionName);
    const querySnapshot = await getDocs(
      query(playersCollectionRef, where("teams", "array-contains", teamId))
    );
    if (querySnapshot.empty) {
      console.warn("Нет игроков, связанных с данной командой.");
      return [];
    }
    const players = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Игроки, полученные из базы данных:", players);
    return players;
  } catch (error) {
    console.error("Ошибка при загрузке игроков:", error);
    return [];
  }
};

export const addPlayerToTeam = async (playerId, teamId) => {
  try {
    const teamRef = doc(firestoreDb, "teams", teamId);
    const playerRef = doc(firestoreDb, "players", playerId);
    await updateDoc(teamRef, {
      players: arrayUnion(playerId),
    });
    await updateDoc(playerRef, {
      teams: arrayUnion(teamId),
    });
    console.log(`Игрок ${playerId} добавлен в команду ${teamId}`);
  } catch (error) {
    console.error("Ошибка при добавлении игрока в команду:", error);
  }
};

export const deletePlayerFromDb = async (playerId) => {
  try {
    const playerRef = doc(firestoreDb, "players", playerId);
    await deleteDoc(playerRef);
    console.log(`Игрок с ID ${playerId} успешно удален`);
  } catch (error) {
    console.error("Ошибка при удалении игрока:", error);
  }
};
