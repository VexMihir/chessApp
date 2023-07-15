const { MongoClient, ObjectId } = require("mongodb");

const uri = "stub";
const MAX_ELEMENT_LIMIT = 5;

async function pushToMongoAndManageDB(gameRoom, gameSchema, Game) {
  const newGame = new Game({
      history: gameRoom.game.getHistory(),
      playerOneUsername: gameRoom.players[0],
      playerTwoUsername: gameRoom.players[1],
      date: new Date(),
      // TODO: get winner info for mongo
      winner: true
  });

  let JSONGame = JSON.stringify(newGame)

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db("ChessGames");
    let collection = db.collection("Games");
    let count = await collection.countDocuments();
    if (count >= MAX_ELEMENT_LIMIT) {
        // delete
        let everything = await collection.find();
        let collectionAsArr = await everything.toArray()
        let remove = await collection.deleteOne({_id: collectionAsArr[0]._id})
        console.log(remove)
    }
    let res = await collection.insertOne(JSONGame);
    console.log(res)

    // NOTE: i don't know what the params look like are so this was to test. I am trusting that the object gameRoom passed in will work
    // let res = await collection.insertOne({
    //   history: ["1", "2"],
    //   playerOneUsername: "wallstar",
    //   playerTwoUsername: "dex",
    //   date: new Date(),
    //   winner: true,
    // });

    // console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

module.exports = { pushToMongoAndManageDB };
