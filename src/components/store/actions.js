import { ACTION_CHANGE_BALANCE, ACTION_CHANGE_HISTORY } from "../..";

export const changeBalance = (value) => {
  return {
    type: ACTION_CHANGE_BALANCE,
    payload: value,
  }
}

export const changeHistory = (value) => {
  return {
    type: ACTION_CHANGE_HISTORY,
    payload: value,
  }
}
