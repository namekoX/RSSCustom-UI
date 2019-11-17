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
import ReactGA from 'react-ga';
import { Howto } from './components/Howto';
import Const from './common/const';

interface OwnProps {
  location?: Location;
}
interface Location {
  pathname: string;
}

type AppProps = OwnProps & RootState;

export const App: React.FC<AppProps> = (props: AppProps) => {
  React.useEffect(() => {
    if(props.location != undefined){
      ReactGA.set({ page: Const.SITE_ROOT + props.location.pathname });
      ReactGA.pageview( Const.SITE_ROOT + props.location.pathname);
    }
  }, [])
  return (
    <div>
      <NaviContainer />
      <React.Fragment>
        <div className = "bkimg">
          <Switch>
            <Route exact path={Const.SITE_ROOT + '/'} component={props.isAppStart ? MenuContainer : LoginContainer} />
            <Route path={Const.SITE_ROOT + '/menu'}  component={MenuContainer} />
            <Route exact path={Const.SITE_ROOT + '/login'} component={props.isLogin ? MenuContainer : LoginContainer} />
            <Route exact path={Const.SITE_ROOT + '/logout'} component={Logout} />
            <Route exact path={Const.SITE_ROOT + '/howto'} component={Howto} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </React.Fragment>
    </div>
  );
}
