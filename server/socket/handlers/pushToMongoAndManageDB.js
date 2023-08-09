/**
 * Push to Mongo and Manage Database
 * This module handles saving game data to MongoDB and managing the database size.
 */

const { MongoClient } = require("mongodb");

// Maximum number of elements in the database
const MAX_ELEMENT_LIMIT = 100;

/**
 * Push game data to MongoDB and manage the database size.
 * @param {Object} gameRoom - The game room object.
 * @param {Object} gameSchema - The mongoose game schema.
 * @param {Object} Game - The mongoose game model.
 */
async function pushToMongoAndManageDB(gameRoom, gameSchema, Game) {
  const gameHistory = gameRoom.game.getGameHistory();

  if (gameHistory.length < 2) { // push to mongo only if both players have made at least one move
    console.log('Not enough moves to save the game');
    return;
  }


  console.log("PUSHING TO MONGO")

  const newGame = new Game({
      history: gameHistory,
      playerOneData: gameRoom.players[0],
      playerTwoData: gameRoom.players[1],
      date: new Date(),
      result: gameRoom.winner
  });

  console.log(newGame.history)
  
  newGame.save()
        .then(() => console.log('Game saved to database'))
        .catch(error => console.log(error));


    let gameCount = await Game.countDocuments();
    if (gameCount > MAX_ELEMENT_LIMIT) {
        console.log("DELETING OLDEST GAME FROM MONGO")
        const oldestGame = await Game.findOne().sort({ date: 1 });
        if (oldestGame) {
          Game.findByIdAndRemove(oldestGame._id)
              .then(() => console.log('Oldest game deleted'))
              .catch(error => console.log(error));
        }
    }

}

module.exports = { pushToMongoAndManageDB }
