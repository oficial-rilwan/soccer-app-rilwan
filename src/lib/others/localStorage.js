const localStorage = window.localStorage;

export const save = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));
export const get = (key) => JSON.parse(localStorage.getItem(key));
export const remove = (key) => localStorage.removeItem(key);
