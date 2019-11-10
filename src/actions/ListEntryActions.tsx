import actionCreatorFactory from 'typescript-fsa';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { AppState } from '../store';
import { createURL } from '../common/utils';
import GetListEntryResult from '../interface/GetListEntryResult';
import GetListEtntryRequest from '../interface/GetListEtntryRequest';
import Const from '../common/const';
import DeleteEntryRequest from '../interface/DeleteEntryRequest';
import DeleteEntryResult from '../interface/DeleteEntryResult';

const actionCreator = actionCreatorFactory();

const onSearch = actionCreator<GetListEntryResult>('ACTIONS_LIST_SEARCH');
const onDelete = actionCreator<DeleteEntryResult>('ACTIONS_LIST_DELETE');

export const getListEntry = (url: string, site_name: string | null, user_id: string | null | undefined, page: number) => {
  const prams: GetListEtntryRequest = {
    site_name: site_name,
    user_id: user_id,
    page: page,
    perpage: Const.LIST_PAGER_PERPAGE,
  }
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    try {
      const response = await axios.get(createURL(url, prams));
      const result: GetListEntryResult = {
        results: response.data.tableData,
        valid: response.data.pagerTotalCount == 0,
        validMsg: response.data.pagerTotalCount == 0 ? "データがありませんでした" : "",
        pagerTotalCount: response.data.pagerTotalCount,
        pagerActive: page,
      };
      dispatch(onSearch(result));
    } catch {
      const result: GetListEntryResult = {
        results: [],
        valid: true,
        validMsg: "想定外のエラーが発生しました",
        pagerTotalCount: Const.LIST_PAGER_PERPAGE,
        pagerActive: page,
      };
      dispatch(onSearch(result));
    }
  };
};

export const deleteEntry = (url: string, body: DeleteEntryRequest) => {
  return async (dispatch: Dispatch<Action>, getState: () => AppState) => {
    try {
      await axios.post(createURL(url), body);
      const result: DeleteEntryResult = {
        valid: false,
        validMsg: "削除しました。",
      };
      dispatch(onDelete(result));
    } catch {
      const result: DeleteEntryResult = {
        valid: true,
        validMsg: "想定外のエラーが発生しました",
      };
      dispatch(onDelete(result));
    }
  };
};

export const ListEntryActions = {
  onSearch,
  onDelete,
  updateState: actionCreator<{ name: string, value: any }>('ACTIONS_LIST_ENTRY_UPDATE_STATE'),
  onClear: actionCreator<{}>('ACTIONS_LIST_ENTRY_CLEAR'),
};