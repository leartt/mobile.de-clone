import { combineReducers } from 'redux';

import authReducer from './authReducer';
import listingReducer from './listingReducer';

const rootReducer = combineReducers({
   auth: authReducer,
   listing: listingReducer
})

export default rootReducer;

export type State = ReturnType<typeof rootReducer>