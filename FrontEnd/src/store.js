import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // Importing thunk as a named import
import authReducer from './redux/reducers/authReducer';
import taskReducer from './redux/reducers/taskReducer';

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
});

// Create store with combined reducers and apply middleware (thunk)
const store = createStore(rootReducer, applyyMiddleware(thunk));

export default store;
