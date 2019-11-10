import actionCreatorFactory from 'typescript-fsa';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { AppState } from '../store';
import { createURL } from '../common/utils';
import PostEntryRequest from '../interface/PostEntryRequest';
import PostEntryResult from '../interface/PostEntryResult';
import GetEntryResult from '../interface/GetEntryResult';
import GetEntryRequest from '../interface/GetEntryRequest';

const actionCreator = actionCreatorFactory();

const onGet = actionCreator<GetEntryResult>('ACTIONS_ON_GET');
const onUpdate = actionCreator<PostEntryResult>('ACTIONS_ON_UPDATE');

export const getEntry = (url: string, entryNo: number, user_id: string | null | undefined) => {
  const prams:GetEntryRequest ={
    entryNo:entryNo,
    user_id:user_id,
  }
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    try {
      const response = await axios.get(createURL(url, prams));
      const result: GetEntryResult = {
        validRegister: false,
        validRegisterMsg: "",
        url:response.data.url,
        site_name:response.data.site_name,
        inclede_category:response.data.inclede_category,
        inclede_subject:response.data.inclede_subject,
        inclede_creater:response.data.inclede_creater,
        max_count:response.data.max_count,
        limit_day:response.data.limit_day,
        version:response.data.version,
      };
      dispatch(onGet(result));
    } catch {
      const result: GetEntryResult = {
        validRegister: true,
        validRegisterMsg: "想定外のエラーが発生しました",
        url:"",
        site_name:"",
        inclede_category:"",
        inclede_subject:"",
        inclede_creater:"",
        max_count:0,
        limit_day:0,
        version:"",
      };
      dispatch(onGet(result));
    }
  };
};

export const updateEntry = (url: string, body: PostEntryRequest) => {
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    if (body.site_name == "") {
      const result: PostEntryResult = {
        validRegister: true,
        validRegisterMsg: "サイト名は必須です",
        infoRegister: false,
        infoRegisterMsg: "",
      };
      dispatch(onUpdate(result));
      return;
    }
    try {
      await axios.post(createURL(url), body);
      const result: PostEntryResult = {
        validRegister: false,
        validRegisterMsg: "",
        infoRegister: true,
        infoRegisterMsg: "更新が完了しました。",
      };
      dispatch(onUpdate(result));
    } catch {
      const result: PostEntryResult = {
        validRegister: true,
        validRegisterMsg: "更新に失敗しました",
        infoRegister: false,
        infoRegisterMsg: "",
      };
      dispatch(onUpdate(result));
    }
  };
};

export const UpdateEntryActions = {
  onGet,
  onUpdate,
};