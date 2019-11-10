import { Action } from 'typescript-fsa';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { CommonActions } from '../actions/CommonActions';
import PostUserRequest from '../interface/PostUserRequest';
import { postUser, chkUser } from '../actions/UserActions';
import Const from '../common/const';
import { Login } from '../components/Login';
import { push } from 'connected-react-router';
import { getAppStart, setAppStart } from '../common/global';
import { AppActions } from '../actions/AppActions';

export interface Actions {
  updateState: (value: any, name: string) => Action<{ name: string, value: any }>,
  onRegister: (chkpassword: string,body: PostUserRequest) => void,
  onLogin: (body: PostUserRequest) => void,
  onNoLoginStart: () => void,
  toNew: () => void,
  toTop: () => void,
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateState: (value: any, name: string) => dispatch(CommonActions.updateState({ name, value })),
    onRegister: async (chkpassword: string,body: PostUserRequest) => {
      dispatch(CommonActions.updateState({ name: "loadingRegister", value: true }));
      dispatch(CommonActions.updateState({ name: "valid", value: false }));
      dispatch(CommonActions.updateState({ name: "info", value: false }));
      await dispatch(postUser(Const.POST_USER_URL, chkpassword, body));
      dispatch(CommonActions.updateState({ name: "loadingRegister", value: false }));  //TODO:何故か画面が再描画されないのでstateを更新する
    },
    onLogin: async (body: PostUserRequest) => {
      dispatch(CommonActions.updateState({ name: "loadingRegister", value: true }));
      dispatch(CommonActions.updateState({ name: "valid", value: false }));
      dispatch(CommonActions.updateState({ name: "info", value: false }));
      await dispatch(chkUser(Const.LOGIN_URL, body));
      dispatch(AppActions.updatelogininfo({ }));
      if (getAppStart()) {
        dispatch(push("/menu"));
      };
    },
    onNoLoginStart:() =>{
      setAppStart(true);
      dispatch(CommonActions.updateState({ name: "isAppStart", value: true }));    
      dispatch(push("/menu"));
    },
    toNew:() =>{
      dispatch(CommonActions.updateState({ name: "loadingRegister", value: true }));
      dispatch(CommonActions.updateState({ name: "valid", value: false }));
      dispatch(CommonActions.updateState({ name: "info", value: false }));
      dispatch(CommonActions.updateState({ name: "isNew", value: true }));
      dispatch(CommonActions.updateState({ name: "btnName", value: "新規登録" }));
    },
    toTop:() =>{
      dispatch(AppActions.updatelogininfo({ }));
      dispatch(push("/menu"));
    }
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign(appState.Root, appState.User);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);