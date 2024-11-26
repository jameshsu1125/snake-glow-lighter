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

const fps = new URLSearchParams(window.location.search).get('fps');

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
                ctx.lineWidth = pathWidth - i * (pathWidth / max);
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
              ctx.lineWidth = pathWidth - i * (pathWidth / max);
              ctx.moveTo(lastPath2.x, lastPath2.y);
              ctx.lineTo(p.x, p.y);
              ctx.stroke();
            }
            lastPath2 = p;
          });

          const moveLastToFirst = () => {
            const last = path.current.pop();
            if (last) {
              path.current.unshift(last);
            }
          };
          moveLastToFirst();
        };

        if (fps) EnterFrame.setFPS(Number(fps));
        EnterFrame.add(draw);
        EnterFrame.play();
      }

      window.addEventListener('keydown', (e) => {
        const { key } = e;
        let currentMax = max;
        let currentFps = Number(fps);
        switch (key) {
          case 'ArrowUp':
            currentMax = max + 1;
            break;
          case 'ArrowDown':
            currentMax = max - 1;
            break;
          case 'ArrowLeft':
            currentFps = Number(fps) - 1;
            break;
          case 'ArrowRight':
            currentFps = Number(fps) + 1;
            break;

          default:
            break;
        }
        if (max !== currentMax || (fps && currentFps !== Number(fps))) {
          const url = new URL(window.location.href);
          url.searchParams.set('max', Math.max(Math.min(currentMax, 20), 2).toString());
          if (fps) url.searchParams.set('fps', currentFps.toString());
          window.location.href = url.toString();
        }
      });
    }
  }, []);
  return <canvas ref={ref} width={500} height={500} className='Canvas' />;
});
export default Canvas;
