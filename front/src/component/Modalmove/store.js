import {createStore} from 'redux';
import subcribersReducer from './subscribers/reducer';
const store =createStore(subcribersReducer)

export default store;