const fs = require("fs");

const data = fs.readFileSync("./data.txt", "utf-8");

const dataSplitted = data.split("\n").filter((a) => a?.length);

const pairs = dataSplitted.map((pairs) =>
  pairs
    .split(",")
    .map((pair) => pair.split("-").map((number) => parseInt(number, 10)))
);

const overlappedPairs = pairs.filter(
  ([first, second]) =>
    (first[0] >= second[0] && first[1] <= second[1]) ||
    (second[0] >= first[0] && second[1] <= first[1])
);

const nbOverlapped = overlappedPairs.length;
console.log(nbOverlapped);

// 2
const overlappedAll = pairs
  .map((pair) => {
    // Fill the array
    const pairFilled = pair.map((item) => {
      let currentNumbers = [];
      for (let i = item[0]; i <= item[1]; i++) {
        currentNumbers.push(i);
      }

      return currentNumbers;
    });

    return pairFilled[0].filter((value) => pairFilled[1].includes(value));
  })
  .filter((a) => a?.length);

const uniqueOverlapped = overlappedAll.length;
console.log(uniqueOverlapped);
