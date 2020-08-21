import type { Grid, GridCell, Cell } from './types'
import { Direction, ARROW_CODES } from './movement'

export const MIN_CELL_INDEX = 0
export const MAX_CELL_INDEX = 8

export function makeEmptyGrid(): Grid {
  return new Array(9)
    .fill(undefined)
    .map((_, y) =>
      new Array(9).fill(undefined).map((_, x) => makeCell({ x, y })),
    )
}

function makeCell(opts: Cell): GridCell {
  return {
    value: '',
    x: opts.x,
    y: opts.y,
  }
}

export function isValidNumberKey(key: string): boolean {
  return /^[1-9]/.test(key)
}

export function isMovementKey(e: KeyboardEvent): boolean {
  const { UP, DOWN, LEFT, RIGHT } = ARROW_CODES
  return /^[hjkl]/.test(e.key) || [UP, DOWN, LEFT, RIGHT].includes(e.keyCode)
}

export function getDirectionFromKeyEvent(e: KeyboardEvent): Direction {
  if (e.key === 'h' || e.keyCode === ARROW_CODES.LEFT) {
    return Direction.Left
  }
  if (e.key === 'j' || e.keyCode === ARROW_CODES.DOWN) {
    return Direction.Down
  }
  if (e.key === 'k' || e.keyCode === ARROW_CODES.UP) {
    return Direction.Up
  }
  if (e.key === 'l' || e.keyCode === ARROW_CODES.RIGHT) {
    return Direction.Right
  }
}

function getNewPosition(direction: Direction, currentCell: Cell): Cell {
  const { x, y } = currentCell

  switch (direction) {
    case Direction.Left:
      return { x: Math.max(x - 1, MIN_CELL_INDEX), y }
    case Direction.Down:
      return { x, y: Math.min(y + 1, MAX_CELL_INDEX) }
    case Direction.Up:
      return { x, y: Math.max(y - 1, MIN_CELL_INDEX) }
    case Direction.Right:
      return { x: Math.min(x + 1, MAX_CELL_INDEX), y }
  }
}

export function focusToCell(direction: Direction, grid: Grid, cell: Cell) {
  const { x, y } = getNewPosition(direction, cell)
  console.log(x, y)
  grid[y][x]?.ref?.focus()
}
