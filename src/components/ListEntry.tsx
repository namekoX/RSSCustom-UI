import * as React from 'react';
import { Actions } from '../containers/ListEntryContainer';
import { Button, Row, Col, FormControl, Alert, Table, Form } from "react-bootstrap";
import { ListEntryState } from '../states/ListEntryReducer';
import { useEffect } from 'react';
import { isEnptystr, createURL, getext } from '../common/utils';
import Const from '../common/const';
import Cookies from 'js-cookie';
import GetListEntryResultItem from '../interface/GetListEntryResultItem';
import { SpinnerButton } from '../common/SpinnerButton';

interface OwnProps { }
type ListEntryProps = OwnProps & ListEntryState & Actions;

function renderTable(entrys: GetListEntryResultItem[], updater: (entryNo: number) => void) {
  const rows = entrys.map((entry, index) =>
    <tr key={index}>
      <td>
        {entry.no}
      </td>
      <td>
        {entry.site_name}
      </td>
      <td>
        <a href={entry.url} target="_blank">{entry.url}</a>
      </td>
      <td>
        <Button
          variant="primary"
          type="submit"
          onClick={(e: any) => updater(entry.no)}
        >
          参照
        </Button>
      </td>
    </tr>
  );

  return rows;
}

export const ListEntry: React.FC<ListEntryProps> = (props: ListEntryProps) => {
  useEffect(() => {
    props.onSearch(null, isEnptystr(Cookies.get(Const.KEY_USER_ID)) ? null : Cookies.get(Const.KEY_USER_ID));
    return undefined;
  }, [])

  return (
    <div>
      <Row >
        <Col sm={1}></Col>
        <Col sm={5}>
          <h2>登録済みRSS一覧</h2>
        </Col>
        <Col sm={5}>
          <Form inline>
            <FormControl
              type="text"
              placeholder="サイト名"
              className="mr-sm-2"
              value={props.site_name}
              onChange={(e: any) => props.updateState(e.target.value, "site_name")}
            />          
            {props.loading ?
              <SpinnerButton />
              :
              <Button
              variant="outline-success"
              onClick={(e: any) => props.onSearch(props.site_name, isEnptystr(Cookies.get(Const.KEY_USER_ID)) ? null : Cookies.get(Const.KEY_USER_ID))}
              >
              検索
              </Button>
            }
          </Form>
        </Col>
      </Row>
      {props.valid &&
        <div>
          <Row>
            <Col sm={1}></Col>
            <Col sm={11}>
              <Alert
                variant={"danger"}
              >
                {props.validMsg}
              </Alert>
            </Col>
          </Row>
        </div>
      }
      <Row>
        <Col sm={1}></Col>
        <Col sm={11}>
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>サイト名</th>
                <th>URL(元)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {renderTable(props.entrys, props.toUpdate)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div >
  );
};