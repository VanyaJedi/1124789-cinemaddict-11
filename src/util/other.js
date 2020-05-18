
const ProfileRang = {
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIEBUFF: `movie buff`
};

const RatingCount = {
  NOTHING: 0,
  NOVICE: 11,
  FAN: 21
};


export const getProfileRating = (len) => {
  if (len === RatingCount.NOTHING) {
    return ``;
  } else if (len < RatingCount.NOVICE) {
    return ProfileRang.NOVICE;
  } else if (len < RatingCount.FAN) {
    return ProfileRang.FAN;
  }

  return ProfileRang.MOVIEBUFF;
};

export const SortType = {
  BY_DATE: `date`,
  BY_RATE: `rate`,
  DEFAULT: `default`,
};


export const generateGenresObject = (movies) => {
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
