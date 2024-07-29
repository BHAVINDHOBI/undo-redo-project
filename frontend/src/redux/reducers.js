import { ADD_TO_HISTORY, UNDO, REDO } from "./actions";

const MAX_HISTORY_LENGTH = 50;

const initialState = {
  inputValue: {
    value: localStorage.getItem("userFileData") || "",
    selection: null,
  },
  history: [{ value: "", selection: null }],
  historyIndex: 0,
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_HISTORY:
      let newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(action.payload);

      if (newHistory.length > MAX_HISTORY_LENGTH) {
        newHistory = newHistory.slice(newHistory.length - MAX_HISTORY_LENGTH);
      }
      localStorage.setItem("userFileData", action.payload.value); // for no saving file data in local storage
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
