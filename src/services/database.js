export function saveData(identifier, data) {
  localStorage.setItem(identifier, JSON.stringify(data));
}

export function getData(identifier) {
  const dataString = window.localStorage.getItem(identifier);
  const data = dataString ? JSON.parse(dataString) : '';
  return data;
}

export function removeData(identifier) {
  window.localStorage.removeItem(identifier);
}