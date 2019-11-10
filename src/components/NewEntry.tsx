import * as React from 'react';
import { Actions } from '../containers/NewEntryContainer';
import { Button, Row, Col, FormControl, Alert } from "react-bootstrap";
import { Br } from '../common/Br';
import EntryContainer from '../containers/EntryContainer';
import { SpinnerButton } from '../common/SpinnerButton';
import PostEntryRequest from '../interface/PostEntryRequest';
import { getChkBool, createURL, getext, isEnptystr } from '../common/utils';
import Const from '../common/const';
import { EntryState } from '../states/EntryReducer';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

interface OwnProps { }
type NewEntryProps = OwnProps & EntryState & Actions;

export const NewEntry: React.FC<NewEntryProps> = (props: NewEntryProps) => {
  return (
    <div>
      <Row className="width90">
        <Col sm={12}>
          <h2>新規登録</h2>
          <label htmlFor="basic-url">RSSのURL</label>
          <FormControl
            type="text"
            placeholder="URLを入力"
            value={props.url}
            disabled={!props.disableFields}
            maxLength={255}
            onChange={(e: any) => props.updateState(e.target.value, "url")}
          />
        </Col>
      </Row>
      <Row className="width90">
        <Col sm={12}>
          {props.validConfirme &&
            <Alert
              variant={"danger"}
            >
              {props.validConfirmeMsg}
            </Alert>
          }
        </Col>
      </Row>
      <Row className="width90">
        <Col sm={12}>
          {props.loadingConfirme ?
            <SpinnerButton />
            :
            <Button
              variant="primary"
              type="submit"
              onClick={(e: any) => props.onConfirme(props.url)}
              disabled={!props.disableFields}
            >
              確認
            </Button>
          }
        </Col>
      </Row>
      <Br count={1} />
      <Row className="width90">
        <Col sm={12}>
          <hr />
        </Col>
      </Row>
      {!props.disableFields &&
        <div>
          <EntryContainer />
          <Row className="width90">
            <Col sm={12}>
              {props.loadingRegister ?
                <SpinnerButton />
                :
                <Button
                  variant="primary"
                  type="submit"
                  onClick={
                    (e: any) => {
                      const body: PostEntryRequest = {
                        url: props.url,
                        user_id: isEnptystr(Cookies.get(Const.KEY_USER_ID)) ? null : Cookies.get(Const.KEY_USER_ID),
                        site_name: props.sitename,
                        inclede_category: getChkBool(props.chkIncledeCategory) && props.incledeCategory != "" ? props.incledeCategory : null,
                        inclede_subject: getChkBool(props.chkIncledeSubject) && props.incledeSubject != "" ? props.incledeSubject : null,
                        inclede_creater: getChkBool(props.chkIncledeCreater) && props.incledeCreater != "" ? props.incledeCreater : null,
                        max_count: getChkBool(props.chkLimitCount) && !isNaN(Number(props.LimitCount)) ? Number(props.LimitCount) : null,
                        limit_day: getChkBool(props.chkUntilDate) && !isNaN(Number(props.UntilDate)) ? Number(props.UntilDate) : null,
                        version: props.version
                      }
                      props.onRegister(body)
                    }
                  }
                  disabled={props.infoRegister}
                >
                  登録
                </Button>
              }
            </Col>
          </Row>
        </div>
      }
      {!props.disableFields && props.infoRegister &&
        <div>
          <Row className="width90">
            <Col sm={12}>
              <Alert
                variant={"success"}
              >
                {props.infoRegisterMsg}
              </Alert>
            </Col>
          </Row>
          <Row className="width90">
            <Col sm={12}>
              <p>
                <a
                  href={createURL(Const.GET_RSS_URL) + props.entryNo + ".xml/?ver=" + getext(props.version)}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {createURL(Const.GET_RSS_URL) + props.entryNo + ".xml/?ver=" + getext(props.version)}
                </a>
              </p>
            </Col>
          </Row>
        </div>
      }
      {!props.disableFields && props.validRegister &&
        <div>
          <Row className="width90">
            <Col sm={12}>
              <Alert
                variant={"danger"}
              >
                {props.validRegisterMsg}
              </Alert>
            </Col>
          </Row>
        </div>
      }
      {!props.disableFields &&
        <div>
          <Row className="width90">
            <Col sm={12}>
              <Button
                variant="primary"
                type="submit"
                onClick={(e: any) => props.onClear()}
              >
                最初からやり直す
              </Button>
            </Col>
          </Row>
        </div>
      }
    </div >
  );
};