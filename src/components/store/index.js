import {balance, history} from "./reducers";
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({balance, history})