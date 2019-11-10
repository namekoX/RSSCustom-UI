import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { NewEntryActions } from '../actions/NewEntryActions';
import { UpdateEntryActions } from '../actions/UpdateEntryActions';
import { isEnptynum, isEnptystr } from '../common/utils';
import { CommonActions } from '../actions/CommonActions';

export interface EntryState {
  url: string,
  version: string,
  sitename: string,
  incledeCategory: string,
  incledeSubject: string,
  incledeCreater: string,
  disableFields: boolean,
  chkIncledeCategory: number,
  chkIncledeSubject: number,
  chkIncledeCreater: number,
  validConfirme: boolean,
  validConfirmeMsg: string,
  loadingConfirme: boolean,
  chkLimitCount:number,
  chkUntilDate:number,
  LimitCount:string,
  UntilDate:string,
  loadingRegister: boolean,
  validRegister: boolean,
  validRegisterMsg: string,
  infoRegister: boolean,
  infoRegisterMsg: string,
  entryNo: number,
}

const initialState: EntryState = {
  url: '',
  version: '',
  sitename: '',
  incledeCategory: '',
  incledeSubject: '',
  incledeCreater: '',
  disableFields: true,
  chkIncledeCategory: 0,
  chkIncledeSubject: 0,
  chkIncledeCreater: 0,
  validConfirme: false,
  validConfirmeMsg: '',
  loadingConfirme: false,
  chkLimitCount:0,
  chkUntilDate:0,
  LimitCount:'',
  UntilDate:'',
  loadingRegister:false,
  validRegister: false,
  validRegisterMsg: '',
  infoRegister: false,
  infoRegisterMsg: '',
  entryNo: 0,
};

export const EntryReducer = reducerWithInitialState(initialState)
  .case(NewEntryActions.onConfirme, (state, payload) => {
    return Object.assign({}, state, {
      sitename: payload.title,
      version: payload.version,
      validConfirme: payload.validConfirme,
      validConfirmeMsg: payload.validConfirmeMsg,
      disableFields: payload.validConfirme,
      loadingConfirme:false,
    });
  })
  .case(NewEntryActions.onRegister, (state, payload) => {
    return Object.assign({}, state, {
      entryNo: payload.entryNo,
      validRegister: payload.validRegister,
      validRegisterMsg: payload.validRegisterMsg,
      infoRegister: payload.infoRegister,
      infoRegisterMsg: payload.infoRegisterMsg,
      loadingRegister:false,
    });
  })
  .case(NewEntryActions.onClear, (state, {}) => {
    return Object.assign({}, state, initialState);
  })
  .case(UpdateEntryActions.onGet, (state, payload) => {
    return Object.assign({}, state, {
      url: payload.url,
      sitename: payload.site_name,
      incledecategory: payload.inclede_category,
      incledesubject: payload.inclede_subject,
      incledecreater: payload.inclede_creater,
      maxcount: payload.max_count,
      limitday: payload.limit_day,
      chkIncledeCategory: isEnptystr(payload.inclede_category) ? 0:1,
      chkIncledeSubject: isEnptystr(payload.inclede_subject) ? 0:1,
      chkIncledeCreater: isEnptystr(payload.inclede_creater) ? 0:1,
      chkLimitCount: isEnptynum(payload.max_count) ? 0:1,
      chkUntilDate: isEnptynum(payload.limit_day) ? 0:1,
      version: payload.version,
      validRegister: false,
      validRegisterMsg: "",
      infoRegister: false,
      infoRegisterMsg: "",
    });
  })
  .case(UpdateEntryActions.onUpdate, (state, payload) => {
    return Object.assign({}, state, {
      validRegister: payload.validRegister,
      validRegisterMsg: payload.validRegisterMsg,
      infoRegister: payload.infoRegister,
      infoRegisterMsg: payload.infoRegisterMsg,
      loadingRegister: false,
    })
  })
  .case(CommonActions.updateState, (state, { name, value }) => {
    return Object.assign({}, state, { [name]: value });
  })
  ;
