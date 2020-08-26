import { range } from "@/core/utils";

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === "cell";
}

export function matrix(first, target) {
  const cols = range(first.id(true).col, target.id(true).col);
  const rows = range(first.id(true).row, target.id(true).row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key, { col, row }) {
  const MIN_VALUE = 0;

  switch (key) {
    case "Enter":
    case "ArrowDown":
      row++;
      break;
    case "Tab":
    case "ArrowRight":
      col++;
      break;
    case "ArrowUp":
      if (row > MIN_VALUE) row--;
      break;
    case "ArrowLeft":
      if (col > MIN_VALUE) col--;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
