import * as React from 'react';
import { Link } from 'react-router-dom';
import Const from '../common/const';
import Cookies from 'js-cookie';
import { Br } from '../common/Br';

export class Logout extends React.Component {
  constructor (props:any) {
    super(props);
    Cookies.remove(Const.KEY_USER_ID);
  }
  render () {
    return (
      <div className="padding10">
        ログアウトしました
        <Br count={1} />
        <Link to={Const.SITE_ROOT + "/menu"}>トップへ戻る</Link>
      </div >
    );
  }
};
