'use client';
import { useEffect } from 'react';

const Chart = () => {
  useEffect(() => {
    pieInit();
  }, []);

  const pieInit = () => {
    const slices = document.querySelectorAll('.pie-slice');
    slices.forEach(slice => {
      slice.style.display = 'none';
      slice.style.animation = 'fadeIn 3s forwards';
      slice.querySelector('animate').setAttribute('begin', '1s');
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="chart-block flex items-center justify-center">
        <svg viewBox="-500 -500 1000 1000" xmlns="http://www.w3.org/2000/svg" width="500">
          <g className="pie-slice">
            <circle r="300" className="c1" strokeWidth="200">
              <animate attributeName="stroke-dasharray" dur="3s" values="0 314 628 942" begin="indefinite" fill="freeze" />
            </circle>
          </g>
          <g className="pie-slice">
            <circle r="300" className="c2" strokeWidth="200">
              <animate attributeName="stroke-dasharray" dur="3s" values="0 314 628 942" begin="indefinite" fill="freeze" />
            </circle>
          </g>
          <g className="pie-slice">
            <circle r="300" className="c3" strokeWidth="200">
              <animate attributeName="stroke-dasharray" dur="3s" values="0 314 628 942" begin="indefinite" fill="freeze" />
            </circle>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Chart;
