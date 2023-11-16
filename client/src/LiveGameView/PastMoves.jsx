import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const PastMoves = ({ moves, height }) => {
  const movePairs = [];
  const HEIGHT_MULTIPLER = 0.4;
  const scrollDivRef = useRef(null);

  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({ white: moves[i], black: moves[i + 1] || '' });
  }

  useEffect(() => {
    const scrollDiv = scrollDivRef.current;
    if (scrollDiv) {
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }
  }, [moves]);

  return (
    <div ref={scrollDivRef} className="bg-transparent border border-gray-700 p-4 overflow-y-auto no-scrollbar" style={{ height: `${height * HEIGHT_MULTIPLER}px` }}>
      {movePairs.map((movePair, index) => (
        <div key={index} className="flex justify-between mb-1 text-white">
          <div>{index + 1}. {movePair.white}</div>
          <div>{movePair.black}</div>
        </div>
      ))}
    </div>
  );
};

PastMoves.propTypes = {
  moves: PropTypes.arrayOf(PropTypes.string).isRequired,
  height: PropTypes.number.isRequired,
};

export default PastMoves;
