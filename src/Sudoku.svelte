<script lang="ts">
  import type { Grid } from './types'
  import {
    MAX_CELL_INDEX,
    isValidNumberKey,
    isMovementKey,
    getDirectionFromKeyEvent,
    focusToCell,
  } from './sudoku'

  export let grid: Grid

  function onKeyDown(e: KeyboardEvent, x: number, y: number) {
    if (isValidNumberKey(e.key)) {
      grid[x][y].value = e.key
      return
    }

    if (isMovementKey(e)) {
      const direction = getDirectionFromKeyEvent(e)
      focusToCell(direction, grid, grid[x][y])
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

<div class="container">
  <div class="grid">
    {#each grid as column, x}
      <div class="row">
        {#each column as cell, y}
          <div class="cell">
            <input
              type="text"
              maxlength={1}
              bind:value={cell.value}
              bind:this={cell.ref}
              on:keydown|preventDefault={(e) => onKeyDown(e, x, y)} />
          </div>
          {#if shouldRenderHSeparator(y)}
            <div class="h-separator" />
          {/if}
        {/each}
      </div>
      {#if shouldRenderVSeparator(x)}
        <div class="v-separator" />
      {/if}
    {/each}
  </div>
</div>
