const Movie = require("../models/sequelize/Movie.js");
const Actor = require("../models/sequelize/Actor.js");

class ActorService {
  static async insert(params) {
    const newActor = await Actor.create({
      firstName: params.firstName,
      lastName: params.lastName,
    });

    return newActor;
  }
}

module.exports = ActorService;
