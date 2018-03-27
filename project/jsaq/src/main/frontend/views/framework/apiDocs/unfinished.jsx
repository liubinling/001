import React, { Component } from 'react';
import { Page, Divider} from 'epm-ui';

const page = {
  title: "未完待续"
};

class UnfinishedPage extends Component {

  render() {
    return (
        <Page>
        <Divider />
          <h1>{ page.title }</h1>
        </Page>
    );
  }

}

UnfinishedPage.epmUIPage = page;

export default UnfinishedPage;
export { UnfinishedPage };