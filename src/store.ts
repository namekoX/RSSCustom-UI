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
import ReactGA from 'react-ga';
import { getGAID } from './common/utils';

export const history = createBrowserHistory();
ReactGA.initialize(getGAID());

history.listen(({ pathname }) => {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
});

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