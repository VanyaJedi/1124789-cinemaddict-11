

export const getProfileRating = function (len) {
  if (len === 0) {
    return ``;
  } else if (len < 11) {
    return `novice`;
  } else if (len < 21) {
    return `fan`;
  }

  return `movie buff`;
};

export const sortTypes = {
  BY_DATE: `date`,
  BY_RATE: `rate`,
  DEFAULT: `default`,
};


export const generateGenresObject = function (movies) {
  const allGenresArray = [];
  const genresCount = {};
  movies.forEach((movie) => {
    movie.genres.forEach((genre) => {
      if (!allGenresArray.includes(genre)) {
        allGenresArray.push(genre);
        genresCount[genre] = 1;
      } else {
        genresCount[genre]++;
      }
    });
  });
  return genresCount;
};
