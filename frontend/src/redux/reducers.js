import { ADD_TO_HISTORY, UNDO, REDO } from "./actions";

const MAX_HISTORY_LENGTH = 50;

const initialState = {
  inputValue: "",
  history: [""],
  historyIndex: 0,
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_HISTORY:
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(action.payload);

      // Limit history to 50 entries
      if (newHistory.length > MAX_HISTORY_LENGTH) {
        newHistory = newHistory.slice(newHistory.length - MAX_HISTORY_LENGTH);
      }

      return {
        ...state,
        inputValue: action.payload,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };

    case UNDO:
      if (state.historyIndex > 0) {
        return {
          ...state,
          historyIndex: state.historyIndex - 1,
          inputValue: state.history[state.historyIndex - 1],
        };
      }
      return state;

    case REDO:
      if (state.historyIndex < state.history.length - 1) {
        return {
          ...state,
          historyIndex: state.historyIndex + 1,
          inputValue: state.history[state.historyIndex + 1],
        };
      }
      return state;

    default:
      return state;
  }
};

export default editorReducer;
