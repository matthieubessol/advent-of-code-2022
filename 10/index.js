const fs = require("fs");

const instructions = fs
  .readFileSync("./data.txt", "utf-8")
  .trimEnd()
  .split("\n")
  .map((row) => row.split(" "))
  .map((instruction) => [instruction[0], parseInt(instruction[1] || 0, 10)]);

const nbCyclesAddx = 2;
const CHAR_BY_ROW = 40;

let X = 1;
let cycles = [X];

checkRow = () => {
  const previousValue = cycles[cycles.length - 1];
  const cycle = cycles.length - 1;

  if (
    cycle % CHAR_BY_ROW === previousValue - 1 ||
    cycle % CHAR_BY_ROW === previousValue - 0 ||
    cycle % CHAR_BY_ROW === previousValue + 1
  ) {
    row += "#";
  } else {
    row += " ";
  }
};

let row = "";
instructions.forEach((instruction) => {
  const previousValue = cycles[cycles.length - 1];

  if (instruction[0] === "noop") {
    checkRow();
    cycles.push(previousValue);
  }

  if (instruction[0] === "addx") {
    for (let i = 0; i < nbCyclesAddx; i++) {
      checkRow();
      if (i === nbCyclesAddx - 1) {
        cycles.push(previousValue + instruction[1]);
      } else {
        cycles.push(previousValue);
      }
    }
  }
});

const getValueAfterXCycle = (nbCycle) => {
  return cycles[nbCycle];
};

const cyclesToCheck = [20, 60, 100, 140, 180, 220];
const score = cyclesToCheck
  .map((cycle) => cycle * getValueAfterXCycle(cycle - 1))
  .reduce((a, b) => a + b);

// 1
console.log({ score });
// 2
new Array(6).fill(row).forEach((line, index) => {
  console.log(line.slice(index * CHAR_BY_ROW, (index + 1) * CHAR_BY_ROW));
});
