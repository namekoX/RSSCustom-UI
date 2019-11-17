import * as React from 'react';
import { Row, Col, Card, Nav } from 'react-bootstrap';
import { RootState } from '../states/AppReducer';
import { Actions } from '../containers/NaviContainer';
import NewEntryContainer from '../containers/NewEntryContainer';
import { Tab } from 'react-bootstrap';
import ListEntryContainer from '../containers/ListEntryContainer';
import { Switch, Route } from 'react-router-dom';
import UpdateEntryContainer from '../containers/UpdateEntryContainer';
import { isLongWidth } from '../common/utils';
import LoginContainer from '../containers/LoginContainer';
import Const from '../common/const';

interface OwnProps {
  location: Location;
}
interface Location {
  pathname: string;
}

type Menuprops = OwnProps & RootState & Actions;

export const Menu: React.FC<Menuprops> = (props: Menuprops) => {
  return (
    <div className="padding10">

      <Tab.Container id="left-tabs" activeKey={props.menuTabActive}>
        <Row>
          <Col sm={3}>
            <Card border="dark" style={{ width: '90%' }}>
              <Card.Header>メニュー</Card.Header>
              <Card.Body>
                <Nav variant="pills" className="flex-column Menu" onSelect={(selectedKey: string) => props.onSelect(`${selectedKey}`)} >
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/new" className="MenuItem">新規登録</Nav.Link>
                  </Nav.Item>
                  {props.isLogin && 
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/list/user" className="MenuItem">登録済みデータ</Nav.Link>
                  </Nav.Item>
                  }
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/list/guest" className="MenuItem">未ログインユーザー登録済みデータ</Nav.Link>
                  </Nav.Item>
                  {props.isLogin && 
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/changepassword" className="MenuItem">パスワード変更</Nav.Link>
                  </Nav.Item>
                  }
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={9} className={isLongWidth(props.location.pathname) ? "longwidth":""}>
            <Switch>
              <Route exact path={Const.SITE_ROOT + '/menu/new'} component={NewEntryContainer} />
              <Route path={Const.SITE_ROOT + '/menu/update/:user/:entryNo'}  component={UpdateEntryContainer} />
              {props.isLogin && <Route exact path={Const.SITE_ROOT + '/menu/list/user'}  component={ListEntryContainer} />}
              <Route exact path={Const.SITE_ROOT + '/menu/list/guest'}  component={ListEntryContainer} />
              <Route exact path={Const.SITE_ROOT + '/menu/changepassword'}  component={LoginContainer} />
              <Route component={NewEntryContainer} />
            </Switch>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};