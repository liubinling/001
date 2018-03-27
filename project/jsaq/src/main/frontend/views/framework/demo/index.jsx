import React, { Component } from 'react';
import { Page, Divider, Table } from 'epm-ui';
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
    return (
        <Page>
    		<h1>Micro Service</h1>
    		<p>{this.state.desc}</p>
    		<Divider />
          <h1>{ page.title }</h1>
          <p>Welcome to { page.title }</p>
          <Divider />
          <h4>Custom Component Example</h4>
          <Divider />
          <CustomComponent />
        </Page>
    );
  }

}

IndexPage.epmUIPage = page;

export default IndexPage;
export { IndexPage };