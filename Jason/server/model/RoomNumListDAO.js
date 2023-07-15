
module.exports = class RoomNumListDAO {

    static async createItem(client, newRoomNum) {
     
        const result = await client.db("ChessGames").collection("roomNums").insertOne({roomNum: newRoomNum});
        console.log(`New roomNum created with the following id: ${result.insertedId}`);
    }


    static async getAllRoomNums(client) {
        const result = await client.db("ChessGames").collection("roomNums").find().toArray();
        return result;
    }

}