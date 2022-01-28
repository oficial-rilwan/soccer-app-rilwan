export const save = (key, data) =>
  sessionStorage.setItem(key, JSON.stringify(data));
export const get = (key) => JSON.parse(sessionStorage.getItem(key));
export const remove = (key) => sessionStorage.removeItem(key);
