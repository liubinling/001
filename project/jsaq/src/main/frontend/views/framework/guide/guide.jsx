import React, { Component } from 'react';
import { Page, Container, Row, Col, Icon, Tabs, Tab, Button, Bar, Table, Divider, popup, Form, FormItem, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, context } from 'epm-ui';
import { Guide } from '../components';

const page = {
  title: "功能引导",
};

class GuidePage extends Component {
  constructor(props){
    super(props);
    this.state = {
	        dataSource:`${context.contextPath}/Guide/GuideInfo`
		}
	this.showGuide = this.showGuide.bind(this);
  }

    componentDidMount() {
        this.showGuide();
    }

   /* 获取数据，并使用popup组件引入数据源*/
  showGuide( event ) {
  	
    fetch( this.state.dataSource, {credentials: 'include', method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
			body: "pageName=guide"}  )     
			.then( ( response ) => response.json() )
			.then( ( data ) =>  popup( <Guide dataSource={ data[0] } /> ));
  }

  render() {

  		/*表格数据*/
		const tableData = [
		  {
		    "name": "张三",
		    "age": 18,
		    "address": "北京天安门"
		  },
		  {
		    "name": "李四",
		    "age": 80,
		    "address": "北京长城"
		  },
		  {
		    "name": "王五",
		    "age": 90,
		    "address": "北京长城"
		  }
		];	  

		/*表格表头信息*/
		 const tableColumns = [
		    {
		      "title": "姓名",
		      "key": "name"
		    },
		    {
		      "title": "年龄",
		      "key": "age"
		    },
		    {
		      "title": "地址",
		      "key": "address"
		    }
		];

		 /*柱状图数据*/
		let barData = [
			{
				"item": "2011",
				"data":
					[
						{
				          "key": "衬衫",
				          "value": 15
				        },
				        {
				          "key": "裤子",
				          "value": 20
				        },
				        {
				          "key": "袜子",
				          "value": 66
				        },
				        {
				          "key": "裙子",
				          "value": 35
				        },
				        {
				          "key": "帽子",
				          "value": 10
				        }
				      ]
			  }
			];
			
			
    return (
      <Page>
      	<Container type="fluid">
			<div id="guideIntro" style={{width:'185px',height:'32px',textAlign:'center'}}>
				<Button type="icon" onClick = { this.showGuide }><Icon type="hand-paper-o" /></Button>
			</div>
          <Row>
          	<Col size = { 12 } >
          		<div id = "bar" >
          			<Bar dataSource={ barData } />
          		</div>          		         		
          	</Col>
          	<Col size = { 12 } >
          		<div id="myDiv" style={{width:"300px",height:"200px"} }>
          			<Tabs>
					  <Tab title="选项卡一">选项卡一内容</Tab>
					  <Tab title="选项卡二">选项卡二内容</Tab>
					  <Tab title="选项卡三">选项卡三内容</Tab>
					  <Tab title="选项卡四">选项卡四内容</Tab>
					</Tabs>
          		</div>
          		<Divider />
          		<div id = "table" style={{width:"300px",height:"200px"} }>
          			<Table dataSource={ tableData } columns={ tableColumns } />
          		</div>          		
          	</Col>
          </Row>
          </Container>
      </Page>
    );
  }
}

GuidePage.epmUIPage = page;

export default GuidePage;
export { GuidePage };