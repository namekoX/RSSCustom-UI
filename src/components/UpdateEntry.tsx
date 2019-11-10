import * as React from 'react';
import { Actions } from '../containers/UpdateEntryContainer';
import { Button, Row, Col, FormControl, Alert } from "react-bootstrap";
import { Br } from '../common/Br';
import EntryContainer from '../containers/EntryContainer';
import { SpinnerButton } from '../common/SpinnerButton';
import PostEntryRequest from '../interface/PostEntryRequest';
import { getChkBool, createURL, getext, isEnptystr } from '../common/utils';
import Const from '../common/const';
import { useEffect } from 'react';
import { EntryState } from '../states/EntryReducer';
import Cookies from 'js-cookie';

interface OwnProps { }

type UpdateEntryProps = OwnProps & EntryState & Actions;

export const UpdateEntry: React.FC<UpdateEntryProps> = (props: UpdateEntryProps) => {
  useEffect(() => {
    props.onGet(20,isEnptystr(Cookies.get(Const.KEY_USER_ID)) ? null : Cookies.get(Const.KEY_USER_ID));
    return undefined;
  }, [])

  return (
    <div className="padding10">
      <Row className="width90">
        <Col sm={1}></Col>
        <Col sm={11}>
          <h2>更新</h2>
          <label htmlFor="basic-url">元のRSSのURL</label>
          <FormControl
            type="text"
            value={props.url}
            disabled={true}
            onChange={(e: any) => props.updateState(e.target.value, "url")}
          />
        </Col>
      </Row>
      <Row className="width90">
        <Col sm={1}></Col>
        <Col sm={11}>
          <label htmlFor="basic-url">抽出後RSSのURL</label>
          <FormControl
            type="text"
            disabled={true}
            value={createURL(Const.GET_RSS_URL) + props.entryNo + ".xml/?ver=" + getext(props.version)}
          />
        </Col>
      </Row>
      <Br count={1} />
      <EntryContainer />
      <Row className="width90">
        <Col sm={1}></Col>
        <Col sm={11}>
          {props.loadingRegister ?
            <SpinnerButton />
            :
            <Button
              variant="primary"
              type="submit"
              onClick={
                (e: any) => {
                  const body: PostEntryRequest = {
                    entryNo:20,
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
                  props.onUpdate(body)
                }
              }
              disabled={props.infoRegister}
            >
              更新
                </Button>
          }
        </Col>
      </Row>
      {props.infoRegister &&
        <div>
          <Row className="width90">
            <Col sm={1}></Col>
            <Col sm={11}>
              <Alert
                variant={"success"}
              >
                {props.infoRegisterMsg}
              </Alert>
            </Col>
          </Row>
        </div>
      }
      {props.validRegister &&
        <div>
          <Row className="width90">
            <Col sm={1}></Col>
            <Col sm={11}>
              <Alert
                variant={"danger"}
              >
                {props.validRegisterMsg}
              </Alert>
            </Col>
          </Row>
        </div>
      }
      <Row className="width90">
        <Col sm={1}></Col>
        <Col sm={11}>
          <Button
            variant="primary"
            type="submit"
            onClick={(e: any) => props.onGet(props.entryNo,null)}
          >
            最初から
              </Button>
        </Col>
      </Row>
    </div >
  );
};