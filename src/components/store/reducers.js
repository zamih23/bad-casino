import { ACTION_CHANGE_BALANCE, ACTION_CHANGE_HISTORY } from "./actions";

export const balance = (state = 10, action) => {
  switch (action.type) {
    case ACTION_CHANGE_BALANCE:
      return state + action.payload;
    default:
      return state;
  }
};

export const history = (state = [], action) => {
  switch (action.type) {
    case ACTION_CHANGE_HISTORY:
      return [...state, action.payload];
    default:
      return state;
  }
};
