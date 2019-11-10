import Cookies from "js-cookie";
import Const from "./const";
import { isEnptystr } from "./utils";

let appStart:boolean = false;

export function setAppStart(val: boolean) {
  appStart = val;
}

export function getAppStart() {
  return appStart || !(isEnptystr(Cookies.get(Const.KEY_USER_ID)));
}

export function isLogin(){
  return !(isEnptystr(Cookies.get(Const.KEY_USER_ID)))
}

export function getUserName(){
  return isEnptystr(Cookies.get(Const.KEY_USER_ID)) ? "ゲストさん" : Cookies.get(Const.KEY_USER_ID) + "さん"
}