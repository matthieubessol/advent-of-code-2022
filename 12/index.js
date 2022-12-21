const fs = require("fs");

const levels = fs
  .readFileSync("./data.txt", "utf-8")
  .trimEnd()
  .split("\n")
  .map((row) => row.split(""));

const chars = "abcdefghijklmnopqrstuvwxyz";

let isAtTop = false;
let visitedPlaces = [];

const getBestNextSteps = (x, y, visitedItems = []) => {
  let currentElevation = levels[y][x];
  if (currentElevation === "S") currentElevation = "a";
  if (currentElevation === "E") return visitedItems;
  let nextElevation = chars[chars.indexOf(currentElevation) + 1];
  if (currentElevation === "z") {
    nextElevation = "E";
  }

  const possibilities = [
    { x: x, y: y - 1 },
    { x: x - 1, y: y },
    { x: x + 1, y: y },
    { x: x, y: y + 1 },
  ]
    .filter(
      (position) =>
        position.x >= 0 &&
        position.y >= 0 &&
        position.x < levels[0].length &&
        position.y < levels.length
    )
    .filter((position) => {
      const alreadyVisited = visitedItems.filter(
        (oldPosition) =>
          oldPosition.x === position.x && oldPosition.y === position.y
      );

      if (alreadyVisited?.length) {
        return false;
      }

      let possibleElevations = [currentElevation, nextElevation];
      if (nextElevation === "z") {
        possibleElevations = [...possibleElevations, "E"];
      }

      return possibleElevations.includes(levels[position.y][position.x]);
    })
    .map((position) => {
      const nextSteps = getBestNextSteps(position.x, position.y, [
        ...visitedItems,
        position,
      ]);

      return nextSteps;
    })
    .filter((nextSteps) => {
      if (!nextSteps) {
        return false;
      }

      const lastPosition = nextSteps?.[nextSteps?.length - 1];
      return lastPosition && levels[lastPosition.y][lastPosition.x] === "E";
    })
    .sort((a, b) => a?.length - b?.length);

  if (!possibilities) {
    return null;
  }

  return possibilities?.[0];
};

let currentPosition;
levels.forEach((level, y) =>
  level.forEach((char, x) => {
    if (char === "S") {
      currentPosition = { x, y };
    }
  })
);

visitedPlaces.push(currentPosition);

// const currentPosition = visitedPlaces[visitedPlaces.length - 1];
console.log({ currentPosition });
console.time("time");
const possibilities = getBestNextSteps(currentPosition.x, currentPosition.y);
console.timeEnd("time");
console.log(possibilities?.length);
