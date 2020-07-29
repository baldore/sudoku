<script lang="ts">
  import type { Cell, Grid } from './types'
  import { MAX_CELL_INDEX, handleKeyEvent } from './sudoku'

  export let grid: Grid

  function onKeyDown(e: KeyboardEvent, cell: Cell) {
    handleKeyEvent(e, grid, cell)
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
    {#each grid as column, y}
      <div class="row">
        {#each column as cell, x}
          <div class="cell">
            <input
              type="text"
              bind:value={cell.value}
              maxlength={1}
              on:keydown={(e) => onKeyDown(e, cell)}
              bind:this={cell.ref} />
          </div>
          {#if shouldRenderHSeparator(x)}
            <div class="h-separator" />
          {/if}
        {/each}
      </div>
      {#if shouldRenderVSeparator(y)}
        <div class="v-separator" />
      {/if}
    {/each}
  </div>
</div>
