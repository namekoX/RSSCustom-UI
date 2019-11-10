import * as React from 'react';
import { Actions } from '../containers/LoginContainer';
import { Row, Col, InputGroup, FormControl, Button, Card, ListGroupItem, ListGroup, Alert } from "react-bootstrap";
import { UserState } from '../states/UserReducer';
import PostUserRequest from '../interface/PostUserRequest';
import { Br } from '../common/Br';
import Cookies from 'js-cookie';
import Const from '../common/const';

interface OwnProps { }

type UserProps = OwnProps & UserState & Actions;

export const Login: React.FC<UserProps> = (props: UserProps) => {
  return (
    <div className="padding10">
      <Card className="cardTitle">
        <Card.Body>
          <Card.Title>{props.isNew ? "新規ユーザー登録" : props.isChange ? "パスワード変更" : "ログイン"}</Card.Title>
          {!(props.isNew || props.isChange) &&
            <Card.Text>
              ユーザー登録することで一度登録をしたRSSを編集することができます。
              ログインせずに使用する場合は、作成したRSSは変更できないため、変更する必要がある場合は、もう一度RSSを新規登録をしてください。
            </Card.Text>
          }
        </Card.Body>
        <ListGroup className="list-group-flush">
          {!props.isChange &&
            <ListGroupItem>
              <FormControl
                type="text"
                placeholder="ユーザーID"
                value={props.user_id}
                maxLength={50}
                onChange={(e: any) => props.updateState(e.target.value, "user_id")}
              />
            </ListGroupItem>
          }
          <ListGroupItem>
            <FormControl
              type="password"
              placeholder= {props.isChange ? "新パスワード" : "パスワード"}
              value={props.password}
              maxLength={50}
              onChange={(e: any) => props.updateState(e.target.value, "password")}
            />
          </ListGroupItem>
          {(props.isNew || props.isChange) &&
            <ListGroupItem>
              <FormControl
                type="password"
                placeholder=　{props.isChange ? "新パスワード(確認)" : "パスワード(確認)"}
                value={props.chkpassword}
                maxLength={50}
                onChange={(e: any) => props.updateState(e.target.value, "chkpassword")}
              />
            </ListGroupItem>
          }
        </ListGroup>
        {(props.valid || props.info) &&
          <div>
            <Row className="width90">
              <Col sm={1}></Col>
              <Col sm={11}>
                <Alert
                  variant={props.valid ? "danger" : "success"}
                >
                  {props.msg}
                </Alert>
              </Col>
            </Row>
          </div>
        }
        <Card.Body>
          <Button
            variant="primary"
            type="submit"
            onClick={
              (e: any) => {
                const body: PostUserRequest = {
                  user_id: props.isChange ? Cookies.get(Const.KEY_USER_ID) : props.user_id,
                  password: props.password,
                };
                if (props.btnName=="ログイン") {
                  props.onLogin(body);
                } else if (props.btnName=="更新") {
                  props.onUpdate(props.chkpassword, body);
                } else if (props.btnName=="戻る") {
                  props.toTop();
                } else {
                  props.onRegister(props.chkpassword, body);
                }
              }
            }
          >
            {props.btnName}
          </Button>
        </Card.Body>
      </Card>
      {!(props.isNew || props.isChange) &&
        <div>
          <Br count={1} />
          <Button
            variant="secondary"
            type="submit"
            className="widthrem36"
            onClick={
              (e: any) => {
                props.toNew();
              }
            }
          >
            新規ユーザー登録
          </Button>
          <Br count={1} />
          <Button
            variant="secondary"
            type="submit"
            className="widthrem36"
            onClick={
              (e: any) => {
                props.onNoLoginStart();
              }
            }
          >
            ログインせずに使う
          </Button>
        </div>
      }
    </div >
  );
};