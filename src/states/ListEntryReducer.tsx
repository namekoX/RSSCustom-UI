import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ListEntryActions } from '../actions/ListEntryActions';
import GetListEntryResultItem from '../interface/GetListEntryResultItem';
import { CommonActions } from '../actions/CommonActions';

export interface ListEntryState {
  valid: boolean;
  validMsg: string;
  entrys: GetListEntryResultItem[];
  site_name: string;
  loading: boolean,
}

export const listEntryDefault: ListEntryState = {
  valid: false,
  validMsg: "",
  entrys: [],
  site_name: "",
  loading: false,
};

export const ListEntryReducer = reducerWithInitialState(listEntryDefault)
  .case(ListEntryActions.onSearch, (state, payload) => {
    return Object.assign({}, state, {
      entrys: payload.results,
      valid: payload.valid,
      validMsg: payload.validMsg,
    });
  })
  .case(CommonActions.updateState, (state, { name, value }) => {
    return Object.assign({}, state, { [name]: value });
  })
  ;
