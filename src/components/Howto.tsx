import * as React from 'react';
import { Link } from 'react-router-dom';
import { Br } from '../common/Br';
import { Jumbotron, Container, Row, Col, Table } from 'react-bootstrap';
import img1 from '../img/howto1.jpg';
import img2 from '../img/howto2.jpg';
import img3 from '../img/howto3.jpg';
import img4 from '../img/howto4.jpg';
import img5 from '../img/howto5.jpg';
import img6 from '../img/howto6.jpg';
import img7 from '../img/howto7.jpg';
import img8 from '../img/howto8.jpg';
import Const from '../common/const';

interface OwnProps {
  location?: Location;
}
interface Location {
  pathname: string;
}

export class Howto extends React.Component {
  constructor(props: any) {
    super(props);
    document.title = "使い方"
  }
  render() {
    return (
      <div className="padding10">
        <Jumbotron fluid>
          <Container>
            <h2>対応しているフィードの形式</h2>
            <ul>
              <li>RSS1.0</li>
              <li>RSS2.0</li>
              <li>ATOM</li>
            </ul>
            <Br count={2} />
            <h2>使い方</h2>
            <h3>1.RSSの抽出条件を新規登録する</h3>
            <p>1.1.トップ画面から、「ログインせずに使う」をクリックします。</p>
            <Br count={1} />
            <img src={img1} />
            <Br count={1} />
            <p>1.2.抽出したURLを入力し、確認ボタンをクリックします。</p>
            <Br count={1} />
            <img src={img2} />
            <Br count={1} />
            <p>1.3.抽出条件欄で、実施したい抽出条件にチェックをし、値を設定します。</p>
            <Br count={1} />
            <img src={img3} />
            <Br count={1} />
            各抽出条件の説明
            <Br count={1} />
            <Table bordered hover responsive className="Fixed" style={{ backgroundColor: '#FFFFFF' }}>
              <thead>
                <tr>
                  <th style={{ width: '200px' }}>項目名</th>
                  <th>説明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>カテゴリ名</td>
                  <td>入力したカテゴリ名を含む記事のみを抽出します（部分一致）</td>
                </tr>
                <tr>
                  <td>件名</td>
                  <td>入力した件名を含む記事のみを抽出します（部分一致）</td>
                </tr>
                <tr>
                  <td>投稿者名</td>
                  <td>入力した投稿者名を含む記事のみを抽出します（部分一致）</td>
                </tr>
                <tr>
                  <td>投稿日</td>
                  <td>指定期間以内に投稿されたのデータのみを抽出します</td>
                </tr>
                <tr>
                  <td>取得記事数（最大）</td>
                  <td>取得する記事の最大数を設定します。※元のRSSよりも多い記事は取得できません。</td>
                </tr>
              </tbody>
            </Table>
            <Br count={1} />
            <aside>補足
              <p>カテゴリ名とは、RSSをブラウザから開いた際に「category」または「subject」と表示されている項目です。</p>
              <p>※RSS1.0の場合「dc:subject」と表示されている場合もあります。</p>
              <img src={img8} />
              <p>カテゴリが設定されていないRSSもあります。（その場合、抽出条件に指定できません）</p></aside>
            <Br count={1} />
            <p>1.4.登録ボタンを押すと抽出後のRSSにアクセスするためのURLが発行されます。FeedlyやRSS閲覧ソフトなどに登録して使用してください。</p>
            <Br count={1} />
            <img src={img4} />
            <Br count={1} />
            <aside>補足<p>ログインせずに登録したデータは、全ユーザーが閲覧可能になります。</p></aside>
            <Br count={1} />
            <h3>2.以前登録したRSSの内容を確認する</h3>
            <p>2.1.メニュー画面から、「未ログインユーザー登録済みデータ」をクリックします。</p>
            <Br count={1} />
            <img src={img5} />
            <Br count={1} />
            <p>2.3.対象のサイト右にある開くボタンをクリックします。</p>
            <Br count={1} />
            <img src={img6} />
            <Br count={1} />
            <p>2.4.サイトのURLなどを確認することができます。</p>
            <Br count={1} />
            <img src={img7} />
          </Container>
        </Jumbotron>

        <Link to={Const.SITE_ROOT + "/menu"}>トップへ戻る</Link>
      </div >
    );
  }
};
