import type { Grid, Cell } from './types'
import { Direction, ARROW_CODES } from './movement'

export const MIN_CELL_INDEX = 0
export const MAX_CELL_INDEX = 8

export function makeGrid(): Grid {
  return new Array(9)
    .fill(undefined)
    .map((_, y) =>
      new Array(9).fill(undefined).map((_, x) => makeCell({ x, y })),
    )
}

function makeCell(opts: { x: number; y: number }): Cell {
  return {
    value: '',
    x: opts.x,
    y: opts.y,
  }
}

function isValidNumberKey(key: string): boolean {
  return /^[1-9]/.test(key)
}

function isMovementKey(e: KeyboardEvent): boolean {
  const { UP, DOWN, LEFT, RIGHT } = ARROW_CODES
  return /^[hjkl]/.test(e.key) || [UP, DOWN, LEFT, RIGHT].includes(e.keyCode)
}

export function handleKeyEvent(e: KeyboardEvent, grid: Grid, cell: Cell) {
  e.preventDefault()
  const key = e.key
  const { x, y } = cell

  if (isValidNumberKey(key)) {
    grid[y][x].value = key
    return
  }

  if (isMovementKey(e)) {
    const direction = getDirectionFromKeyEvent(e)
    focusToCell(direction, grid, cell)
    return
  }
}

function getDirectionFromKeyEvent(e: KeyboardEvent): Direction {
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

function focusToCell(direction: Direction, grid: Grid, currentCell: Cell) {
  const { x, y } = currentCell

  switch (direction) {
    case Direction.Left:
      grid[y][Math.max(x - 1, MIN_CELL_INDEX)]?.ref?.focus()
      return
    case Direction.Down:
      grid[Math.min(y + 1, MAX_CELL_INDEX)][x]?.ref?.focus()
      return
    case Direction.Up:
      grid[Math.max(y - 1, MIN_CELL_INDEX)][x]?.ref?.focus()
      return
    case Direction.Right:
      grid[y][Math.min(x + 1, MAX_CELL_INDEX)]?.ref?.focus()
      return
  }
}
