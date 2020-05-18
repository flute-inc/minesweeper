import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../components/Board";
import { RootState } from "../rootReducer";
import {
  createBoardAction,
  openCellAction,
  toggleFlagAction,
} from "../reducers/Board";
import { GameStartAction } from "../reducers/Game";

const ContainerBoard = () => {
  const dispatch = useDispatch();

  const board = useSelector((state: RootState) => state.board);

  const game = useSelector((state: RootState) => state.game);

  const handleCreateBoard = (width: number, height: number, mines: number) => {
    dispatch(createBoardAction(width, height, mines));
  };

  const handleOpenCell = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    dispatch(openCellAction(x, y));
    if (game.isStarted === false) {
      dispatch(GameStartAction());
    }
  };

  const handleToggleFlag = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    dispatch(toggleFlagAction(x, y));
  };

  const _props = { board, handleCreateBoard, handleOpenCell, handleToggleFlag };

  return <Board {..._props} />;
};

export default ContainerBoard;
