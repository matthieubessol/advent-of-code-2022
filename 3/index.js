const fs = require("fs");

const data = fs.readFileSync("./data.txt", "utf-8");

const dataSplitted = data.split("\n").filter((a) => a?.length);
const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const commonItems = dataSplitted.map((items) => {
  const nbLetters = items.length;
  const [first, second] = [
    items.slice(0, nbLetters / 2),
    items.slice(nbLetters / 2, nbLetters.length),
  ];

  const commons = [
    ...new Set(...first.split("").filter((char) => second.includes(char))),
  ];

  return commons[0];
});

const points = commonItems.map((char) => {
  return letters.indexOf(char) + 1;
});

const total = points.reduce((a, b) => a + b);

console.log({ total });

// 2
let itemsByGroup = [];
let groupIndex = 0;
dataSplitted.forEach((item, index) => {
  if (!itemsByGroup[groupIndex]) {
    itemsByGroup[groupIndex] = [];
  }
  itemsByGroup[groupIndex].push(item);

  if (index % 3 === 2) {
    groupIndex++;
  }
});

const commonChars = itemsByGroup
  .map((group) => {
    const commonBoth = group[0]
      .split("")
      .filter((char) => group[1].includes(char));

    const commonThree = [
      ...new Set(
        group[2].split("").filter((char) => commonBoth.includes(char))
      ),
    ];

    return commonThree[0];
  })
  .filter((a) => a);

const pointsBis = commonChars.map((char) => {
  return letters.indexOf(char) + 1;
});

const totalBis = pointsBis.reduce((a, b) => a + b);

console.log({ totalBis });
