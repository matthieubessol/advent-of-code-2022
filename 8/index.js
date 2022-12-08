const fs = require("fs");

const rows = fs
  .readFileSync("./data.txt", "utf-8")
  .split("\n")
  .map((a) => a.split("").map((a) => parseInt(a, 10)))
  .filter((a) => a.length);

const visibleTreeMap = rows.map((row, i) =>
  row.map((tree, j) => {
    if (i === 0 || i === rows.length - 1 || j === 0 || j === row.length - 1) {
      return +true;
    }

    const isVisibleFromLeft = row.slice(0, j).every((a) => a < tree);
    const isVisibleFromRight = row
      .slice(j + 1, row.length)
      .every((a) => a < tree);
    const isVisibleFromTop = rows
      .map((r) => r[j])
      .slice(0, i)
      .every((a) => a < tree);
    const isVisibleFromBottom = rows
      .map((r) => r[j])
      .slice(i + 1, rows.length)
      .every((a) => a < tree);

    return +(
      isVisibleFromLeft ||
      isVisibleFromRight ||
      isVisibleFromTop ||
      isVisibleFromBottom
    );
  })
);

const totalVisible = visibleTreeMap.flat().filter((a) => a).length;
console.log({ totalVisible });

// 2
const countVisible = (currentTree, trees) => {
  let count = 0;
  if (!trees) return count;

  for (const tree of trees) {
    if (tree < currentTree) {
      count++;
    }

    if (tree >= currentTree) {
      count++;
      break;
    }
  }

  return count;
};

const treeScoreMap = rows.map((row, i) =>
  row.map((tree, j) => {
    // Left
    const nbVisibleLeft = countVisible(tree, row.slice(0, j).reverse());
    const nbVisibleRight = countVisible(tree, row.slice(j + 1, row.length));
    const nbVisibleTop = countVisible(
      tree,
      rows
        .map((r) => r[j])
        .slice(0, i)
        .reverse()
    );
    const nbVisibleBottom = countVisible(
      tree,
      rows.map((r) => r[j]).slice(i + 1, rows.length)
    );

    return nbVisibleLeft * nbVisibleRight * nbVisibleTop * nbVisibleBottom;
  })
);

const bestScore = Math.max(...treeScoreMap.flat());
console.log(bestScore);
