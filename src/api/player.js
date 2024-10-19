import { getDatabase, ref as dbRef, set, push, get, child, update, remove } from 'firebase/database';

// Функция для создания игрока в базе данных
export const createPlayerInDb = async (playerData) => {
  try {
    const db = getDatabase();
    const newPlayerRef = push(ref(db, 'players'));
    const playerWithTeams = {
      ...playerData,
      teams: [],
    };
    await set(newPlayerRef, playerWithTeams);
    console.log('Гравець успішно створений', newPlayerRef.key);
    return newPlayerRef.key; // Возвращаем сгенерированный ключ игрока
  } catch (error) {
    console.error('Помилка при додаванні гравця:', error);
  }
};

// Функция для получения всех игроков из базы данных
export const findAllPlayerInDb = async () => {
  try {
    const db = getDatabase();
    const playersRef = ref(db, 'players');
    const snapshot = await get(playersRef);

    if (snapshot.exists()) {
      const playersData = snapshot.val();
      // Преобразуем объект в массив с добавлением ID игрока
      const result = Object.keys(playersData).map((key) => ({
        id: key,
        ...playersData[key],
      }));
      return result;
    } else {
      console.warn('Гравців не знайдено');
      return [];
    }
  } catch (error) {
    console.error('Помилка при отриманні данних:', error);
  }
};

// Функция для поиска игроков по ID команды
export const findPlayersByTeamId = async (teamId) => {
  try {
    const db = getDatabase();
    const playersRef = ref(db, 'players');
    const snapshot = await get(playersRef);

    if (snapshot.exists()) {
      const playersData = snapshot.val();
      // Фильтрация игроков по наличию teamId в их командах
      const filteredPlayers = Object.keys(playersData)
        .map((key) => ({
          id: key,
          ...playersData[key],
        }))
        .filter((player) => player.teams && player.teams.includes(teamId));

      return filteredPlayers;
    } else {
      console.warn('Гравців не знайдено');
      return [];
    }
  } catch (error) {
    console.error('Ошибка при загрузке игроков:', error);
    return [];
  }
};

// Функция для добавления игрока в команду
export const updatePlayerTeamInDb = async (playerId, team) => {
  const db = getDatabase();
  const playerRef = dbRef(db, `players/${playerId}`);

  // Обновляем данные игрока, добавляя ему команду и логотип
  await update(playerRef, {
    teamLogo: team.teamLogo, // Убедитесь, что teamLogo не undefined
    teamId: team.id // Убедитесь, что teamId не undefined
  });

  // Добавляем игрока в список игроков команды
  const teamPlayersRef = dbRef(db, `teams/${team.id}/players/${playerId}`);
  
  // Здесь вы также можете передавать все необходимые поля игрока
  await update(teamPlayersRef, {
    playerId,
    name: props.player.name, // Убедитесь, что name не undefined
    surname: props.player.surname // Убедитесь, что surname не undefined
  });
};
// Функция для удаления игрока
export const deletePlayerFromDb = async (playerId) => {
  try {
    const db = getDatabase();
    const playerRef = ref(db, `players/${playerId}`);
    await remove(playerRef);
    console.log(`Игрок с ID ${playerId} успешно удален`);
  } catch (error) {
    console.error('Ошибка при удалении игрока:', error);
  }
};
