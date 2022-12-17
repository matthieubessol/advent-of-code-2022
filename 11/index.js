const fs = require("fs");

let monkeys = fs
  .readFileSync("./data.txt", "utf-8")
  .trimEnd()
  .split("Monkey")
  .map((monkeyRows) =>
    monkeyRows
      .split("\n")
      .slice(1, monkeyRows?.length)
      .map((row) => row.trim())
      .filter((a) => a)
  )
  .filter((a) => a?.length)
  .map((monkeyInfo, key) => {
    const testInfo = monkeyInfo[2].split(": ")[1].split(" by ");
    const operationInfo = monkeyInfo[1].split(" = ")[1].split(" ");

    return {
      id: key,
      items: monkeyInfo[0]
        .split(": ")[1]
        .split(", ")
        .map((a) => parseInt(a, 10)),
      mathOperation: {
        first: parseInt(operationInfo[0], 10) || operationInfo[0],
        operation: operationInfo[1],
        second: parseInt(operationInfo[2], 10) || operationInfo[2],
      },
      test: {
        operation: testInfo[0],
        value: parseInt(testInfo[1], 10),
      },
      successMonkey: parseInt(monkeyInfo[3].split("monkey ")[1], 10),
      failMonkey: parseInt(monkeyInfo[4].split("monkey ")[1], 10),
      numberOfInspections: 0,
    };
  });

let monkeysCopy = JSON.parse(JSON.stringify(monkeys));

const modulo = monkeys.reduce((a, b) => a * b.test.value, 1);

const checkItem = (monkey, item, divide = false) => {
  // Get new value
  let newItemValue = 0;
  let first =
    typeof monkey.mathOperation.first === "number"
      ? monkey.mathOperation.first
      : item;
  let second =
    typeof monkey.mathOperation.second === "number"
      ? monkey.mathOperation.second
      : item;
  switch (monkey.mathOperation.operation) {
    case "+":
      newItemValue = first + second;
      break;
    case "*":
      newItemValue = first * second;
    default:
      break;
  }
  if (divide) newItemValue = parseInt(newItemValue / 3, 10);

  // Check test
  let success = false;
  if (monkey.test.operation === "divisible") {
    success = newItemValue % monkey.test.value === 0;
  }

  if (!divide) {
    newItemValue = newItemValue % modulo;
  }

  monkeys[success ? monkey.successMonkey : monkey.failMonkey].items.push(
    newItemValue
  );
  monkey.numberOfInspections += 1;
};

let nbRound = 20;
for (let i = 0; i < nbRound; i++) {
  monkeys.forEach((monkey) => {
    monkey.items.forEach((item) => {
      checkItem(monkey, item);
    });
    monkey.items = [];
  });
}

const monkeyBusinessScoreFirst = monkeys
  .map((a) => a.numberOfInspections)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((a, b) => a * b);

console.log(monkeyBusinessScoreFirst);

nbRound = 10000;
monkeys = monkeysCopy;
for (let i = 0; i < nbRound; i++) {
  monkeys.forEach((monkey) => {
    monkey.items.forEach((item) => {
      checkItem(monkey, item, false);
    });
    monkey.items = [];
  });
}

const monkeyBusinessScoreSecond = monkeys
  .map((a) => a.numberOfInspections)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((a, b) => a * b);

console.log(monkeyBusinessScoreSecond);
