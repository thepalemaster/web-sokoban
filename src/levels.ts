export type Cell = "E"|" "|"X";

export type Direction = "N"|"S"|"W"|"E"

export type ObjectPosition = {
  x: number,
  y: number
}

type Box = {
  position: ObjectPosition
}

type Worker = {
  position: ObjectPosition,
  direction: Direction
}

export type Field = {
  width: number,
  heigth: number,
  cells: Array<Cell>,
}

export type Level = {
  field: Field,
  boxes: Array<Box>,
  worker: Worker
}


export const levels: Array<Level> = [
  {
    field: {
      width: 5,
      heigth: 4,
      cells: [
        " ", "E", "E", " ", " ",
        " ", "E", "E", " ", " ",
        "E", "E", "E", "E", "E",
        "E", "E", "E", "X", "X"
      ]
    },
    boxes: [
      {
        position: {
          x: 2,
          y: 2
        }
      },
      {
        position: {
          x: 3,
          y: 3
        }
      },
    ],
    worker: {
      position: {
        x: 1,
        y: 3
      },
      direction: "N"
    }
  },
  {
    field: {
      width: 5,
      heigth: 4,
      cells: [
        " ", " ", " ", "E", "E",
        " ", "E", "E", "E", "E",
        " ", "E", "E", "E", "E",
        "X", "X", "E", "E", " "
      ]
    },
    boxes: [
      {
        position: {
          x: 3,
          y: 3
        }
      },
      {
        position: {
          x: 4,
          y: 2
        }
      },
    ],
    worker: {
      position: {
        x: 3,
        y: 2
      },
      direction: "N"
    }
  },
  {
    field: {
      width: 4,
      heigth: 4,
      cells: [
        "E", "E", "E", "E",
        "E", "E", "E", "E",
        "X", "E", "E", " ",
        "X", "X", "E", " "
      ]
    },
    boxes: [
      {
        position: {
          x: 1,
          y: 2
        }
      },
      {
        position: {
          x: 2,
          y: 2
        }
      },
      {
        position: {
          x: 3,
          y: 2
        }
      },
    ],
    worker: {
      position: {
        x: 4,
        y: 1
      },
      direction: "N"
    }
  },
  {
    field:{
      width: 4,
      heigth: 5,
      cells: [
        "X", "E", "E", " ",
        "X", "E", "E", " ",
        " ", "E", "E", " ",
        "E", "E", "E", "E",
        " ", "E", "E", "E"
      ]
    },
    boxes: [
      {
        position: {
          x: 3,
          y: 2
        }
      },
      {
        position: {
          x: 2,
          y: 4
        }
      }
    ],
    worker: {
      position: {
        x: 1,
        y: 4
      },
      direction: "W"
    }
  },
  {
    field:{
      width: 12,
      heigth: 8,
      cells: [
        "X", "X", "E", "E", " ", "E", "E", "E", "E", "E", " ", " ",
        "X", "X", "E", "E", " ", "E", "E", "E", "E", "E", "E", "E",
        "X", "X", "E", "E", " ", "E", " ", " ", " ", " ", "E", "E",
        "X", "X", "E", "E", "E", "E", "E", "E", " ", " ", "E", "E",
        "X", "X", "E", "E", " ", "E", " ", "E", "E", "E", "E", " ",
        " ", " ", " ", " ", " ", "E", " ", " ", "E", "E", "E", "E",
        " ", " ", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E",
        " ", " ", "E", "E", "E", "E", " ", "E", "E", "E", "E", "E",
      ]
    },
    boxes: [
      {
        position: {
          x: 7,
          y: 2
        }
      },
      {
        position: {
          x: 10,
          y: 2
        }
      },
      {
        position: {
            x: 6,
            y: 3
          }
      },
      {
        position: {
            x: 10,
            y: 5
          }
      },
      {
        position: {
            x: 9,
            y: 6
          }
      },
      {
        position: {
            x: 11,
            y: 6
          }
      },
      {
        position: {
            x: 4,
            y: 7
          }
      },
      {
        position: {
            x: 7,
            y: 7
          }
      },
      {
        position: {
            x: 9,
            y: 7
          }
      },      
      {
        position: {
            x: 11,
            y: 7
          }
      }
    ],
    worker: {
      position: {
        x: 7,
        y: 4
      },
      direction: "W"
    }
  }
];
