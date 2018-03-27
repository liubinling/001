import React, { Component } from 'react';
import { Page, Container, Row, Col, Icon, Button, Divider, Form, FormItem, Label, Input, context,DateTimePicker, Numeric, Select, Option, Modal, ModalHeader, ModalBody, ModalFooter, Textarea, popup, Snackbar} from 'epm-ui';
import {Echarts, InsertMonitorData} from '../components';
const page = {
  title: "数据预警"
};

class MonitorBusinessPage extends Component {

	constructor(props){
    	super(props);
    	this.state = {
	        dateType : 'date',
	        dateFormate : 'YYYY-MM-DD',
	        monitorDate : props.monitorDate,
	        visibleInsertModal : false,
	        visibleUpadteModal : false,
	        monitorId : '',
	        nameArray:[],
	        insertModalDataSource: `${ context.contextPath }/MonitorBusiness/MonitorInsertData`,
	        updateModalDataSource: `${ context.contextPath }/MonitorBusiness/MonitorUpdateData`,
	        selectModalDataSource: `${ context.contextPath }/MonitorBusiness/MonitorSelectData`,
	        deleteModalDataSource: `${ context.contextPath }/MonitorBusiness/MonitorDeleteData`,
	        getMonitorDateDataSource: `${ context.contextPath }/MonitorBusiness/getMonitorDate`,
	        dataSource: `${ context.contextPath }/MonitorBusiness/MonitorGetChartData`
	        
		}
		
		this.handleSubmit = this.handleSubmit.bind( this );
		this.handelSelectChange = this.handelSelectChange.bind( this );
		this.showInsertModal = this.showInsertModal.bind(this);
		this.handleUpdateModalAfterSubmit = this.handleUpdateModalAfterSubmit.bind( this );
		this.handleUpdateModalClose = this.handleUpdateModalClose.bind( this );
		this.handleBeforeSubmit = this.handleBeforeSubmit.bind( this );
  	}
  	
  	componentDidMount() {
        this.getInit();
    }

    /*根据账期和账期类型去后台查询数据*/
    getInit(){
    	fetch( this.state.dataSource, {credentials: 'include', method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
			body: "monitorDate="+this.state.monitorDate+"&dateType="+this.state.dateType})     
			.then( ( response ) => response.json() )
			.then( ( data ) =>  this.handleSubmit( data ));
    }


    /*点击修改，根据id去后台查询相关数据*/
	handleUpdateClick(id){
		fetch( this.state.selectModalDataSource, {credentials: 'include', method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
			body: "id="+id})     
			.then( ( response ) => response.json() )
			.then( ( data ) =>  this.handleData( data ));
	}

	/*获得根据id查询的数据，处理数据，在模态框做展示*/
    handleData(data){
        this.setState({monitorId:data[0].id,visibleUpdateModal:true,kpi_name:data[0].kpi_name,kpi_table:data[0].kpi_table,
            data_column:data[0].data_column,date_column:data[0].date_column,kpi_unit:data[0].kpi_unit,
            kpi_date_type:data[0].kpi_date_type,analysis_type:data[0].analysis_type,ord:data[0].ord});
    }

	/*点击删除，根据id删除数据*/
	handleDeleteClick( id, name ){
		var flag = confirm("是否要删除关于 "+name+" 的所有数据");
		if( flag==true ){
			fetch( this.state.deleteModalDataSource, {credentials: 'include', method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
				body: "id="+id})     
				.then( ( response ) => response.json() )
				.then( ( data ) =>  this.handleDeleteData(data) );
		}
	}

	/*处理删除后返回的数据，给出提示框*/
	handleDeleteData(data){
		let msg = data.msg;
		popup( <Snackbar message={msg} duration={ 3 } /> );
		if(data.flag){
			this.getInit();
		}
	}
	

	/*处理通过账期和账期类型查出来的数据*/
	handleSubmit( data ) {
		let tempNameArray = [];
		for (let i=0; i<data.chartList.length;i++){
			let  chartData = [];
			chartData = this.handleLineChart( data.nameList[i], data.chartList[i].legendData, data.chartList[i].xData, data.chartList[i].unit1, data.chartList[i].unit2, data.chartList[i].leftData, data.chartList[i].rightData );
			tempNameArray.push(
				<Row>
					<Col size={1}  />
					<Col size={17} >
						<div style={{height:'300px',width:'100%'}}>	
								<Echarts option={chartData} />
						</div>
					</Col>
					<Col size={6} >
						<div style={{height:'300px',width:'100%'}}>
							<Button type="primary" onClick={ this.handleUpdateClick.bind( this, data.idList[i]) }>修改</Button>
							<Button type="primary" onClick={ this.handleDeleteClick.bind( this, data.idList[i], data.nameList[i]) }>删除</Button>
						</div>	
					</Col>
				</Row>
			);
		}
		this.setState({nameArray:tempNameArray});
  	}

  	/*当账期类型发生改变，账期要改变*/
	handelSelectChange( value ){
		if(value=='date'){
			fetch( this.state.getMonitorDateDataSource, {credentials: 'include', method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
				body: "dateType="+value})     
				.then( ( response ) => response.json() )
				.then( ( data ) =>  this.setState({dateType:value,dateFormate:'YYYY-MM-DD',monitorDate : data.monitorDate}));
		}else{
			fetch( this.state.getMonitorDateDataSource, {credentials: 'include', method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
				body: "dateType="+value})     
				.then( ( response ) => response.json() )
				.then( ( data ) =>  this.setState({dateType:value,dateFormate:'YYYY-MM',monitorDate : data.monitorDate}));
		}
	}

	/*显示插入数据的模态框*/
	showInsertModal(){
		popup( <InsertMonitorData   /> );
	}


	/*关闭修改数据的模态框*/
	handleUpdateModalClose(){
		this.setState({visibleUpdateModal:false},()=>{
			this.getInit();
		});
	}
	
	/*form表单提交前，加入id*/
	handleBeforeSubmit(data){
		data.id = this.state.monitorId;
		return data;
	}
	
	/*处理修改返回来的数据，并弹出提示框*/
	handleUpdateModalAfterSubmit(data) {
		let msg = data.msg;
		let flag = data.flag;
		popup( <Snackbar message={msg} duration={ 3 } onDisappear = {this.freshUpdateData.bind(this,flag)} /> );
		
	}
	
	/*数据修改成功，关闭模态框*/
	freshUpdateData(flag){
		if(flag){
			this.handleUpdateModalClose();
		}
	}

	/*生成折线图的option*/
	handleLineChart( title, legendList, xData, unit1, unit2,  leftData, rightData ){
	    const  option={};
	    
	    const titleMap = {};
    	const textStyleMap={};
		titleMap.text = title+"("+unit1+")";
        titleMap.left = '13%';
        textStyleMap.fontFamily = 'Microsoft Yahei Light';
        textStyleMap.fontSize = 12;
        textStyleMap.color = '#333333';
        titleMap.textStyle = textStyleMap;
        option.title = titleMap;
        
	    const tooltipMap={};
	    tooltipMap.trigger='axis';
	    option.tooltip=tooltipMap;
	
	    const legendMap = {};
        legendMap.data = legendList;
        legendMap.right = '10%';
        option.legend = legendMap;
        
        const gridMap = {};
        gridMap.left = '13%';
        gridMap.right = '10%';
        option.grid = gridMap;
	    
	    const xAxisList=[];
	    const ax={};
	    ax.type='category';
	    ax.data=xData;
	    xAxisList.push(ax);
	    option.xAxis=xAxisList;
	    
	    const yAxisList=[];
	    const ay1={};
	    const splitLineMap = {};
	    splitLineMap.show = false;
	    ay1.type = 'value';
	    ay1.name = unit1;
	    ay1.splitLine = splitLineMap;
	    yAxisList.push(ay1);
	    const ay2={};
	    ay2.type = 'value';
	    ay2.name = unit2+'%';
	    const axisLabel = {};
	    axisLabel.formatter = '{value} %';
	    ay2.axisLabel = axisLabel;
	    ay2.splitLine = splitLineMap;
	    yAxisList.push(ay2);
	    option.yAxis=yAxisList;
	    
	    const seriesData = [];
	    const series1 = {};
	    series1.name = legendList[0];
	    series1.type = 'line';
	    series1.data = leftData;
	    seriesData.push(series1);
	    const series2 = {};
	    series2.name = legendList[1];
	    series2.type = 'line';
	    series2.data = rightData;
	    series2.yAxisIndex = 1,
	    seriesData.push(series2);
	    option.series=seriesData;
	    return option;
	}
  render() {
	
			
    return (
      <Page>
      	<Container type="fluid">
      	<h2>数据预警</h2>
        <Divider  />
      		<Row>
      			<Col size={20}>
		      		<Form
		      			method="post"
				    	action={ this.state.dataSource }
				    	type="inline"
				    	async={ true }
				    	onAfterSubmit={ this.handleSubmit }
		      		>
		      			<FormItem name="dateType">
		      				<Label>账期类型:</Label>
		          			<Select onChange = {this.handelSelectChange} value={this.state.dateType} >
							  <Option value="date">日账期</Option>
							  <Option value="month">月账期</Option>
							</Select>
		      			</FormItem>
		      			<FormItem name="monitorDate">
		      				<Label>账期:</Label>
		          			<DateTimePicker type={this.state.dateType} value={this.state.monitorDate} format={this.state.dateFormate} />
		      			</FormItem>
		      			<Button type="primary" htmlType="submit">查询</Button>
		      		</Form>
	      		</Col>
	      		<Col size={4}>
	      			<div style={{float:'right'}}>
	      				<Button type="icon" onClick = { this.showInsertModal }><Icon type="cog" /></Button>
	      			</div>
	      		</Col>
	      		
	      	</Row>
	      	<Divider/>
			{this.state.nameArray}
	      	
      		
      		<Modal visible={ this.state.visibleUpdateModal } onClose={ this.handleUpdateModalClose }>
      			<ModalHeader>
                      	  关键指标管理
                </ModalHeader>
                <ModalBody>
                	<Row>
                		<Col size={24} >
		                	<Form
				      			 method="post"
						          action={this.state.updateModalDataSource}
						          type="horizontal"
						          onSubmit={ this.handleBeforeSubmit }
						          async={ true }
						          onAfterSubmit={ this.handleUpdateModalAfterSubmit }
				      		>
					      		<FormItem name="kpi_name" required>
					      			<Label>指标名称: </Label>
					      			<Input placeholder="请输入指标名称" value={this.state.kpi_name} />
					      		</FormItem>
					      		<FormItem name="kpi_table" required>
					      			<Label>指标数据sql: </Label>
					      			<Textarea  placeholder="请输入指标数据sql"  rows={ 4 } value={this.state.kpi_table} />
					      		</FormItem>
					      		<FormItem name="data_column" required>
					      			<Label>数据字段: </Label>
					      			<Input placeholder="请输入数据字段" value={this.state.data_column}/>
					      		</FormItem>
					      		<FormItem name="date_column" required>
					      			<Label>账期字段: </Label>
					      			<Input placeholder="请输入账期字段" value={this.state.date_column}/>
					      		</FormItem>
					      		<FormItem name="kpi_unit" required>
					      			<Label>单位: </Label>
					      			<Input placeholder="请输入单位" value={this.state.kpi_unit}/>
					      		</FormItem>
					      		<FormItem name="kpi_date_type" required>
					      			<Label>账期类型: </Label>
					      			<Select value={this.state.kpi_date_type}>
									  <Option value="date">日账期</Option>
									  <Option value="month">月账期</Option>
									</Select>
					      		</FormItem>
					      		<FormItem name="analysis_type" required>
					      			<Label>分析方式: </Label>
					      			<Select value={this.state.analysis_type}>
					      				<Option value="huanbi">环比</Option>
									  	<Option value="tongbi">同比</Option>
									</Select>
					      		</FormItem>
					      		<FormItem name="ord" required>
					      			<Label>排序: </Label>
					      			<Input placeholder="请输入数字" value={this.state.ord}/>
					      		</FormItem>
					      		<Divider/>
					      		<Button onClick={ this.handleUpdateModalClose }>关闭</Button>
					      		<Button type="primary" htmlType="submit">保存</Button>
				      		</Form>
				      	</Col>
				      </Row>
                </ModalBody>
      		</Modal>
        </Container>
      </Page>
    );
  }
}

MonitorBusinessPage.epmUIPage = page;

export default MonitorBusinessPage;
export { MonitorBusinessPage };