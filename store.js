import { createStore , combineReducers ,applyMiddleware } from "redux";
import { gifReducer } from "./src/redux/reducers/giphy.reducer";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
const rootReducer = combineReducers({
gifReducer : gifReducer
})
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const configureStore = createStore(rootReducer, composedEnhancer)
export default configureStore;



