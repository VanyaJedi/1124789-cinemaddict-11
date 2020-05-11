
const ProfileRang = {
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIEBUFF: `movie buff`
};


export const getProfileRating = function (len) {
  if (len === 0) {
    return ``;
  } else if (len < 11) {
    return ProfileRang.NOVICE;
  } else if (len < 21) {
    return ProfileRang.FAN;
  }

  return ProfileRang.MOVIEBUFF;
};

export const SortType = {
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
