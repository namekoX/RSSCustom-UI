import actionCreatorFactory from 'typescript-fsa';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { AppState } from '../store';
import GetTitle from '../interface/GetTitle';
import { createURL } from '../common/utils';
import PostEntryRequest from '../interface/PostEntryRequest';
import PostEntryResult from '../interface/PostEntryResult';

const actionCreator = actionCreatorFactory();

const onConfirme = actionCreator<GetTitle>('ACTIONS_ON_CONFIRM');
const onRegister = actionCreator<PostEntryResult>('ACTIONS_ON_REGISTER');

export const getTitle = (url: string, prams?: { [key: string]: string; }) => {
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    if (prams == undefined || prams["url"] == "") {
      const result: GetTitle = {
        title: "",
        validConfirme: true,
        validConfirmeMsg: "URLを入力してください",
        version: "",
      };
      dispatch(onConfirme(result));
      return;
    }

    try {
      const response = await axios.get(createURL(url, prams));
      const result: GetTitle = {
        title: response.data.title,
        validConfirme: false,
        validConfirmeMsg: "",
        version: response.data.version,
      };
      dispatch(onConfirme(result));
    } catch {
      const result: GetTitle = {
        title: "",
        validConfirme: true,
        validConfirmeMsg: "RSSの取得に失敗しました",
        version: "",
      };
      dispatch(onConfirme(result));
    }
  };
};

export const postEntry = (url: string, body: PostEntryRequest) => {
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    if (body.site_name == "") {
      const result: PostEntryResult = {
        validRegister: true,
        validRegisterMsg: "サイト名は必須です",
        infoRegister: false,
        infoRegisterMsg: "",
        entryNo: 0,
      };
      dispatch(onRegister(result));
      return;
    }
    try {
      const response = await axios.post(createURL(url), body);
      const result: PostEntryResult = {
        validRegister: false,
        validRegisterMsg: "",
        infoRegister: true,
        infoRegisterMsg: "登録が完了しました。抽出後のRSSのURLは以下です。",
        entryNo: response.data.entryNo,
      };
      dispatch(onRegister(result));
    } catch {
      const result: PostEntryResult = {
        validRegister: true,
        validRegisterMsg: "登録に失敗しました",
        infoRegister: true,
        infoRegisterMsg: "",
        entryNo: 0,
      };
      dispatch(onRegister(result));
    }
  };
};

export const NewEntryActions = {
  onConfirme,
  onRegister,
  onClear: actionCreator<{}>('ACTIONS_NEW_CLEAR'),
  updateState: actionCreator<{ name: string, value: any }>('ACTIONS_ENTRY_UPDATE_STATE'),
};