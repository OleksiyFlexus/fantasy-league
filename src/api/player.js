import {
  getDatabase,
  ref as dbRef,
  set,
  push,
  get,
  update,
} from "firebase/database";

export const createPlayerInDb = async (playerData) => {
  try {
    const db = getDatabase();
    const newPlayerRef = push(ref(db, "players"));
    const playerWithTeams = {
      ...playerData,
      teams: [],
    };
    await set(newPlayerRef, playerWithTeams);
    console.log("Гравець успішно створений", newPlayerRef.key);
    return newPlayerRef.key;
  } catch (error) {
    console.error("Помилка при додаванні гравця:", error);
  }
};

export const findAllPlayerInDb = async () => {
  try {
    const db = getDatabase();
    const playersRef = ref(db, "players");
    const snapshot = await get(playersRef);
    if (snapshot.exists()) {
      const playersData = snapshot.val();
      const result = Object.keys(playersData).map((key) => ({
        id: key,
        ...playersData[key],
      }));
      return result;
    } else {
      console.warn("Гравців не знайдено");
      return [];
    }
  } catch (error) {
    console.error("Помилка при отриманні данних:", error);
  }
};

export const findPlayersByTeamId = async (teamId) => {
  try {
    const db = getDatabase();
    const playersRef = dbRef(db, "players");
    const snapshot = await get(playersRef);
    if (snapshot.exists()) {
      const playersData = snapshot.val();
      const filteredPlayers = Object.keys(playersData)
        .map((key) => ({
          id: key,
          ...playersData[key],
        }))
        .filter((player) => player.teamId === teamId);
      return filteredPlayers;
    } else {
      console.warn("Гравців не знайдено");
      return [];
    }
  } catch (error) {
    console.error("Ошибка при загрузке игроков:", error);
    return [];
  }
};

export const updatePlayerTeamInDb = async (playerId, team, player) => {
  try {
    const db = getDatabase();
    const playerRef = dbRef(db, `players/${playerId}`);
    const updates = {};

    if (team && team.id) {
      updates.teamLogo = team.teamLogo;
      updates.teamId = team.id;
    } else {
      updates.teamLogo = null;
      updates.teamId = null;
    }

    updates.photo = player.photo || "";

    await update(playerRef, updates);
    console.log("Обновления для игрока:", updates);

    if (team && team.id) {
      const teamPlayersRef = dbRef(db, `teams/${team.id}/players/${playerId}`);
      await update(teamPlayersRef, {
        playerId,
        name: player.name,
        surname: player.surname,
        photo: player.photo || "",
      });
    }
  } catch (error) {
    console.error("Ошибка при обновлении игрока в команде:", error);
    throw error;
  }
};
