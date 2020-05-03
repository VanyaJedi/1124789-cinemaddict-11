

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

