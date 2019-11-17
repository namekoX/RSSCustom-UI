import { Action } from 'typescript-fsa';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { updateEntry, getEntry } from '../actions/UpdateEntryActions';
import { UpdateEntry } from '../components/UpdateEntry';
import PostEntryRequest from '../interface/PostEntryRequest';
import Const from '../common/const';
import { NewEntryActions } from '../actions/NewEntryActions';
import { AppActions } from '../actions/AppActions';
import { push } from 'connected-react-router';

export interface Actions {
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
  onUpdate: (body: PostEntryRequest) => void,
  onGet: (entryNo: number, user_id: string | null | undefined) => void,
  toTop: () => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState:  (value: any, name: string) => dispatch(NewEntryActions.updateState({ name, value })),
    onUpdate: async (body: PostEntryRequest) => {
      dispatch(NewEntryActions.updateState({ name: "loadingRegister", value: true }));
      dispatch(NewEntryActions.updateState({ name: "validRegister", value: false }));
      dispatch(NewEntryActions.updateState({ name: "infoRegister", value: false }));
      await dispatch(updateEntry(Const.PUT_ENTRY_URL, body));
    },
    onGet: (entryNo: number, user_id: string | null | undefined) => {
      dispatch(getEntry(Const.GET_ENTRY_URL, entryNo, user_id));
    },
    toTop:() =>{
      dispatch(AppActions.onClear({ }));
      dispatch(NewEntryActions.onClear({ }));
      dispatch(push(Const.SITE_ROOT + "/menu/new"));
    }
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.Entry);
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEntry);