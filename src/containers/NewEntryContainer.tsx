import { Action } from 'typescript-fsa';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { NewEntryActions, getTitle, postEntry } from '../actions/NewEntryActions';
import { NewEntry } from '../components/NewEntry';
import PostEntryRequest from '../interface/PostEntryRequest';
import Const from '../common/const';

export interface Actions {
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
  onConfirme: (url: string) => void,
  onRegister: (body: PostEntryRequest) => void,
  onClear:() => Action<{}>,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState: (value: any, name: string) => dispatch(NewEntryActions.updateState({ name, value })),
    onConfirme: (url: string) => {
      dispatch(NewEntryActions.updateState({ name: "loadingConfirme", value: true }));
      dispatch(NewEntryActions.updateState({ name: "validConfirme", value: false }));
      dispatch(getTitle(Const.GET_TITLE_URL, { "url": url }));
    },
    onRegister: (body: PostEntryRequest) => {
      dispatch(NewEntryActions.updateState({ name: "loadingRegister", value: true }));
      dispatch(NewEntryActions.updateState({ name: "validRegister", value: false }));
      dispatch(postEntry(Const.POST_ENTRY_URL, body));
    },
    onClear: () => dispatch(NewEntryActions.onClear({})),
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.Entry);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEntry);