// redux/actions.js

// Action Types
export const ADD_TO_HISTORY = "ADD_TO_HISTORY";
export const UNDO = "UNDO";
export const REDO = "REDO";

// Action Creators
export const addToHistory = (value) => ({
  type: ADD_TO_HISTORY,
  payload: value,
});

export const undo = () => ({
  type: UNDO,
});

export const redo = () => ({
  type: REDO,
});
