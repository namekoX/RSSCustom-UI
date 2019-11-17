import { Action } from 'typescript-fsa';
import { connect } from 'react-redux';
import { AppState } from '../store';
import Const from '../common/const';
import { ListEntry } from '../components/ListEntry';
import { ListEntryActions, getListEntry, deleteEntry } from '../actions/ListEntryActions';
import { push } from 'connected-react-router';
import DeleteEntryRequest from '../interface/DeleteEntryRequest';

export interface Actions {
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
  onSearch: (site_name: string | null, user_id: string | null | undefined, pageNumber: number) => void,
  toUpdate: (entryNo: number, isuser: boolean) => void,
  onDelete: (entryNo: number, user_id: string | null | undefined) => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState: (value: any, name: string) => dispatch(ListEntryActions.updateState({ name, value })),
    onSearch: async (site_name: string | null, user_id: string | null | undefined, pageNumber: number) => {
      dispatch(ListEntryActions.updateState({ name: "loading", value: true }));
      await dispatch(getListEntry(Const.GET_LIST_ENTRY_URL, site_name, user_id, pageNumber))
      dispatch(ListEntryActions.updateState({ name: "loading", value: false }));
    },
    toUpdate: (entryNo: number, isuser: boolean) => {
      if (isuser){
        dispatch(push(Const.SITE_ROOT + "/menu/update/user/" + entryNo));
      } else {
        dispatch(push(Const.SITE_ROOT + "/menu/update/guest/" + entryNo));
      }
    },
    onSelect: (url: string) => {
      dispatch(ListEntryActions.updateState({ name: "menuTabActive", value: url }));
      dispatch(push(url));
    },
    onDelete: (entryNo: number, user_id: string | null | undefined) => {
      const body: DeleteEntryRequest = {
        entryNo: entryNo,
        user_id: user_id,
      }
      dispatch(deleteEntry(Const.DELETE_LIST_ENTRY_URL, body));
    },
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.ListEntry);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEntry);