import PropTypes from 'prop-types';

const ResignButton = ({ onResign }) => (
    <button onClick={onResign} className="bg-red-500 p-1 rounded text-white">Resign</button>
);

ResignButton.propTypes = {
    onResign: PropTypes.func.isRequired,
};

export default ResignButton;