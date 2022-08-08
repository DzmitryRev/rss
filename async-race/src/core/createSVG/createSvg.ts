const createSvg = (color: string): SVGSVGElement => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const useit = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  useit.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './assets/car.svg#svg2');
  svg.style.fill = color;
  svg.insertAdjacentElement('beforeend', useit);
  svg.style.height = '40px';
  svg.style.width = '60px';
  return svg;
};

export default createSvg;
