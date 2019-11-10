import { Action } from 'typescript-fsa';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { updateEntry, getEntry } from '../actions/UpdateEntryActions';
import { UpdateEntry } from '../components/UpdateEntry';
import PostEntryRequest from '../interface/PostEntryRequest';
import Const from '../common/const';
import { CommonActions } from '../actions/CommonActions';

export interface Actions {
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
  onUpdate: (body: PostEntryRequest) => void,
  onGet: (entryNo: number, user_id: string | null | undefined) => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState:  (value: any, name: string) => dispatch(CommonActions.updateState({ name, value })),
    onUpdate: async (body: PostEntryRequest) => {
      dispatch(CommonActions.updateState({ name: "loadingRegister", value: true }));
      dispatch(CommonActions.updateState({ name: "validRegister", value: false }));
      dispatch(CommonActions.updateState({ name: "infoRegister", value: false }));
      await dispatch(updateEntry(Const.PUT_ENTRY_URL, body));
    },
    onGet: (entryNo: number, user_id: string | null | undefined) => {
      dispatch(getEntry(Const.GET_ENTRY_URL, entryNo, user_id));
    },
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.Entry);
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEntry);