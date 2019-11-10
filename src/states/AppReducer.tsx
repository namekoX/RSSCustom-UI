import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { getAppStart, isLogin } from '../common/global';
import { CommonActions } from '../actions/CommonActions';
import { AppActions } from '../actions/AppActions';

export interface RootState {
  isAppStart?: boolean,
  isLogin?: boolean,
  menuTabActive?:string,
}

const initialState: RootState = {
  isAppStart: getAppStart(),
  isLogin: isLogin(),
  menuTabActive: "/menu/new",
};

export const AppReducer = reducerWithInitialState(initialState)
  .case(CommonActions.updateState, (state, { name, value }) => {
    return Object.assign({}, state, { [name]: value });
  })
  .case(AppActions.updatelogininfo, (state, {}) => {
    return Object.assign({}, state, { 
      isAppStart: getAppStart(),
      isLogin: isLogin(),
    });
  })
  .case(AppActions.onClear, (state, {}) => {
    return Object.assign({}, state, { 
      isAppStart: getAppStart(),
      isLogin: isLogin(),
      menuTabActive: "/menu/new",
    });
  })
  ;
