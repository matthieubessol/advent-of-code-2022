const fs = require("fs");

const instructions = fs
  .readFileSync("./data.txt", "utf-8")
  .trimEnd()
  .split("\n")
  .map((row) => row.split(" "))
  .map((instruction) => [instruction[0], parseInt(instruction[1], 10)]);

const getTailPositions = (ropeLength) => {
  let positionsVisited = [];
  const headCurrentPosition = {
    x: 0,
    y: 0,
  };
  const tailCurrentPosition = {
    x: 0,
    y: 0,
  };

  positionsVisited.push(tailCurrentPosition);

  let tails = new Array(ropeLength).fill({ x: 0, y: 0 });

  instructions.forEach((instruction) => {
    const direction = instruction[0];
    const steps = instruction[1];

    for (let i = 0; i < steps; i++) {
      switch (direction) {
        case "R":
          headCurrentPosition.x += 1;
          break;
        case "L":
          headCurrentPosition.x -= 1;
          break;
        case "U":
          headCurrentPosition.y += 1;
          break;
        case "D":
          headCurrentPosition.y -= 1;
          break;
        default:
          break;
      }

      for (let j = 0; j < ropeLength; j++) {
        let tailCurrentPosition = { ...tails[j] };
        let beforePosition = { x: 0, y: 0 };

        if (j > 0) {
          beforePosition = {
            ...tails[j - 1],
          };
        } else {
          beforePosition = {
            ...headCurrentPosition,
          };
        }

        let diffX = Math.abs(beforePosition.x - tailCurrentPosition.x);
        let diffY = Math.abs(beforePosition.y - tailCurrentPosition.y);

        if (diffX > 1 && !diffY) {
          tailCurrentPosition.x +=
            beforePosition.x - tailCurrentPosition.x > 0 ? 1 : -1;
        } else if (diffY > 1 && !diffX) {
          tailCurrentPosition.y +=
            beforePosition.y - tailCurrentPosition.y > 0 ? 1 : -1;
        } else if (diffX > 1 || diffY > 1) {
          tailCurrentPosition.x +=
            beforePosition.x - tailCurrentPosition.x > 0 ? 1 : -1;
          tailCurrentPosition.y +=
            beforePosition.y - tailCurrentPosition.y > 0 ? 1 : -1;
        }

        if (Math.abs(diffX) > 1 || Math.abs(diffY) > 1) {
          tails[j] = {
            ...tailCurrentPosition,
          };
        }

        if (j === ropeLength - 1) {
          positionsVisited.push(tails[j - 1]);
        }
      }
    }
  });

  return [...new Set(positionsVisited.map((a) => JSON.stringify(a)))].length;
};

const nbPositions = getTailPositions(1);
console.log({ nbPositions });

// 1
const nbPositionsBis = getTailPositions(10);
console.log({ nbPositionsBis });
console.log("**************");
