import { ACTION_CHANGE_BALANCE, ACTION_CHANGE_HISTORY } from "../..";

const initialState = {
    balance: 10,
    history: [],
}

const balanceChanging = (balance, change) => {
  return ({
    balance: balance + change
  })
}

export const reducer = (state = initialState, action) => {
  const {balance, history} = state;
    switch (action.type) {
      case ACTION_CHANGE_BALANCE:
        return balanceChanging(balance, action.payload)
      case ACTION_CHANGE_HISTORY:
        return {
          ...state,
          history: [history, action.payload]
        }
          default:
            return state;
        }
}