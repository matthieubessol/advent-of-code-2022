const fs = require("fs");

const data = fs.readFileSync("./data.txt", "utf-8");

const isRock = (p) => ["A", "X"].includes(p);
const isPaper = (p) => ["B", "Y"].includes(p);
const isScisor = (p) => ["C", "Z"].includes(p);
const rock = 1;
const paper = 2;
const scissor = 3;
const win = 6;
const draw = 3;

const haveIWin = (myPick, opponentPick) =>
  (isRock(myPick) && isScisor(opponentPick)) ||
  (isPaper(myPick) && isRock(opponentPick)) ||
  (isScisor(myPick) && isPaper(opponentPick));

const isDraw = (myPick, opponentPick) =>
  (isRock(myPick) && isRock(opponentPick)) ||
  (isScisor(myPick) && isScisor(opponentPick)) ||
  (isPaper(myPick) && isPaper(opponentPick));

const games = data.split("\n").filter((a) => a?.length === 3);
const points = games.map((row) => {
  let picks = row.split(" ");
  let nbPoints = 0;
  const isWin = haveIWin(picks[1], picks[0]);
  nbPoints += isWin ? win : 0;
  nbPoints += isDraw(picks[1], picks[0]) ? draw : 0;
  if (isRock(picks[1])) nbPoints += rock;
  if (isPaper(picks[1])) nbPoints += paper;
  if (isScisor(picks[1])) nbPoints += scissor;

  return nbPoints;
});

const total = points.reduce((a, b) => a + b);

console.log({ total });

// 2
const shouldILoose = (p) => p === "X";
const shouldIDraw = (p) => p === "Y";
const shouldIWin = (p) => p === "Z";

const rockPick = {
  winAgainst: "C",
  drawAgainst: "A",
  looseAgainst: "B",
};

const paperPick = {
  winAgainst: "A",
  drawAgainst: "B",
  looseAgainst: "C",
};

const scisorPick = {
  winAgainst: "B",
  drawAgainst: "C",
  looseAgainst: "A",
};

const pointsByPick = {
  A: rock,
  B: paper,
  C: scissor,
};

const pointsBis = games.map((row) => {
  let picks = row.split(" ");
  let nbPoints = 0;

  if (shouldIWin(picks[1])) {
    nbPoints += win;
    if (isRock(picks[0])) nbPoints += pointsByPick[rockPick.looseAgainst];
    if (isPaper(picks[0])) nbPoints += pointsByPick[paperPick.looseAgainst];
    if (isScisor(picks[0])) nbPoints += pointsByPick[scisorPick.looseAgainst];
  }

  if (shouldIDraw(picks[1])) {
    nbPoints += draw;
    if (isRock(picks[0])) nbPoints += rock;
    if (isPaper(picks[0])) nbPoints += paper;
    if (isScisor(picks[0])) nbPoints += scissor;
  }

  if (shouldILoose(picks[1])) {
    if (isRock(picks[0])) nbPoints += pointsByPick[rockPick.winAgainst];
    if (isPaper(picks[0])) nbPoints += pointsByPick[paperPick.winAgainst];
    if (isScisor(picks[0])) nbPoints += pointsByPick[scisorPick.winAgainst];
  }

  return nbPoints;
});

const totalBis = pointsBis.reduce((a, b) => a + b);

console.log({ totalBis });
