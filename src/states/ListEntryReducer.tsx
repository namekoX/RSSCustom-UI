import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ListEntryActions } from '../actions/ListEntryActions';
import GetListEntryResultItem from '../interface/GetListEntryResultItem';

export interface ListEntryState {
  valid: boolean;
  validMsg: string;
  entrys: GetListEntryResultItem[];
  site_name: string;
  loading: boolean,
  pagerActive: number,
  pagerTotalCount: number,
  isOpenUser: boolean,
}

export const listEntryDefault: ListEntryState = {
  valid: false,
  validMsg: "",
  entrys: [],
  site_name: "",
  loading: false,
  pagerActive: 1,
  pagerTotalCount: 50,
  isOpenUser: false,
};

export const ListEntryReducer = reducerWithInitialState(listEntryDefault)
  .case(ListEntryActions.onSearch, (state, payload) => {
    return Object.assign({}, state, {
      entrys: payload.results,
      valid: payload.valid,
      validMsg: payload.validMsg,
      pagerActive: payload.pagerActive,
      pagerTotalCount: payload.pagerTotalCount,
    });
  })
  .case(ListEntryActions.updateState, (state, { name, value }) => {
    return Object.assign({}, state, { [name]: value });
  })
  .case(ListEntryActions.onClear, (state, {}) => {
    return Object.assign({}, state, listEntryDefault);
  })
  .case(ListEntryActions.onDelete, (state, payload) => {
    return Object.assign({}, state, {
      valid: payload.valid,
      validMsg: payload.validMsg,
    });
  })    
  ;
