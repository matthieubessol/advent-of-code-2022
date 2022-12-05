const fs = require("fs");

const data = fs.readFileSync("./data.txt", "utf-8");

const nbCranes = 9;
const cranes = new Array(nbCranes);

const rows = data.split("\n");

rows.forEach((row) => {
  if (row.includes("[")) {
    row = row
      .replace(/     /gm, "[]")
      .replace(/    /gm, "[]")
      .replace(/\]\[/gm, "] [")
      .split(" ")
      .forEach((crane, index) => {
        if (crane[1] && crane[1].match(/[A-Z]/gm)?.length) {
          if (!cranes[index]) {
            cranes[index] = [];
          }

          cranes[index].push(crane[1]);
        }
      });
  }
});

const instructions = rows
  .filter((row) => row.includes("move"))
  .map((row) => {
    const instruction = row
      .split(" ")
      .filter((str) => parseInt(str, 10))
      .map((str) => parseInt(str, 10));

    return {
      move: instruction[0],
      from: instruction[1] - 1,
      to: instruction[2] - 1,
    };
  });

const moveItems = (cranesToMove, shouldReverse = false) => {
  let cranesCopy = [...cranesToMove];
  instructions.forEach((instruction) => {
    let toMove = cranesCopy[instruction.from].slice(0, instruction.move);
    if (shouldReverse) {
      toMove = toMove.reverse();
    }

    cranesCopy[instruction.from] = cranesCopy[instruction.from].slice(
      instruction.move,
      cranesCopy[instruction.from].length
    );
    cranesCopy[instruction.to] = [...toMove, ...cranesCopy[instruction.to]];
  });

  return cranesCopy.map((crane) => crane[0]).join("");
};

const result1 = moveItems(cranes, true);

console.log({ result1 });

// 2
const result2 = moveItems(cranes, false);

console.log({ result2 });
