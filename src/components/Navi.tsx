import * as React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { RootState } from '../states/AppReducer';
import { Actions } from '../containers/NaviContainer';
import { getUserName } from '../common/global';

type Naviprops = RootState & Actions;

export const Navi: React.FC<Naviprops> = (props: Naviprops) => {
  return (
    <div>
      <Navbar bg="light" expand="lg" className = "HeadNavi">
        <Navbar.Brand href="/menu"><h1>RSSカスタム</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <p className="text-center mt-4 mb-4"> {props.isLogin ? getUserName() + "でログイン中です" : "ログインしていません"}</p>
          <Nav className="ml-auto" onSelect={(selectedKey: string) => props.onSelect(`${selectedKey}`)} >
            <Nav.Link eventKey="/menu/new" >トップ</Nav.Link>
            <Nav.Link href="update">問い合わせ</Nav.Link>
            {props.isLogin ?
              <Nav.Link eventKey="/logout">ログアウト</Nav.Link>
              :
              <Nav.Link eventKey="/login" >ログイン</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};