const pushToMongoAndManageDB = (gameRoom, gameSchema, Game) => {

    const newGame = new Game({
        history: gameRoom.game.getHistory(),
        playerOneUsername: gameRoom.players[0],
        playerTwoUsername: gameRoom.players[1],
        date: new Date(),
        winner: true
    });
    
    newGame.save()
        .then(game => res.json(game))
        .catch(error => console.error(error));

    gameSchema
}

module.exports = { pushToMongoAndManageDB };
