const { MongoClient } = require("mongodb");

const MAX_ELEMENT_LIMIT = 5;

async function pushToMongoAndManageDB(gameRoom, gameSchema, Game) {
  console.log("PUSHING TO MONGO")
  const newGame = new Game({
      history: gameRoom.game.getGameHistory(),
      playerOneData: gameRoom.players[0],
      playerTwoData: gameRoom.players[1],
      date: new Date(),
      winner: gameRoom.winner
  });

  console.log(newGame.history)
  
  newGame.save()
        .then(() => console.log('Game saved to database'))
        .catch(error => console.log(error));

  if (Game.countDocuments() >= MAX_ELEMENT_LIMIT) {
    console.log("DELETING OLDEST GAME FROM MONGO")
    const oldestGame = await Game.findOne().sort({ date: 1 });
    await Game.deleteOne({ _id: oldestGame._id });
  }
}

module.exports = { pushToMongoAndManageDB }
