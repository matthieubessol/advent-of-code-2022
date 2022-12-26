const fs = require("fs");

const levels = fs
  .readFileSync("./data.txt", "utf-8")
  .trimEnd()
  .split("\n")
  .map((row) => row.split(""));

const abc = "abcdefghijklmnopqrstuvwxyz";

/**
 *
 * @param {{x: number, y: number, step: number}} start
 * @param {{x: number, y: number, step: number}} end
 * @param {boolean} checkFirstLetter
 */
const bfs = (start, end, checkFirstLetter = false) => {
  let visitedItems = new Set();
  let queue = [];
  visitedItems.add(start);
  queue.push(start);
  while (queue.length) {
    const firstItem = queue.shift();

    if (firstItem.x === end.x && firstItem.y === end.y) {
      return firstItem.step;
    }

    const firstValue = levels[firstItem.y][firstItem.x];
    let firstIndex = abc.indexOf(firstValue);
    if (firstValue === "S") {
      firstIndex = abc.indexOf("a");
    } else if (firstValue === "E") {
      firstIndex = abc.indexOf("z");
    }

    const neighbors = [
      { x: firstItem.x, y: firstItem.y - 1, step: firstItem.step + 1 },
      { x: firstItem.x - 1, y: firstItem.y, step: firstItem.step + 1 },
      { x: firstItem.x + 1, y: firstItem.y, step: firstItem.step + 1 },
      { x: firstItem.x, y: firstItem.y + 1, step: firstItem.step + 1 },
    ].filter((position) => {
      const isValid = levels?.[position?.y]?.[position?.x];

      if (!isValid) {
        return false;
      }

      const contains = [...visitedItems].find(
        (item) => item.x === position.x && item.y === position.y
      );

      return !contains;
    });

    neighbors.forEach((position) => {
      const neighborValue = levels[position.y][position.x];

      if (neighborValue === "a" && checkFirstLetter) {
        return false;
      }

      let neighborIndex = abc.indexOf(neighborValue);

      if (neighborValue === "S") {
        neighborIndex = 0;
      } else if (neighborValue === "E") {
        neighborIndex = 25;
      }

      if (neighborIndex <= firstIndex + 1) {
        visitedItems.add(position);
        queue.push(position);
      }
    });
  }
};

let currentPosition;
let endPosition;
levels.forEach((level, y) =>
  level.forEach((char, x) => {
    if (char === "S") {
      currentPosition = { x, y, step: 0 };
    }

    if (char === "E") {
      endPosition = { x, y, step: 0 };
    }
  })
);

console.log(bfs(currentPosition, endPosition));

// 2
const allStart = [];
levels.forEach((level, y) =>
  level.forEach((char, x) => {
    if (char === "S" || char === "a") {
      allStart.push({ x, y, step: 0 });
    }
  })
);

const min = allStart
  .map((currentPosition, index) => bfs(currentPosition, endPosition, true))
  .filter((a) => a)
  .sort((a, b) => a - b)?.[0];

console.log({ min });
