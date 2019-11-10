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

interface OwnProps {
  match: Match;
}
interface Match {
  params: Params;
}
interface Params {
  entryNo: string;
  user: string;
}

type UpdateEntryProps = OwnProps & EntryState & Actions;

export const UpdateEntry: React.FC<UpdateEntryProps> = (props: UpdateEntryProps) => {
  useEffect(() => {
    const entryNo = parseInt(props.match.params.entryNo);
    const isguest = props.match.params.user == "guest";
    props.updateState(entryNo, "entryNo");
    props.updateState(isguest, "isguest");
    props.onGet(entryNo, isEnptystr(Cookies.get(Const.KEY_USER_ID)) || isguest ? null : Cookies.get(Const.KEY_USER_ID));
    return undefined;
  }, [props.match.params.entryNo])

  return (
    <div>
      <Row className="width90">
        <Col sm={12}>
          <h2>{props.isguest ? "参照" : "更新"}</h2>
          {props.isguest && <p style={{ color: "red" }}>※未ログインユーザで作成されたデータのため更新はできません</p>}
          <label htmlFor="basic-url">元のRSSのURL</label>
          <p>
            <a
              href={props.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {props.url}
            </a>
          </p>
        </Col>
      </Row>
      <Row className="width90">
        <Col sm={12}>
          <label htmlFor="basic-url">抽出後RSSのURL</label>
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
      <Br count={1} />
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
                    entryNo: props.entryNo,
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
              disabled={props.infoRegister || props.isguest}
            >
              更新
                </Button>
          }
        </Col>
      </Row>
      {props.infoRegister &&
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
        </div>
      }
      {props.validRegister &&
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
      <Row className="width90">
        <Col sm={12}>
          <Button
            variant="primary"
            type="submit"
            onClick={(e: any) => props.toTop()}
          >
            トップに戻る
              </Button>
        </Col>
      </Row>
    </div >
  );
};