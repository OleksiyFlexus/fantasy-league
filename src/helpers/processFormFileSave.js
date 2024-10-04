import { getDownloadURL, uploadBytes } from '@firebase/storage';

/**
 * processFormFileSave saves the specified file to Firebase Storage.
 * @param ref The storage reference where the file will be saved.
 * @param file The file to be saved. It can be a File object or a string representing a URL.
 * @returns A Promise that resolves with the URL of the saved file.
 */
export const processFormFileSave = async (ref, file) => {
  if (typeof file === 'string') {
    return Promise.resolve(file);
  }
  return uploadBytes(ref, file).then((uploadResult) => getDownloadURL(uploadResult.ref));
};