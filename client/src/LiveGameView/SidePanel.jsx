import React from 'react';
import PropTypes from 'prop-types';
import PastMoves from './PastMoves';
import ResignButton from './ResignButton';
import OfferDrawButton from './OfferDrawButton';

const SidePanel = ({ moves, height, onResign, onOfferDraw }) => {
  return (
    <div className="bg-transparent p-4 font-semibold flex-shrink-0 h-full w-72 no-scrollbar">
      <PastMoves moves={moves} height={height} />
      <div className="flex justify-between mt-2">
        <ResignButton onResign={onResign} />
        <OfferDrawButton onOfferDraw={onOfferDraw} />
      </div>
    </div>
  );
};

SidePanel.propTypes = {
  moves: PropTypes.arrayOf(PropTypes.string).isRequired,
  onResign: PropTypes.func.isRequired,
  onOfferDraw: PropTypes.func.isRequired,
};

export default SidePanel;
