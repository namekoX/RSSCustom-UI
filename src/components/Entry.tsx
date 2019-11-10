import * as React from 'react';
import { Actions } from '../containers/EntryContainer';
import { Table, Button, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { Br } from '../common/Br';
import { getChkBool, getChkValue } from '../common/utils';
import { EntryState } from '../states/EntryReducer';

interface OwnProps { }

type EntryProps = OwnProps & EntryState & Actions;

export const Entry: React.FC<EntryProps> = (props: EntryProps) => {
  return (
    <div>
      <Row className="width90">
        <Col sm={9}>
          <label htmlFor="basic-url">サイト名</label>
          <FormControl
            type="text"
            placeholder="サイト名を入力"
            value={props.sitename}
            maxLength={255}
            onChange={(e: any) => props.updateState(e.target.value, "sitename")}
          />
        </Col>
        <Col sm={2}>
          <label htmlFor="basic-url">バージョン</label>
          <FormControl
            type="text"
            value={props.version}
          />
        </Col>
      </Row>
      <Br count={1} />
      <Row className="width90">
        <Col sm={12}>
          <label htmlFor="basic-url">抽出条件(実施したい条件をチェックしてください)</label>
          <InputGroup className="mb-3 width90">
            <InputGroup.Prepend>
              <InputGroup.Checkbox 
                value ={props.chkIncledeCategory}
                checked={getChkBool(props.chkIncledeCategory)}
                onChange={(e: any) => props.updateState(getChkValue(e.target.checked), "chkIncledeCategory")}
              />
            </InputGroup.Prepend>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">カテゴリ名に</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              placeholder="条件を入力"
              value={props.incledeCategory}
              maxLength={255}
              disabled={!getChkBool(props.chkIncledeCategory)}
              onChange={(e: any) => props.updateState(e.target.value, "incledeCategory")}
            />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2">を含む</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row className="width90">
        <Col sm={12}>
          <InputGroup className="mb-3 width90">
            <InputGroup.Prepend>
              <InputGroup.Checkbox 
                 value ={props.chkIncledeSubject}
                 checked={getChkBool(props.chkIncledeSubject)}
                 onChange={(e: any) => props.updateState(getChkValue(e.target.checked), "chkIncledeSubject")}             
              />
            </InputGroup.Prepend>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">件名に</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              placeholder="条件を入力"
              value={props.incledeSubject}
              maxLength={255}
              disabled={!getChkBool(props.chkIncledeSubject)}
              onChange={(e: any) => props.updateState(e.target.value, "incledeSubject")}
            />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2">を含む</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>       
      </Row>
      <Row className="width90">
        <Col sm={12}>
          <InputGroup className="mb-3 width90">
            <InputGroup.Prepend>
              <InputGroup.Checkbox 
                 value ={props.chkIncledeCreater}
                 checked={getChkBool(props.chkIncledeCreater)}
                 onChange={(e: any) => props.updateState(getChkValue(e.target.checked), "chkIncledeCreater")}             
              />
            </InputGroup.Prepend>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">投稿者名に</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              placeholder="条件を入力"
              value={props.incledeCreater}
              maxLength={255}
              disabled={!getChkBool(props.chkIncledeCreater)}
              onChange={(e: any) => props.updateState(e.target.value, "incledeCreater")}
            />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2">を含む</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>       
      </Row>
      <Row className="width90">
        <Col sm={12}>
          <InputGroup className="mb-3 width90">
            <InputGroup.Prepend>
              <InputGroup.Checkbox 
                 value ={props.chkUntilDate}
                 checked={getChkBool(props.chkUntilDate)}
                 onChange={(e: any) => props.updateState(getChkValue(e.target.checked), "chkUntilDate")}             
              />
            </InputGroup.Prepend>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">投稿日が</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="number"
              placeholder="条件を入力"
              value={props.UntilDate}
              maxLength={3}
              min={0}
              disabled={!getChkBool(props.chkUntilDate)}
              onChange={(e: any) => props.updateState(e.target.value, "UntilDate")}
            />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2">日以内</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>       
      </Row>
      <Row className="width90">
        <Col sm={12}>
          <InputGroup className="mb-3 width90">
            <InputGroup.Prepend>
              <InputGroup.Checkbox 
                 value ={props.chkLimitCount}
                 checked={getChkBool(props.chkLimitCount)}
                 onChange={(e: any) => props.updateState(getChkValue(e.target.checked), "chkLimitCount")}             
              />
            </InputGroup.Prepend>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">取得記事数（最大）</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="number"
              placeholder="条件を入力"
              value={props.LimitCount}
              maxLength={3}
              min={0}
              disabled={!getChkBool(props.chkLimitCount)}
              onChange={(e: any) => props.updateState(e.target.value, "LimitCount")}
            />
          </InputGroup>
        </Col>       
      </Row>
    </div >
  );
};