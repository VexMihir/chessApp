import React from 'react';
import Timer from './Timer';
import { color } from '../constants';

const InfoPanel = ({
    orientation,
    timeForWhite,
    timeForBlack,
    usernameForWhite,
    usernameForBlack,
  }) => {
    const renderTimerWithUsername = (timeInSeconds, username) => (
      <div className="flex flex-col items-center">
        <div className="text-white mb-2">{username}</div>
        <Timer timeInSeconds={timeInSeconds} />
      </div>
    );
  
    return (
      <div className="flex flex-col justify-between items-center pl-8 h-64">
        {orientation === color.BLACK ? (
          <>
            {renderTimerWithUsername(timeForWhite, usernameForWhite)}
            {renderTimerWithUsername(timeForBlack, usernameForBlack)}
          </>
        ) : (
          <>
            {renderTimerWithUsername(timeForBlack, usernameForBlack)}
            {renderTimerWithUsername(timeForWhite, usernameForWhite)}
          </>
        )}
      </div>
    );
  };
  
  export default InfoPanel;
  
