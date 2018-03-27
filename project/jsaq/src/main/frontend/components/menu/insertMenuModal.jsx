import React, { Component } from 'react';
import { Page, Container, Row, Col, Icon, Button, Divider, TreeSelect, Form, FormItem, Label, Input, context,DateTimePicker, Numeric, Select, Option, Modal, ModalHeader, ModalBody, ModalFooter, Textarea, popup, Snackbar} from 'epm-ui';


class InsertMenuModal extends Component {

	constructor(props){
    	super(props);
    	this.state = {
    		pid : 'root',
	        visibleInsertModal : true,
	        dataSourceTree:`${ context.contextPath }/micro/GetTreeMenu`,
	        insertModalDataSource: `${ context.contextPath }/micro/InsertMenu`,
		}
		
		this.handleInsertModalClose = this.handleInsertModalClose.bind( this );
		this.handleModalAfterSubmit = this.handleModalAfterSubmit.bind( this );
		this.clearInsertModal = this.clearInsertModal.bind( this );
		this.handleSelect = this.handleSelect.bind( this );
		this.handleInsertBeforeSubmit = this.handleInsertBeforeSubmit.bind( this );
  	}
  
	/*TreeSelect异步加载更多*/
    handleLoadMore( node ) {
    	 return fetch (`${ context.contextPath }/micro/GetTreeMenu?id=${node.id}`);
  	}
    
	/*TreeSelect选择*/
	handleSelect( node, isSelected, selectedNodes, event ) {
		this.setState({pid:selectedNodes[0].id});
	}

	/*form表单提交前，加入pid*/
	handleInsertBeforeSubmit(data){
		data.pid = this.state.pid;
		return data;
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
			this.props.initData();
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
                      	  菜单管理-增加
                </ModalHeader>
                <ModalBody>
                	<Row>
                		<Col size={24} >
		                	<Form
				      			 method="post"
						          action={this.state.insertModalDataSource}
						          type="horizontal"
						          async={ true }
						          onSubmit={ this.handleInsertBeforeSubmit }
						          onAfterSubmit={ this.handleModalAfterSubmit }
				      		>
					      		<FormItem name="menu_name" required>
					      			<Label>菜单名称: </Label>
					      			<Input placeholder="请输入菜单名称" />
					      		</FormItem>
					      		<FormItem name="url" >
					      			<Label>访问地址: </Label>
					      			<Input />
					      		</FormItem>
					      		<FormItem name="icon" >
					      			<Label>图标: </Label>
					      			<Input placeholder="一级菜单图标"  />
					      		</FormItem>
					      		<FormItem name="pid" >
					      			<Label>父菜单: </Label>
					      			<TreeSelect dataSource={this.state.dataSourceTree} 
					      				loadMore ={ this.handleLoadMore }
					      				multiple={ false }
					      				onSelect={ this.handleSelect } />
					      			
					      		</FormItem>
					      		<FormItem name="is_disable"  required>
					      			<Label>是否隐藏: </Label>
					      			<Select value="0">
									  <Option value="0">否</Option>
									  <Option value="1">是</Option>
									</Select>
					      		</FormItem>
					      		<FormItem name="ord" required>
					      			<Label>排序: </Label>
					      			<Input   />
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


export { InsertMenuModal };
export default InsertMenuModal;