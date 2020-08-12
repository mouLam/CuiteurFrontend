import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import UiReducer from "./reducers/UiReducer";

const etatIntial = {};

const middleware = [thunk];

/**
 * Nos differents Reducers
 */
const reducers = combineReducers({
	user: userReducer,
	data: dataReducer,
	Ui: UiReducer,
});

/**
 * Création du store react redux
 */
const store = createStore(
	reducers,
	etatIntial,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
