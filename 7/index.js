const fs = require("fs");

const rows = fs
  .readFileSync("./data.txt", "utf-8")
  .split("\n")
  .filter((a) => a);

const isCommand = (row) => row.includes("$");

let tree = [
  {
    name: "/",
    type: "dir",
    files: [],
    directories: [],
    size: 0,
  },
];
let currentPath = [];

rows.forEach((row) => {
  const rowInfo = row.split(" ");

  const isChangeDirectory = rowInfo[0] === "$" && rowInfo[1] === "cd";

  if (isChangeDirectory && rowInfo[2].includes("..")) {
    currentPath.pop();
  } else if (isChangeDirectory) {
    currentPath.push(rowInfo[2]);
  }

  const currentPathName = currentPath[currentPath.length - 1];
  let currentTree = tree[0];
  currentPath.slice(1, currentPath.length).forEach((p) => {
    currentTree = currentTree.directories.find((t) => t.name === p);
  });

  // Result of ls
  if (!isChangeDirectory) {
    const fileSize = parseInt(rowInfo[0], 10);
    const isDir = rowInfo[0].includes("dir");
    if (isDir) {
      currentTree.directories.push({
        name: rowInfo[1],
        type: "dir",
        files: [],
        directories: [],
        size: 0,
      });
    }

    if (fileSize && !isDir) {
      currentTree.files.push({
        name: rowInfo[1],
        type: "file",
        size: fileSize,
      });
    }
  }
});

const maxSize = 100000;
let nodesToDelete = [];

const getFolderSize = (node) => {
  let currentFileSize = 0;
  const currentFileSizes = node.files.map(({ size }) => size);
  if (currentFileSizes?.length) {
    currentFileSize = currentFileSizes.reduce((a, b) => a + b);
  }

  const subFoldersSizes = node.directories.map((dir) => getFolderSize(dir));
  let subFoldersSize = 0;
  if (subFoldersSizes?.length) {
    subFoldersSize = subFoldersSizes.reduce((a, b) => a + b);
  }

  const currentTotal = currentFileSize + subFoldersSize;
  node.totalSize = currentTotal;

  if (node.totalSize < maxSize) {
    nodesToDelete.push(node);
  }

  return currentTotal;
};

getFolderSize(tree[0]);

const totalDeleted = nodesToDelete
  .map(({ totalSize }) => totalSize)
  .reduce((a, b) => a + b);
console.log({ totalDeleted });

// 2

const freeSpace = 70000000 - 43956976;
const needed = 30000000 - freeSpace;

let nodeToFreeSpace = [];
const getFolderToFreeSpace = (node) => {
  node.directories.map((dir) => getFolderToFreeSpace(dir));

  if (node.totalSize >= needed) {
    nodeToFreeSpace.push(node);
  }

  return node;
};

getFolderToFreeSpace(tree[0]);

const folterToDelete = nodeToFreeSpace
  .sort((a, b) => a.totalSize - b.totalSize)
  .map((a) => a.totalSize)[0];

console.log({ folterToDelete });
