import * as React from 'react';
import { Actions } from '../containers/ListEntryContainer';
import { Button, Row, Col, FormControl, Alert, Table, Form } from "react-bootstrap";
import { ListEntryState } from '../states/ListEntryReducer';
import { useEffect } from 'react';
import Const from '../common/const';
import Cookies from 'js-cookie';
import GetListEntryResultItem from '../interface/GetListEntryResultItem';
import { SpinnerButton } from '../common/SpinnerButton';
import Pagination from 'react-js-pagination';
import { Br } from '../common/Br';

interface OwnProps {
  location: Location;
}
interface Location {
  pathname: string;
}

type ListEntryProps = OwnProps & ListEntryState & Actions;

function renderTable(entrys: GetListEntryResultItem[],
  updater: any,
  isuser: boolean,
  deleter: (entryNo: number, user_id: string | null | undefined) => void,
  searcher: (site_name: string | null, user_id: string | null | undefined, pageNumber: number) => void,
  site_name: string
) {
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
          onClick={(e: any) => updater(entry.no, isuser)}
        >
          開く
        </Button>
      </td>
      {isuser &&
        <td>
          <Button
            variant="primary"
            type="submit"
            onClick={(e: any) => {
              deleter(entry.no, entry.user_id);
              searcher(site_name, entry.user_id, 1);
            }}
          >
            削除
          </Button>
        </td>
      }
    </tr>
  );

  return rows;
}

export const ListEntry: React.FC<ListEntryProps> = (props: ListEntryProps) => {
  useEffect(() => {
    props.onSearch(null, props.location.pathname == "/menu/list/guest" ? null : Cookies.get(Const.KEY_USER_ID), 1);
    return undefined;
  }, [props.location.pathname])

  return (
    <div>
      <Row >
        <Col sm={5}>
          <h2>登録済みRSS一覧</h2>
        </Col>
        <Col sm={7}>
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
                onClick={(e: any) => props.onSearch(props.site_name, props.location.pathname == "/menu/list/guest" ? null : Cookies.get(Const.KEY_USER_ID), 1)}
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
            <Col sm={12}>
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
        <Col sm={12}>
          <Table striped bordered hover responsive size="sm" className="Fixed">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th>サイト名</th>
                <th>URL(元)</th>
                <th style={{ width: '80px' }}></th>
                {props.location.pathname == "/menu/list/user" && <th style={{ width: '80px' }}></th>}
              </tr>
            </thead>
            <tbody>
              {renderTable(props.entrys,
                props.toUpdate,
                props.location.pathname == "/menu/list/user",
                props.onDelete,
                props.onSearch,
                props.site_name
              )}
            </tbody>
            <Br count={1} />
            <Pagination
              activePage={props.pagerActive}
              itemsCountPerPage={Const.LIST_PAGER_PERPAGE}
              totalItemsCount={props.pagerTotalCount}
              pageRangeDisplayed={5}
              onChange={
                (e: any) => props.onSearch(props.site_name, props.location.pathname == "/menu/list/guest" ? null : Cookies.get(Const.KEY_USER_ID), e)
              }
              itemClass='page-item'
              linkClass='page-link'
            />
          </Table>
        </Col>
      </Row>
    </div>
  );
};