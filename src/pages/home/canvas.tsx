import { memo, useEffect, useRef } from 'react';
import EnterFrame from 'lesca-enterframe';
import './index.less';

const paths = [
  { x: 100, y: 50 },
  { x: 150, y: 50 },
  { x: 200, y: 50 },
  { x: 250, y: 50 },
  { x: 300, y: 50 },
  { x: 350, y: 50 },
  { x: 400, y: 50 },
  { x: 400, y: 100 },
  { x: 400, y: 150 },
  { x: 400, y: 200 },
  { x: 400, y: 250 },
  { x: 400, y: 300 },
  { x: 400, y: 350 },
  { x: 350, y: 350 },
  { x: 300, y: 350 },
  { x: 250, y: 350 },
  { x: 200, y: 350 },
  { x: 150, y: 350 },
  { x: 100, y: 350 },
  { x: 100, y: 300 },
  { x: 100, y: 250 },
  { x: 100, y: 200 },
  { x: 100, y: 150 },
  { x: 100, y: 100 },
];
const pathWidth = 20;

const effect = [
  { blur: 15, color: '#fff' },
  { blur: 35, color: '#008cff' },
  { blur: 35, color: '#0ff' },
];

const fps = Number(new URLSearchParams(window.location.search).get('fps') || 60);
const max = Math.max(
  2,
  Math.min(
    Number(new URLSearchParams(window.location.search).get('max') || paths.length),
    paths.length,
  ),
);

const Canvas = memo(() => {
  const path = useRef(paths);
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d');

      if (ctx) {
        const draw = () => {
          ctx.clearRect(0, 0, 500, 500);
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = pathWidth;
          ctx.lineCap = 'round';
          let lastPath: (typeof paths)[0] | null = null;
          let lastPath2: (typeof paths)[0] | null = null;
          const currentPath = path.current.slice(0, max);
          currentPath.forEach((p, i) => {
            [...new Array(effect.length).keys()].forEach((i2) => {
              if (lastPath) {
                const { blur, color } = effect[i2 % effect.length];
                ctx.shadowBlur = blur;
                ctx.shadowColor = color;
                ctx.beginPath();
                ctx.lineWidth = pathWidth - i * (pathWidth / paths.length);
                ctx.moveTo(lastPath.x, lastPath.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
              }
            });
            lastPath = p;
          });

          currentPath.forEach((p, i) => {
            if (lastPath2) {
              ctx.beginPath();
              ctx.lineWidth = pathWidth - i * (pathWidth / paths.length);
              ctx.moveTo(lastPath2.x, lastPath2.y);
              ctx.lineTo(p.x, p.y);
              ctx.stroke();
            }
            lastPath2 = p;
          });
          const shiftedPath = path.current.shift();
          if (shiftedPath) {
            path.current = path.current.concat(shiftedPath);
          }
        };
        EnterFrame.setFPS(fps);
        EnterFrame.add(draw);
        EnterFrame.play();
      }
    }
  }, []);
  return <canvas ref={ref} width={500} height={500} className='Canvas' />;
});
export default Canvas;