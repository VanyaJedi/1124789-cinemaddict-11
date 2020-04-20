const months = new Map(
    [
      [0, `January`],
      [1, `February`],
      [2, `March`],
      [3, `April`],
      [4, `May`],
      [5, `June`],
      [6, `July`],
      [7, `August`],
      [8, `September`],
      [9, `October`],
      [10, `November`],
      [11, `December`]
    ]
);

const COUNTRIES = [`Russia`, `USA`, `North Korea`, `France`];

const FILM_NAMES = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `Harry Potter`,
  `The Ring`,
  `The Lord of the rings`,
  `Scrubs`,
  `Hachiko`
];

const POSTERS = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`];
const DIRECTORS = [`Anthony Mann`, `Steven Spilberg`, `Tom Cruz`, `Sergey Bodrov`];
const GENRES = [`Detective`, `Drama`, `Fantasy`, `Mystery`, `Noir`, `Trash`];
const DESCRIPTIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const FILM_DESC = DESCRIPTIONS.split(`. `);
const SMILES = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`];

const getRandomValue = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomDate = function (start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};


const generateComment = function () {
  const randomDate = getRandomDate(new Date(2012, 0, 1), new Date());

  return {
    smile: getRandomValue(SMILES),
    user: `User1`,
    message: `bla bla bla film suck`,
    date: randomDate
  };
};

const generateFilmCard = function (address) {
  const randomDate = getRandomDate(new Date(2012, 0, 1), new Date());
  const filmDuration = Math.floor(Math.random() * 300);
  const commentsArray = [];
  for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
    commentsArray.push(generateComment());
  }

  return {
    item: address,
    poster: getRandomValue(POSTERS),
    name: getRandomValue(FILM_NAMES),
    originalName: `origin name`,
    rate: Math.floor(Math.random() * 100) / 10,
    director: getRandomValue(DIRECTORS),
    authors: [`author1`, `author2`, `author3`, `author4`],
    actors: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`],
    releaseDate: {
      date: randomDate,
      day: randomDate.getDate() < 10 ? `0` + randomDate.getDate() : randomDate.getDate(),
      month: months.get(randomDate.getMonth()),
      year: randomDate.getFullYear()
    },
    duration: Math.floor(filmDuration / 60) + `h ` + (filmDuration % 60 === 0 ? `` : filmDuration % 60 + `m`),
    country: getRandomValue(COUNTRIES),
    genres: GENRES,
    desc: getRandomValue(FILM_DESC),
    comments: commentsArray,
    ageRate: Math.floor(Math.random() * 18) + `+`,
    addToWatchlist: false,
    watched: true,
    favourites: false
  };
};

export {generateFilmCard};
