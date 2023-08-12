import React from 'react';
import PropTypes from 'prop-types';

const PastMovesPanel = ({ moves, height }) => {
    const movePairs = [];
    const HEIGHT_MULTIPLER = 0.8;

    for (let i = 0; i < moves.length; i += 2) {
        movePairs.push({ white: moves[i], black: moves[i + 1] || '' });
    }

    return (
        <div className="bg-transparent border border-gray-700 p-4 text-white overflow-y-auto font-semibold flex-shrink-0 h-full w-72" style={{ height: `${height * HEIGHT_MULTIPLER}px` }}>
            {movePairs.map((movePair, index) => (
                <div key={index} className="flex justify-between mb-1">
                    <div>{index + 1}. {movePair.white}</div>
                    <div>{movePair.black}</div>
                </div>
            ))}
        </div>
    );
};

PastMovesPanel.propTypes = {
    moves: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PastMovesPanel;
