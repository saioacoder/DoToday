import {combineReducers} from 'redux';

import langReducer from './reducers/langReducer';

const rootReducer = combineReducers({
  language: langReducer
});

export default rootReducer;