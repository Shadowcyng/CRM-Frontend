import { applyMiddleware, createStore, compose } from "redux";
import Cookie from 'js-cookie'
import thunk from 'redux-thunk'
import reducer from './Reducers/RootReducer'



const userInfo = Cookie.getJSON('userInfo') || null;


const initialState = {
    user: { userInfo },
}

const middleware = [ thunk ]
const store = createStore(reducer, initialState, compose(applyMiddleware(...middleware),
window.__REDUX_DEVTOOLS_EXTENSION__
? window.__REDUX_DEVTOOLS_EXTENSION__()
: f => f));

export default store;
