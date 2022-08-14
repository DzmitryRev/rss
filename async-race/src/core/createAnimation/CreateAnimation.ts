function createAnimation(
  svg: SVGSVGElement,
): [() => void, () => void, () => void, (time: number) => void] {
  let animationId: number;
  let start: number | null = null;
  const svgCar = svg;
  let speed = 0;
  const animation = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    svgCar.style.transform = `translateX(${Math.min(
      ((svgCar.parentElement.clientWidth - 200) / speed) * progress,
      svgCar.parentElement.clientWidth - 200,
    )}px)`;
    if (progress < speed) {
      animationId = requestAnimationFrame(animation);
    }
  };
  const setTime = (time: number) => {
    speed = time;
  };
  const run = () => {
    animationId = requestAnimationFrame(animation);
  };
  const stop = async () => {
    cancelAnimationFrame(animationId);
    start = null;
  };
  const moveCarToStart = () => {
    svgCar.style.transform = 'translateX(0)';
    start = null;
    speed = 0;
  };
  return [run, stop, moveCarToStart, setTime];
}

export default createAnimation;
