import PropTypes from 'prop-types';

const OfferDrawButton = ({ onOfferDraw }) => (
    <button onClick={onOfferDraw} className="bg-yellow-500 p-1 rounded text-white">Offer Draw</button>
);

OfferDrawButton.propTypes = {
    onOfferDraw: PropTypes.func.isRequired,
};

export default OfferDrawButton;