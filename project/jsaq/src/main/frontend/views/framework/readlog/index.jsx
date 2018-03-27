import React, { Component } from 'react';
import { Page, Divider, Table , Tabs, Tab } from 'epm-ui';
import { CustomComponent } from '../components/Components';

const page = {
  title: "EPM UI"
};

class IndexPage extends Component {

	constructor( props ) {
        super( props );
        this.state = {
        	desc : '' || props.desc
        };
    }
	
  render() {
	      const multiLineData = this.state.desc;
	      const multiLineColumns = [
	        {
	          key: 'name',
	          title: '日志'
	        }
	      ];
	  
    return (
        <Page>
	          <Table dataSource={ multiLineData } columns={ multiLineColumns } multiLine={ true } />
        </Page>
    );
  }

}

IndexPage.epmUIPage = page;

export default IndexPage;
export { IndexPage };