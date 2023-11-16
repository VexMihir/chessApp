/**
 * Aliases for ChessApp Socket.IO Events and Draw States
 * This module defines various aliases for Socket.IO events and draw states used throughout the ChessApp server.
 */

module.exports = {
    /**
     * Socket.IO Events
     */
    EVENTS: {
        CONNECTION: 'connection',
        DISCONNECT: 'disconnect',
        PLAYER_DISCONNECTED: 'player disconnected',
        JOIN_ROOM: 'join room',
        JOIN_AS_SPECTATOR: 'join as spectator',
        MOVE: 'move',
        ERROR: 'error',
        ERROR_MOVING: 'error moving',
        ROOM_NOT_EXIST: "room not exist",
        START_GAME: 'start game',
        USER_LIST_UPDATE: 'user list update',
        ROOM_FULL: 'room full',
        CHECK_IF_ROOM_FULL: 'is room full',
        MOVE_MADE: 'moveMade',
        DRAW_OFFERED: 'drawOffered',
        DRAW_ACCEPTED: 'drawAccepted',
        DRAW_DECLINED: 'drawDeclined',
        DRAW_RESCINDED: 'drawRescinded',
        CHECKMATE: 'checkmate',
        RESIGNATION: 'resignation',
        GAME_OVER_DRAW: 'game over draw',
        TIME_UPDATES: 'time update',
        TIMEOUT: 'timeout',
        GAME_CURRENT_FEN: 'game current fen',
        GAME_CURRENT_HISTORY: 'game current history',
        FIRST_PLAYER_JOINED: 'first player joined',
    },

    /**
     * Draw Offered States
     */
    OFFERED_DRAW_STATES: {
        OFFERED: 'offered',
        ACCEPTED: 'accepted',
        DECLINED: 'declined',
        RESCINDED: 'rescinded'
    },

    /**
     * Draw Reasons
     */
    DRAW_REASONS : {
        STALEMATE: 'stalemate',
        THREEFOLD_REPETITION: 'threefold repetition',
        INSUFFICIENT_MATERIAL: 'insufficient material',
        FIFTY_MOVE_RULE: 'fifty move rule',
        DRAW_ACCEPTED: 'draw accepted' 
    }
};
