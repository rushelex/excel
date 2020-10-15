import { storage } from "@core/utils";

function toHTML(key) {
  const model = storage(key);
  const id = +key.split(":")[1];
  const day = new Date(id).toLocaleDateString("ru");
  const hours = new Date(id).getHours();
  const minutes = new Date(id).getMinutes();
  const date = {
    day: day,
    hours: hours < 10 ? `0${hours}` : hours,
    minutes: minutes < 10 ? `0${minutes}` : minutes,
  };

  return `
    <li class="db__record">
      <a href="#excel/${id}">${model.title}</a>
      <strong>${date.day} в ${date.hours}:${date.minutes}</strong>
    </li>
  `;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes("excel")) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`;
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>
    <ul class="db__list">
       ${keys.map(toHTML).join("")}
    </ul>
  `;
}
