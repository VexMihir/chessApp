import Chessboard from 'chessboardjsx';
import Timer from './Timer';
import PropTypes from 'prop-types';
import roughSquare from './RoughJS/customRough.js' 
import { color } from '../constants';

const ChessboardPanel = ({
  timeForWhite,
  timeForBlack,
  usernameForWhite,
  usernameForBlack,
  orientation,
  fen,
  handleDrop,
}) => {
  const renderInfo = (time, username) => (
    <div className="flex items-center justify-between w-full my-1.5">
      <div className="text-white">{username}</div>
      <Timer timeInSeconds={time} />
    </div>
  );

  // decide which player's info to render at the top/bottom based on the orientation
  const topPlayerInfo = orientation === color.WHITE
    ? renderInfo(timeForBlack, usernameForBlack) 
    : renderInfo(timeForWhite, usernameForWhite);

  const bottomPlayerInfo = orientation === color.WHITE
    ? renderInfo(timeForWhite, usernameForWhite) 
    : renderInfo(timeForBlack, usernameForBlack);

  return (
    <div className="flex flex-col items-center pr-10">
      {topPlayerInfo}
      <Chessboard
        position={fen}
        orientation={orientation}
        darkSquareStyle={{ backgroundColor: 'CornFlowerBlue' }}
        lightSquareStyle={{ backgroundColor: 'White' }}
        onDrop={handleDrop}
        roughSquare={roughSquare}
      />
      {bottomPlayerInfo}
    </div>
  );
};

ChessboardPanel.propTypes = {
  timeForWhite: PropTypes.number.isRequired,
  timeForBlack: PropTypes.number.isRequired,
  usernameForWhite: PropTypes.string.isRequired,
  usernameForBlack: PropTypes.string.isRequired,
  orientation: PropTypes.string.isRequired,
  fen: PropTypes.string.isRequired,
  handleDrop: PropTypes.func.isRequired,
};

export default ChessboardPanel;
