import { connect } from 'react-redux';
import { AppState } from '../store';
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
      dispatch(NewEntryActions.onClear({}));
      dispatch(AppActions.onClear({}));
      dispatch(UserActions.onClear({}));
      if (url == "/logout"){
        dispatch(AppActions.updateState({ name: "isLogin", value: false }));
      }
      dispatch(push(url));
    }
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.Root);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi);