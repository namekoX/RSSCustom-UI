import NewEntryContainer from './containers/NewEntryContainer';
import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { Navi } from './components/Navi';
import UpdateEntryContainer from './containers/UpdateEntryContainer';
import { getAppStart } from './common/global';
import LoginContainer from './containers/LoginContainer';
import { Logout } from './components/Logout';
import { NotFound } from './components/NotFound';
import { RootState } from './states/AppReducer';
import NaviContainer from './containers/NaviContainer';
import MenuContainer from './containers/MenuContainer';

interface OwnProps { }

type AppProps = OwnProps & RootState;

export const App: React.FC<AppProps> = (props: AppProps) => {
  return (
    <div>
      <NaviContainer />
      <React.Fragment>
        <div>
          <Switch>
            <Route path='/menu' component={props.isAppStart ? MenuContainer: LoginContainer} />
            <Route exact path='/login' component={props.isLogin ? MenuContainer : LoginContainer} />
            <Route exact path='/logout' component={Logout} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </React.Fragment>
    </div>
  );
}
