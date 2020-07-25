<script lang="ts">
  // TODO: Split in different  files. Too much logic in one file.
  // TODO: Add logic to clean a cell by pressing BACKSPACE or 0
  type Cell = {
    x: number,
    y: number,
    value: string,
    ref?: any,
  }
  type Grid = Cell[][]
  enum Direction {
    Up,
    Down,
    Left,
    Right,
  }

  const MIN_CELL_INDEX = 0
  const MAX_CELL_INDEX = 8
  const ARROW_CODES = {
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    UP: 38,
  }

  let grid: Grid = makeGrid()

  function makeGrid(): Grid {
    return new Array(9).fill(undefined).map((_, y) =>
      new Array(9).fill(undefined).map((_, x) =>
        makeCell({ x, y })
      )
    )
  }

  function makeCell(opts: { x: number, y: number }): Cell {
    return {
      value: "",
      x: opts.x,
      y: opts.y,
    }
  }

  function onKeyDown(e: KeyboardEvent, cell: Cell) {
    e.preventDefault()
    const key = e.key
    const { x, y } = cell

    if (isValidNumberKey(key)) {
      grid[y][x].value = key
      return
    }

    if (isMovementKey(e)) {
      const direction = getDirectionFromKeyEvent(e)
      focusToCell(direction, cell)
      return
    }
  }

  function isValidNumberKey(key: string): boolean {
    return /^[1-9]/.test(key)
  }

  function isMovementKey(e: KeyboardEvent): boolean {
    const { UP, DOWN, LEFT, RIGHT } = ARROW_CODES
    return /^[hjkl]/.test(e.key) || [UP, DOWN, LEFT, RIGHT].includes(e.keyCode)
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

  function focusToCell(direction: Direction, currentCell: Cell) {
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

  function shouldRenderHSeparator(x: number): boolean {
    return (x + 1) % 3 === 0 && x !== MAX_CELL_INDEX
  }

  function shouldRenderVSeparator(y: number): boolean {
    return (y + 1) % 3 === 0 && y !== MAX_CELL_INDEX
  }
</script>

<div class="container">
  <div class="grid">
    {#each grid as column, y}
      <div class="row">
        {#each column as cell, x}
          <div class="cell">
            <input
              type=text
              bind:value={cell.value}
              maxlength={1}
              on:keydown={(e) => onKeyDown(e, cell)}
              bind:this={cell.ref} >
          </div>
          {#if shouldRenderHSeparator(x)}
            <div class="h-separator"></div>
          {/if}
        {/each}
      </div>
      {#if shouldRenderVSeparator(y)}
        <div class="v-separator"></div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
  }

  .grid {
    margin: 0 auto;
    display: flex;
    border: 1px solid blueviolet;
    flex-direction: column;
  }

  .row {
    display: flex;
  }

  .h-separator {
    height: 50px;
    width: 1px;
    background-color: blueviolet;
  }


  .v-separator {
    height: 1px;
    width: 100%;
    background-color: blueviolet;
  }

  input {
    width: 50px;
    height: 50px;
    text-align: center;
    margin: 0;
    border-radius: 0;
    border-color: #dedede;
  }
</style>
