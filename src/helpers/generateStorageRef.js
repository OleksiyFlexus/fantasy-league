import { getStorage, ref } from '@firebase/storage';

/**
 * generateStorageRef generates a reference to the specified path in Firebase Storage.
 * @param path The path for which to generate the reference.
 * @returns The generated reference to the specified path in Firebase Storage.
 */
export const generateStorageRef = (path) => {
  const storage = getStorage();
  return ref(storage, path);
};