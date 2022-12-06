const fs = require("fs");

const code = fs
  .readFileSync("./data.txt", "utf-8")
  .split("\n")
  .filter((a) => a)[0];

const areAllCharactersDifferent = (string) => {
  const counts = {};
  for (let i = 0; i < string.length; i++) {
    counts[string[i]] = counts[string[i]] ? counts[string[i]] + 1 : 1;
  }

  return !Object.values(counts).filter((a) => a > 1).length;
};

const getMarkerIndex = (string, nbLength) => {
  let indexMarker = 0;
  for (indexMarker; indexMarker < string.length; indexMarker++) {
    const isMarker = areAllCharactersDifferent(
      string.slice(indexMarker, indexMarker + nbLength)
    );

    if (isMarker) {
      break;
    }
  }

  return indexMarker + nbLength;
};

console.log(getMarkerIndex(code, 4));

//2
console.log(getMarkerIndex(code, 14));
