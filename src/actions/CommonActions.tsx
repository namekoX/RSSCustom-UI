import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const CommonActions = {
  updateState: actionCreator<{ name: string, value: any }>('ACTIONS_UPDATE_STATE'),
};