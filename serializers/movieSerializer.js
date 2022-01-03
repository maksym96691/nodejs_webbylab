module.exports.showMovie = (movie) => {
  const actorArr = movie["Actors"];
  for (let i = 0; i < actorArr.length; i++) {
    delete actorArr[i].dataValues["movie_actors"];
  }
  return {
    data: movie,
    status: 1,
  };
};

module.exports.movieNotFound = (id) => {
  return {
    status: 0,
    error: {
      fields: {
        id,
      },
      code: "MOVIE_NOT_FOUND",
    },
  };
};

module.exports.movieDeletedSuccessfully = () => {
  return {
    status: 1,
  };
};

module.exports.movieExists = () => {
  return {
    status: 0,
    error: {
      fields: {
        title: "NOT_UNIQUE",
      },
      code: "MOVIE_EXISTS",
    },
  };
};

module.exports.movieUpdatedSuccessfully = (movie) => {
  return {
    data: movie,
    message: "Movie is updated successfully!",
  };
};

module.exports.moviesImported = (movies, importedNumber, totalNumber) => {
  return {
    data: movies,
    meta: {
      imported: importedNumber, // imported fewer since some actors might already be inside the database
      total: totalNumber, // total in the file
    },
    status: 1,
  };
};
