import { connect } from 'react-redux';
import { AppState } from '../store';
import { Menu } from '../components/Menu';
import { CommonActions } from '../actions/CommonActions';
import { push } from 'connected-react-router';
import { NewEntryActions } from '../actions/NewEntryActions';

export interface Actions {
  onSelect: (url: string) => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    onSelect: (url: string) => {
      dispatch(NewEntryActions.onClear({}));
      dispatch(CommonActions.updateState({ name: "menuTabActive", value: url }));
      dispatch(push(url));
    }
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.Root);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);