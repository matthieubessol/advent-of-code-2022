const fs = require("fs");

const data = fs.readFileSync("./data.txt", "utf-8");

const dataSplitted = data.split("\n");
let caloriesByElf = [];
let elfIndex = 0;
dataSplitted.forEach((calorie) => {
  if (!caloriesByElf[elfIndex]) {
    caloriesByElf[elfIndex] = [];
  }
  if (calorie) {
    caloriesByElf[elfIndex].push(parseInt(calorie, 10));
  } else {
    elfIndex++;
  }
});

const dataByElf = caloriesByElf.map((el) => el.reduce((a, b) => a + b));

const getMaxCalories = (d) => d.sort((a, b) => b - a)?.[0];

const maxCalories = getMaxCalories(dataByElf);

console.log(maxCalories);

// 2
const getTopThreeMaxCalories = (d) =>
  d
    .sort((a, b) => b - a)
    ?.slice(0, 3)
    .reduce((a, b) => a + b);
const topThrees = getTopThreeMaxCalories(dataByElf);

console.log(topThrees);
