import React from "react";

type StatisticViewProps = {
  pushes: number,
  moves: number
}

export function StatisticView (props: StatisticViewProps) {
  return (
    <div className="sokoban-statistic">
      pushes: {props.pushes} <br/> moves: {props.moves}
    </div>
  )
}
