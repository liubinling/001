import React, { Component } from 'react';
import { Page, Container, Row, Col, Button,Table, Column, Divider, Form, FormItem, Label, Input, context, Pie, DateTimePicker, Numeric} from 'epm-ui';
import { Guide } from '../components';

const page = {
  title: "数据发布"
};

class MonitorPage extends Component {
	constructor(props){
    	super(props);
    	this.state = {
	        pieArray : [],
	        monitorDate:props.monitorDate,
	        monitor_no:'',
	        dataSource: `${ context.contextPath }/Monitor/MonitorPieData`,
	        dataTableSource: `${ context.contextPath }/Monitor/MonitorTableData`,
	        sumData:[
	        	{
	        		sum_count:'0',
	        		sum_end:'0',
	        		per:'0',
	        		max_time:'00:00:00'
	        	}
	        ]
		}
		this.handleSubmit = this.handleSubmit.bind( this );
	
  	}
  	
  	handleClick(data){
  		fetch( this.state.dataTableSource, {credentials: 'include', method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
			body: "monitorDate="+this.state.monitorDate+"&monitor_no="+data})     
			.then( ( response ) => response.json() )
			.then( ( data ) =>  this.handleTableData( data ));
  	}
  	
  	componentDidMount() {
        fetch( this.state.dataSource, {credentials: 'include', method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
			body: "monitorDate="+this.state.monitorDate})     
			.then( ( response ) => response.json() )
			.then( ( data ) =>  this.handleSubmit( data ));
    }

	
	handleTableData( data ){
		this.setState({tableDataSource:data[0],sumData:data[1]});	
	}

    /*查询后台返回的数据处理,data返回时jsonArray,data[0]为饼状图标题，data[1]为饼状图数据源，
    data[2]为账期，data[3]为表格数据，data[4]为接口监控数据*/
	handleSubmit( data ) {
		/*存放饼状图数据*/
		let tempPieArray = [];
		/*设置饼状图，图例位置*/
		const legend = {
		  textStyle:{
		    color : '#333' ,
		    fontStyle:'normal',
		    fontWeight:'normal',
		    fontFamily:'sans-serif',
		    fontSize : 12
		  },
		  position:['center','bottom','vertical']
		};

		let colSize = 8;
		if(data[1].length>0){
			for (let i=0; i<data[1].length;i++) {	
				const title = {                 /* 标题相关属性  */
				  text:data[0][i],
				  textStyle:{
				    color : 'black' ,
				    fontStyle: 'normal',
				    fontWeight: 'normal',
				    fontFamily: 'Times New Roman',
				    fontSize : '16'
				  },
				  position:['center','12%']     
				};		
				
				const pieExtend = [
				  {
				    item: data[0][i],
				    data: [
				      {
				        color: '#454545'
				      },
				      {
				        color: '#CD2626'
				      }
				    ]
				  }
				];
				
				
				tempPieArray.push(
					<Col size={colSize}>
						<div onClick={this.handleClick.bind(this,data[6][i])} >
						<Pie dataSource={ data[1][i] } extend={ pieExtend } radius={ [ '35%', '50%' ] }  legend = {legend} title={title} />
						</div>
					</Col>
				);			
			}
		
		}else{
			tempPieArray.push(
					<Col size={24}>
						暂无数据
					</Col>
			);
		}
		
		
		this.setState({pieArray:tempPieArray,monitorDate:data[2],tableDataSource:data[3],monitor_no:data[5]});	
		
		if(data[4].length>0){
			this.setState({sumData:data[4]});
		}else{
			const temp = [
		        	{
		        		sum_count:'0',
		        		sum_end:'0',
		        		per:'0',
		        		max_time:'00:00:00'
		        	}
		        ];
		   this.setState({sumData:temp});
		}
  	}

  

  render() {
	
	const tableColumns = [
		{
	      "title": "类型",
	      "key": "api_name"
	    },
	    {
	      "title": "总量",
	      "key": "number_count"
	    },
	    {
	      "title": "已完成",
	      "key": "number_end"
	    },
	    {
	      "title": "状态",
	      "key": "type"
	    },
	    {
	      "title": "完成时间",
	      "key": "end_time"
	    },
	    {
	      "title": "预计完成时间",
	      "key": "estimate_time"
	    },
	    {
	      "title": "备注",
	      "key": "remark"
	    }
	];
			
    return (
      <Page>
      	<Container type="fluid">
			<h2>数据发布</h2>
            <Divider  />
      		<Form
				method="post"
		        action={ this.state.dataSource }
		        type="inline"
		        async={ true }
		        onAfterSubmit={ this.handleSubmit }
      		>
      			<FormItem name="monitorDate">
      				<Label>账期:</Label>
          			<DateTimePicker showIcon={ true } value={this.state.monitorDate}/>
      			</FormItem>
      			<Button type="primary" htmlType="submit">查询</Button>
      		</Form>
      		
      		<Divider/>
			<Row>{this.state.pieArray}</Row>
			<Divider/>
			<Divider line />
			<h4 style={{fontWeight:'bold'}}>接口监控</h4>
			<Row>
				<Col size={6} style={{textAlign:'center'}}>接口总数量<br/>{this.state.sumData[0].sum_count}</Col>
				<Col size={6} style={{textAlign:'center'}}>已完成<br/>{this.state.sumData[0].sum_end}</Col>
				<Col size={6} style={{textAlign:'center'}}>进度（%）<br/><Numeric textAlign={ 'center' } isRound={ true }>{this.state.sumData[0].per}</Numeric></Col>
				<Col size={6} style={{textAlign:'center'}}>预计完成时间<br/>{this.state.sumData[0].max_time}</Col>
			</Row>
			<Divider line />
			<h4 style={{fontWeight:'bold'}}>明细</h4>
			<Table dataSource={ this.state.tableDataSource } columns={ tableColumns } />

        </Container>
      </Page>
    );
  }
}

MonitorPage.epmUIPage = page;

export default MonitorPage;
export { MonitorPage };