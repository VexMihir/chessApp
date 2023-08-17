import { RoughSVG } from 'roughjs/bin/svg';

const roughSquare = ({ squareElement, squareWidth }) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', squareWidth);
  svg.setAttribute('height', squareWidth);

  const rc = new RoughSVG(svg);
  const chessSquare = rc.rectangle(0, 0, squareWidth, squareWidth, {
    roughness: 0,
    fill: "grey",
    bowing: 1,
    fillStyle: "cross-hatch"
  });
  
  svg.appendChild(chessSquare);
  squareElement.appendChild(svg);
};

export default roughSquare;
