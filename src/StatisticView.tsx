import React from "react";

type StatisticViewProps = {
  pushes: number,
  steps: number
}

function StatisticView (props: StatisticViewProps) {
  return (
    <div>{props.pushes} + {props.steps}</div>
  )
}