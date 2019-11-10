import * as React from 'react';
import { Row, Col, Card, Nav } from 'react-bootstrap';
import { RootState } from '../states/AppReducer';
import { Actions } from '../containers/NaviContainer';
import NewEntryContainer from '../containers/NewEntryContainer';
import { Tab } from 'react-bootstrap';
import ListEntryContainer from '../containers/ListEntryContainer';
import { Switch, Route } from 'react-router-dom';
import UpdateEntryContainer from '../containers/UpdateEntryContainer';

type Menuprops = RootState & Actions;

export const Menu: React.FC<Menuprops> = (props: Menuprops) => {
  return (
    <div className="padding10">

      <Tab.Container id="left-tabs" activeKey={props.menuTabActive}>
        <Row>
          <Col sm={2}>
            <Card border="dark" style={{ width: '18rem' }}>
              <Card.Header>メニュー</Card.Header>
              <Card.Body>
                <Nav variant="pills" className="flex-column Menu" onSelect={(selectedKey: string) => props.onSelect(`${selectedKey}`)} >
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/new" className="MenuItem">新規登録</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/list" className="MenuItem">登録済みデータの編集</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={10}>
            <Switch>
              <Route exact path='/menu/new' component={NewEntryContainer} />
              <Route path='/menu/update' component={UpdateEntryContainer} />
              <Route path='/menu/list' component={ListEntryContainer} />
              <Route component={NewEntryContainer} />
            </Switch>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};