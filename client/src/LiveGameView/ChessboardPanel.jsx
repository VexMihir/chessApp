import Chessboard from 'chessboardjsx';
import Timer from './Timer';
import PropTypes from 'prop-types';
import roughSquare from './RoughJS/customRough.js' 

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

  return (
    <div className="flex flex-col items-center pr-10">
      {renderInfo(timeForWhite, usernameForWhite)}
      <Chessboard
        position={fen}
        orientation={orientation}
        darkSquareStyle={{ backgroundColor: 'CornFlowerBlue' }}
        lightSquareStyle={{ backgroundColor: 'grey' }}
        onDrop={handleDrop}
        roughSquare={roughSquare}
      />
      {renderInfo(timeForBlack, usernameForBlack)}
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
