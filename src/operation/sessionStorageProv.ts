
// Pour le stockage local
/*export const setLocalStorageItem = (key:string, value:string) => {
  localforage.setItem(key, value);
};

export const removeLocalStorageItem = (key:string) => {
  localforage.removeItem(key);
};
*/
// Pour le stockage de session
export const setSessionStorageItem = (key:string, value:string) => {
  sessionStorage.setItem(key, value);
};

export const removeSessionStorageItem = (key:string) => {
  sessionStorage.removeItem(key);
};