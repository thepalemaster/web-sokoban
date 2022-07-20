import React from "react";

type BoxImgProps = { scale: number, placed: boolean };

function Box({ scale, placed }: BoxImgProps) {
  const size = scale / 50;
  const top = 0;
  const bottom = 182 * size;
  const sideUp = 41 * size;
  const sideDown = 141 * size;
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
          fill="#c87137"
          d={`M${left},${sideUp} ${center},${top} L${right},${sideUp} ${center},${center} L${left},${sideUp}`}
        ></path>
        <path
          fill="#deaa87"
          d={`M${left},${sideUp} ${center},${center} L${center},${bottom} ${left},${sideDown} L${left},${sideUp}`}
        ></path>
        <path
          fill="#d38d5f"
          d={`M${center},${center} ${right},${sideUp} L${right},${sideDown} ${center},${bottom} L${center},${center}`}
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