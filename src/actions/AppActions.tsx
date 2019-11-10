import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const AppActions = {
  updatelogininfo: actionCreator<{}>('ACTIONS_UPDATE_LOGIN_INFO'),
  onClear: actionCreator<{}>('ACTIONS_APP_CLEAR'),
};