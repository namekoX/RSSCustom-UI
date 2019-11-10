import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { CommonActions } from '../actions/CommonActions';
import { UserActions } from '../actions/UserActions';
import Cookies from 'js-cookie';
import Const from '../common/const';
import { setAppStart, getAppStart, isLogin } from '../common/global';

export interface UserState {
  user_id: string,
  password: string,
  chkpassword: string,
  isNew: boolean,
  appStart: boolean,
  valid: boolean,
  loadingRegister: boolean,
  msg: string,
  info: boolean,
  btnName: string,
}

const initialState: UserState = {
  user_id: '',
  password: '',
  chkpassword: '',
  isNew: false,
  appStart: false,
  valid: false,
  loadingRegister: false,
  msg: '',
  info: false,
  btnName: 'ログイン',
};

export const UserReducer = reducerWithInitialState(initialState)
  .case(UserActions.onLogin, (state, payload) => {
    if (!payload.valid) {
      Cookies.set(Const.KEY_USER_ID, state.user_id);
      setAppStart(true);
    }

    return Object.assign({}, state, {
      msg: payload.msg,
      valid: payload.valid,
      info: payload.info,
      loadingRegister: false,
      user_id: (payload.valid ? state.user_id : ""),
      password: "",
      chkpassword: "",
    });
  })
  .case(UserActions.onRegister, (state, payload) => {
    if (!payload.valid) {
      Cookies.set(Const.KEY_USER_ID, state.user_id);
      setAppStart(true);
    }

    return Object.assign({}, state, {
      msg: payload.msg,
      valid: payload.valid,
      info: payload.info,
      loadingRegister: false,
      btnName: (payload.valid ? "新規登録" : "戻る"),
      user_id: (payload.valid ? state.user_id : ""),
      password: "",
      chkpassword: "",
    });
  })
  .case(CommonActions.updateState, (state, { name, value }) => {
    return Object.assign({}, state, { [name]: value });
  })
  .case(UserActions.onClear, (state, {}) => {
    return Object.assign({}, state, initialState);
  })
  ;
