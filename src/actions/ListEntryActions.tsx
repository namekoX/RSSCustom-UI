import actionCreatorFactory from 'typescript-fsa';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { AppState } from '../store';
import { createURL } from '../common/utils';
import GetListEntryResult from '../interface/GetListEntryResult';
import GetListEtntryRequest from '../interface/GetListEtntryRequest';

const actionCreator = actionCreatorFactory();

const onSearch = actionCreator<GetListEntryResult>('ACTIONS_LIST_SEARCH');

export const getListEntry = (url: string, site_name: string | null, user_id: string | null | undefined) => {
  const prams: GetListEtntryRequest = {
    site_name: site_name,
    user_id: user_id,
  }
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    try {
      const response = await axios.get(createURL(url, prams));
      const result: GetListEntryResult = {
        results: response.data,
        valid: false,
        validMsg: "",
      };
      dispatch(onSearch(result));
    } catch {
      const result: GetListEntryResult = {
        results: [],
        valid: true,
        validMsg: "想定外のエラーが発生しました",
      };
      dispatch(onSearch(result));
    }
  };
};

export const ListEntryActions = {
  onSearch,
};