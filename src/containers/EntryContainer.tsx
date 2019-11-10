import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { Entry } from '../components/Entry';
import { NewEntryActions } from '../actions/NewEntryActions';


export interface Actions {
  updateState: (value: any, name:string) => Action<{ name: string, value: any }>;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    updateState: (value: any, name:string) => dispatch(NewEntryActions.updateState({name,value})),
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.Entry);
}

export default connect(mapStateToProps, mapDispatchToProps)(Entry);