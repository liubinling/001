import React, { Component } from 'react';
import { Page, Container, Row, Col, Icon, Button, Divider, Form, FormItem, Label, Input, context,DateTimePicker, Numeric, Select, Option, Modal, ModalHeader, ModalBody, ModalFooter, Textarea, popup, Snackbar} from 'epm-ui';


class InsertMonitorData extends Component {

	constructor(props){
    	super(props);
    	this.state = {
	        visibleInsertModal : true,
	        insertModalDataSource: `${ context.contextPath }/MonitorBusiness/MonitorInsertData`,
		}
		
		this.handleInsertModalClose = this.handleInsertModalClose.bind( this );
		this.handleModalAfterSubmit = this.handleModalAfterSubmit.bind( this );
		this.clearInsertModal = this.clearInsertModal.bind( this );
  	}
  

	/*关闭插入数据的模态框*/
	handleInsertModalClose(){
		this.setState({visibleInsertModal:false},()=>{
            this.clearInsertModal();
        });
	}

	/*处理插入返回来的数据，并弹出提示框*/
	handleModalAfterSubmit(data) {
		let msg = data.msg;
		let flag = data.flag;
		popup( <Snackbar message={msg} duration={ 3 } onDisappear = {this.freshData.bind(this,flag)} /> );
		
	}
	
	
	/*数据插入成功，关闭模态框*/
	freshData(flag){
		if(flag){
			this.handleInsertModalClose();
			window.location.href = `${ context.contextPath }/MonitorBusiness/MonitorBusiness`;
		}
	}
	
	clearInsertModal() {
    	this.props._onDisappear( this.props._self );
  	}

	
  render() {
	
			
    return (
      <Page>
      	<Container type="fluid">
      		<Modal visible={ this.state.visibleInsertModal } onClose={ this.handleInsertModalClose }>
      			<ModalHeader>
                      	  关键指标管理
                </ModalHeader>
                <ModalBody>
                	<Row>
                		<Col size={24} >
		                	<Form
				      			 method="post"
						          action={this.state.insertModalDataSource}
						          type="horizontal"
						          async={ true }
						          onAfterSubmit={ this.handleModalAfterSubmit }
				      		>
					      		<FormItem name="kpi_name" required>
					      			<Label>指标名称: </Label>
					      			<Input placeholder="请输入指标名称" />
					      		</FormItem>
					      		<FormItem name="kpi_table" required>
					      			<Label>指标数据sql: </Label>
					      			<Textarea  placeholder="请输入指标数据sql"  rows={ 4 }  />
					      		</FormItem>
					      		<FormItem name="data_column" required>
					      			<Label>数据字段: </Label>
					      			<Input placeholder="请输入数据字段"  />
					      		</FormItem>
					      		<FormItem name="date_column" required>
					      			<Label>账期字段: </Label>
					      			<Input placeholder="请输入账期字段"  />
					      		</FormItem>
					      		<FormItem name="kpi_unit" required>
					      			<Label>单位: </Label>
					      			<Input placeholder="请输入单位"  />
					      		</FormItem>
					      		<FormItem name="kpi_date_type" required>
					      			<Label>账期类型: </Label>
					      			<Select  >
									  <Option value="date">日账期</Option>
									  <Option value="month">月账期</Option>
									</Select>
					      		</FormItem>
					      		<FormItem name="analysis_type"  required>
					      			<Label>分析方式: </Label>
					      			<Select >
									  <Option value="huanbi">环比</Option>
									  <Option value="tongbi">同比</Option>
									</Select>
					      		</FormItem>
					      		<FormItem name="ord" required>
					      			<Label>排序: </Label>
					      			<Input placeholder="请输入数字"  />
					      		</FormItem>
					      		<Divider/>
					      		<Button onClick={ this.handleInsertModalClose }>关闭</Button>
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


export default InsertMonitorData;
export { InsertMonitorData };