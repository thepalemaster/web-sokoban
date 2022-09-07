import React from "react";

type BoxImgProps = { scale: number, placed: boolean };

function Box({scale, placed}: BoxImgProps) {
  const size = scale / 50;
  const top = 25 * size;//20
  const bottom = 182 * size;
  const sideUp = 66 * size;//65
  const sideDown = 141 * size;
  const centerUp = 107 * size;//102
  const left = 0;
  const right = 164 * size;
  const center = 82 * size;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={right} height={bottom}
      viewBox={`0 0 ${right} ${bottom}`}
    >
      <g stroke="#000" strokeWidth=".5px">
        <path
          fill={placed ? "#c89937" : "#c87137"}
          d={`M${left},${sideUp} ${center},${top} L${right},${sideUp} ${center},${centerUp} L${left},${sideUp}`}
        ></path>
        <path
          fill={placed ? "#ded287" : "#deaa87"}
          d={`M${left},${sideUp} ${center},${centerUp} L${center},${bottom} ${left},${sideDown} L${left},${sideUp}`}
        ></path>
        <path
          fill={placed ? "#d3b55f" : "#d38d5f"}
          d={`M${center},${centerUp} ${right},${sideUp} L${right},${sideDown} ${center},${bottom} L${center},${centerUp}`}
        ></path>
      </g>
    </svg>
  );

}

export const BoxImage = React.memo(Box)

export function offsetBoxToBase(step: number) {
  const size = step / 50;
  const x = size * 82;
  const y = size * 141;
  return [x, y];
}