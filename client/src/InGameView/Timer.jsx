import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({ timeInSeconds }) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  return (
    <div className="text-xl font-bold bg-gray-950 text-gray-300 p-2 rounded">
      {minutes}:{seconds < 10 ? '0' + seconds : seconds}
    </div>
  );
};

Timer.propTypes = {
  timeInSeconds: PropTypes.number.isRequired,
};

export default Timer;
