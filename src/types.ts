export type Cell = {
  x: number
  y: number
}

export type GridCell = {
  x: number
  y: number
  value: string
  ref?: any
}

export type Grid = GridCell[][]
