import { connect } from 'react-redux';
import { AppState } from '../store';
import { Menu } from '../components/Menu';
import { AppActions } from '../actions/AppActions';
import { push } from 'connected-react-router';
import { NewEntryActions } from '../actions/NewEntryActions';
import { UserActions } from '../actions/UserActions';

export interface Actions {
  onSelect: (url: string) => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    onSelect: (url: string) => {
      dispatch(NewEntryActions.onClear({}));
      dispatch(AppActions.updateState({ name: "menuTabActive", value: url }));
      if (url == "/menu/changepassword"){
        dispatch(UserActions.onClear({}));
        dispatch(UserActions.updateState({ name: "isChange", value: true }));
        dispatch(UserActions.updateState({ name: "btnName", value: "更新" }));
      }
      dispatch(push(url));
    }
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.Root);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);