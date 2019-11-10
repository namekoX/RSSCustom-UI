import { connect } from 'react-redux';
import { AppState } from '../store';
import { CommonActions } from '../actions/CommonActions';
import { push } from 'connected-react-router';
import { Navi } from '../components/Navi';
import { AppActions } from '../actions/AppActions';
import { NewEntryActions } from '../actions/NewEntryActions';
import { UserActions } from '../actions/UserActions';

export interface Actions {
  onSelect: (url: string) => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    onSelect: (url: string) => {
      if (url == "logout"){
        dispatch(CommonActions.updateState({ name: "isLogin", value: false }));
      }
      dispatch(NewEntryActions.onClear({}));
      dispatch(AppActions.onClear({}));
      dispatch(UserActions.onClear({}));
      dispatch(push(url));
    }
  };
}

function mapStateToProps(appState: AppState) {
  const ret = Object.assign(appState.Entry, appState.Root);
  return Object.assign(ret, appState.User);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi);