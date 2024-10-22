import { database } from '@/firebase';
import { getDatabase, ref, ref as dbRef, push, set, onValue, get } from 'firebase/database';

export const createTeamInDb = async (teamData) => {
  try {
    const db = getDatabase();
    const newTeamRef = push(ref(db, 'teams'));
    
    const teamWithPlayers = {
      ...teamData,
      players: [],
    };
    
    await set(newTeamRef, teamWithPlayers);
    console.log('Команда успішно створена', newTeamRef.key);
    return newTeamRef.key; 
  } catch (error) {
    console.error('Помилка при створенні команди:', error);
  }
};

export const findAllTeamInDb = () => {
  return new Promise((resolve, reject) => {
      const teamsRef = dbRef(database, 'teams');

      onValue(teamsRef, (snapshot) => {
          const teamsData = snapshot.val();
          if (teamsData) {
              resolve(Object.keys(teamsData).map(key => ({
                  id: key,
                  ...teamsData[key]
              })));
          } else {
              resolve([]);
          }
      }, (error) => {
          console.error('Ошибка при загрузке команд:', error);
          reject(error);
      });
  });
};

export const findTeamById = async (teamId) => {
  try {
    const db = getDatabase();
    const teamsRef = ref(db, `teams/${teamId}`);
    const snapshot = await get(teamsRef);

    if (snapshot.exists()) {
      const teamData = snapshot.val();
      return {
        id: teamId,
        ...teamData,
      };
    } else {
      console.error(`Команда с ID ${teamId} не найдена`);
      return null;
    }
  } catch (error) {
    console.error('Помилка при отриманні даних команди:', error);
    return null;
  }
};
