const { MongoClient, ObjectId } = require("mongodb");

// TODO: remove uri and use env variable
const uri = "stub";

async function getAllDocuments() {
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
    let res = await collection.find();
    let ans = await res.toArray();

    // RETURNS ARRAY OF GAMES
    console.log(ans)
    return ans;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

async function getOneDocument(id) {
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
    let objID = new ObjectId(id);
    let ans = await collection.findOne({ _id: objID });

    // RETURNS GAME WITH GIVEN ID
    return ans;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

module.exports = { getAllDocuments, getOneDocument };