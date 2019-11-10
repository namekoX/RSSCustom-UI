import * as React from 'react';
import { Link } from 'react-router-dom';
import { Br } from '../common/Br';

export class NotFound extends React.Component {
  constructor (props:any) {
    super(props);
  }
  render () {
    return (
      <div className="padding10">
        不正なURLです
        <Br count={1} />
        <Link to="/menu">トップへ戻る</Link>
      </div >
    );
  }
};
