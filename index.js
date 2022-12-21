const items = [
  {
    universe: 1,
    ratingSplit: {
      rating1: 0,
      rating2: 0,
      rating3: 103,
      rating4: 3,
      rating5: 4,
      rating6: 17,
      rating7: 105,
      rating8: 97,
      rating9: 20,
      rating10: 1,
    },
  },
  {
    universe: 2,
    ratingSplit: {
      rating1: 102,
      rating2: 0,
      rating3: 0,
      rating4: 3,
      rating5: 4,
      rating6: 17,
      rating7: 105,
      rating8: 97,
      rating9: 20,
      rating10: 1,
    },
  },
  {
    universe: 3,
    ratingSplit: {
      rating1: 0,
      rating2: 100,
      rating3: 0,
      rating4: 3,
      rating5: 4,
      rating6: 17,
      rating7: 105,
      rating8: 97,
      rating9: 20,
      rating10: 1,
    },
  },
  {
    universe: 4,
    ratingSplit: {
      rating1: 0,
      rating2: 0,
      rating3: 0,
      rating4: 3,
      rating5: 4,
      rating6: 17,
      rating7: 3,
      rating8: 97,
      rating9: 2,
      rating10: 1,
    },
  },
  {
    universe: 5,
    ratingSplit: {
      rating1: 203,
      rating2: 210,
      rating3: 0,
      rating4: 3,
      rating5: 4,
      rating6: 17,
      rating7: 10,
      rating8: 97,
      rating9: 20,
      rating10: 1,
    },
  },
  {
    universe: 6,
    ratingSplit: {
      rating1: 0,
      rating2: 10,
      rating3: 0,
      rating4: 3,
      rating5: 4,
      rating6: 17,
      rating7: 30,
      rating8: 97,
      rating9: 20,
      rating10: 1,
    },
  },
];

const keys = Object.keys(items[0].ratingSplit);
const maxTotal = Math.max(
  ...keys.map((key) =>
    items.map((a) => a.ratingSplit[key] || 0).reduce((a, b) => a + b)
  )
);
