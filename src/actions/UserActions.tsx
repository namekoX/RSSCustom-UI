import actionCreatorFactory from 'typescript-fsa';
import PostUserResult from '../interface/PostUserResult';
import PostUserRequest from '../interface/PostUserRequest';
import { Dispatch, Action } from 'redux';
import axios from 'axios';
import { createURL } from '../common/utils';

const actionCreator = actionCreatorFactory();

const onRegister = actionCreator<PostUserResult>('ACTIONS_USER_REGISTER');
const onUpdate = actionCreator<PostUserResult>('ACTIONS_USER_UPDATE');
const onLogin = actionCreator<PostUserResult>('ACTIONS_USER_LOGIN');

export const postUser = (url: string,chkpassword: string, body: PostUserRequest) => {
  return async (dispatch: Dispatch<Action>) => {
    if (body.user_id == "" || body.password == "") {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: body.user_id == "" ? "ユーザーIDは必須です" : "パスワードは必須です",
      };
      dispatch(onRegister(result));
      return;
    }
    if (chkpassword != body.password) {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: "パスワードとパスワード（確認）が一致しません",
      };
      dispatch(onRegister(result));
      return;
    }

    try {
      const response = await axios.post(createURL(url), body);
      const result: PostUserResult = {
        valid: !response.data.OK,
        info: response.data.OK,
        msg: response.data.Msg,
      };
      dispatch(onRegister(result));
    } catch {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: "登録に失敗しました",
      };
      dispatch(onRegister(result));
    }
  };
};

export const updateUser = (url: string,chkpassword: string, body: PostUserRequest) => {
  return async (dispatch: Dispatch<Action>) => {
    if (body.user_id == "" || body.password == "") {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: body.user_id == "" ? "ユーザーIDは必須です" : "パスワードは必須です",
      };
      dispatch(onUpdate(result));
      return;
    }
    if (chkpassword != body.password) {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: "パスワードとパスワード（確認）が一致しません",
      };
      dispatch(onUpdate(result));
      return;
    }

    try {
      const response = await axios.post(createURL(url), body);
      const result: PostUserResult = {
        valid: !response.data.OK,
        info: response.data.OK,
        msg: response.data.Msg,
      };
      dispatch(onUpdate(result));
    } catch {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: "更新に失敗しました",
      };
      dispatch(onUpdate(result));
    }
  };
};

export const chkUser = (url: string, body: PostUserRequest) => {
  return async (dispatch: Dispatch<Action>) => {
    if (body.user_id == "" || body.password == "") {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: body.user_id == "" ? "ユーザーIDは必須です" : "パスワードは必須です",
      };
      dispatch(onLogin(result));
      return Promise.resolve();
    }
    try {
      await axios.post(createURL(url), body);
      const result: PostUserResult = {
        valid: false,
        info: false,
        msg: "",
      };
      dispatch(onLogin(result));
      return Promise.resolve();
    } catch {
      const result: PostUserResult = {
        valid: true,
        info: false,
        msg: "ログインできませんでした。ユーザIDとパスワードを再確認してください。",
      };
      dispatch(onLogin(result));
      return Promise.resolve();
    }
  };
};

export const UserActions = {
  onRegister,
  onUpdate,
  onLogin,
  onClear: actionCreator<{}>('ACTIONS_USER_CLEAR'),
  updateState: actionCreator<{ name: string, value: any }>('ACTIONS_USER_UPDATE_STATE'),
};