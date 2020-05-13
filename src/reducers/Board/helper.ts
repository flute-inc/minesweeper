import { CellState, BoardState } from "./types";

export const createBoard = (width: number, height: number): CellState[][] => {
  const board: CellState[][] = [];

  for (let i = 0; i < width; i++) {
    board.push([]);
    for (let j = 0; j < height; j++) {
      board[i].push({
        isOpened: false,
        isFlagged: false,
        hasMine: false,
        surroundingMines: 0,
      });
    }
  }

  //mineとsurroundingMinesをいれる
  const mines = 5;
  if (mines < width * height + 1) {
    for (let i = 0; i < mines; i++) {
      const randomX = Math.floor(Math.random() * width);
      const randomY = Math.floor(Math.random() * height);
      if (board[randomX][randomY].hasMine === true) {
        i--;
        continue;
      } else {
        board[randomX][randomY].hasMine = true;
        for (let cols = -1; cols <= 1; cols++) {
          for (let rows = -1; rows <= 1; rows++) {
            const surroundingX = randomX + cols;
            const surroundingY = randomY + rows;
            if (
              0 <= surroundingX &&
              0 <= surroundingY &&
              surroundingX < width &&
              surroundingY < height
            ) {
              board[surroundingX][surroundingY].surroundingMines++;
            }
          }
        }
      }
    }
  }
  return board;
};

export const openCell = (
  cells: CellState[][],
  width: number,
  height: number,
  currentX: number,
  currentY: number
): CellState[][] => {
  const currentCells = [...cells];

  if (currentCells[currentX][currentY].isOpened === false) {
    currentCells[currentX][currentY].isOpened = true;
    currentCells[currentX][currentY].isFlagged = false;
  }

  if (
    currentCells[currentX][currentY].surroundingMines === 0 &&
    currentCells[currentX][currentY].hasMine === false
  ) {
    for (let cols = -1; cols <= 1; cols++) {
      for (let rows = -1; rows <= 1; rows++) {
        const surroundingX = currentX + cols;
        const surroundingY = currentY + rows;
        if (
          0 <= surroundingX &&
          0 <= surroundingY &&
          surroundingX < width &&
          surroundingY < height &&
          currentCells[surroundingX][surroundingY].isOpened === false
        ) {
          currentCells[surroundingX][surroundingY].isOpened = true;
          currentCells[surroundingX][surroundingY].isFlagged = false;

          if (
            currentCells[surroundingX][surroundingY].surroundingMines === 0 &&
            currentCells[surroundingX][surroundingY].hasMine === false
          ) {
            openCell(currentCells, width, height, surroundingX, surroundingY);
          }
        }
      }
    }
  }
  return currentCells;
};

export const toggleFlag = (
  state: BoardState,
  x: number,
  y: number
): CellState[][] => {
  const newToggleFlag = [...state.cells];
  if (newToggleFlag[x][y].isOpened === true) {
    return newToggleFlag;
  } else {
    newToggleFlag[x][y].isFlagged = !newToggleFlag[x][y].isFlagged;
  }
  return newToggleFlag;
};
