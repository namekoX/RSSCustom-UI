import { Action } from 'typescript-fsa';
import { connect } from 'react-redux';
import { AppState } from '../store';
import Const from '../common/const';
import { CommonActions } from '../actions/CommonActions';
import { ListEntry } from '../components/ListEntry';
import { ListEntryActions, getListEntry } from '../actions/ListEntryActions';
import { push } from 'connected-react-router';

export interface Actions {
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
  onSearch: (site_name: string | null, user_id: string | null | undefined) => void,
  toUpdate: (entryNo:number) => void,
  onSelect: (url: string) => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState: (value: any, name: string) => dispatch(CommonActions.updateState({ name, value })),
    onSearch: async (site_name: string | null, user_id: string | null | undefined) =>{
      dispatch(CommonActions.updateState({ name: "loading", value: true }));
      await dispatch(getListEntry(Const.GET_LIST_ENTRY_URL, site_name, user_id))
      dispatch(CommonActions.updateState({ name: "loading", value: false }));
    },
    toUpdate: (entryNo:number) =>{
      dispatch(CommonActions.updateState({ name: "entryNo", value: entryNo }));
      dispatch(push("update"));
    },
    onSelect: (url: string) => {
      dispatch(CommonActions.updateState({ name: "menuTabActive", value: url }));
      dispatch(push(url));
    }
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign(appState.Entry, appState.ListEntry);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEntry);