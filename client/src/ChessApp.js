import './ChessApp.css';
import Chessboard from './components/chessboard/Chessboard';
import Sideboard from './components/sideboard/Sideboard';
function ChessApp() {
  return (
    <>
      <div className='chessApp__page chessApp__page_theme'>
        <nav className='chessApp__nav'>
          <ul className='chessApp__ul'>
            <div className='chessApp__threeBar'>
              <li>≡</li>
            </div>
            <div className='chessApp__timer'>
              <li>Timer: 15:00</li>
            </div>
            <div className='chessApp__roomInfo'>
              <li>Room Info: 10</li>
            </div>
          </ul>
        </nav>
        <div className='chessApp__main '>
          <Chessboard />
          <Sideboard />
        </div>
      </div>
    </>
  );
}

export default ChessApp;
