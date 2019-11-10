import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { CommonActions } from '../actions/CommonActions';
import { Entry } from '../components/Entry';


export interface Actions {
  updateState: (value: any, name:string) => Action<{ name: string, value: any }>;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    updateState: (value: any, name:string) => dispatch(CommonActions.updateState({name,value})),
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.Entry);
}

export default connect(mapStateToProps, mapDispatchToProps)(Entry);