import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { EntryState, EntryReducer } from './states/EntryReducer';
import { UserReducer, UserState } from './states/UserReducer';
import createBrowserHistory from 'history/createBrowserHistory';
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { AppReducer, RootState } from './states/AppReducer';
import { ListEntryState , ListEntryReducer} from './states/ListEntryReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const history = createBrowserHistory();

export type AppState = {
  Entry: EntryState,
  User: UserState,
  Root: RootState,
  ListEntry: ListEntryState,
  router: RouterState,
};

const store = createStore(
  combineReducers<AppState>({
    Entry: EntryReducer,
    User: UserReducer,
    Root: AppReducer,
    ListEntry: ListEntryReducer,
    router: connectRouter(history),
  }),
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history), logger))
);

export default store;