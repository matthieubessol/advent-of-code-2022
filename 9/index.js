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

  // let tails = new Array(ropeLength).fill({ x: 0, y: 0 });

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
        // let [tempX, tempY] = tails[j];
        // let beforeX = 0;
        // let beforeY = 0;

        // if (i > 0) {
        //   beforeX = tails[j - 1].x;
        //   beforeY = tails[j - 1].y;
        // } else {
        //   beforeX = headCurrentPosition.x;
        //   beforeY = headCurrentPosition.y;
        // }

        if (headCurrentPosition.x - tailCurrentPosition.x > 1) {
          tailCurrentPosition.x += 1;
          tailCurrentPosition.y = headCurrentPosition.y;
        }

        if (headCurrentPosition.x - tailCurrentPosition.x < -1) {
          tailCurrentPosition.x -= 1;
          tailCurrentPosition.y = headCurrentPosition.y;
        }

        if (headCurrentPosition.y - tailCurrentPosition.y > 1) {
          tailCurrentPosition.y += 1;
          tailCurrentPosition.x = headCurrentPosition.x;
        }

        if (headCurrentPosition.y - tailCurrentPosition.y < -1) {
          tailCurrentPosition.y -= 1;
          tailCurrentPosition.x = headCurrentPosition.x;
        }

        // tails[i] = tailCurrentPosition;

        if (j === ropeLength - 1) {
          // positionsVisited.push(tails[j]);
          positionsVisited.push({
            ...tailCurrentPosition,
          });
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
