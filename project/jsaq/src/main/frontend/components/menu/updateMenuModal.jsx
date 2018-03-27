import React, { Component } from 'react';
import { Page, Container, Row, Col, Icon, Button, Divider, TreeSelect, Form, FormItem, Label, Input, context,DateTimePicker, Numeric, Select, Option, Modal, ModalHeader, ModalBody, ModalFooter, Textarea, popup, Snackbar} from 'epm-ui';


class UpdateMenuModal extends Component {

	constructor(props){
    	super(props);
    	this.state = {
	        visibleUpdateModal : true,
	        id : props.menuId,
	        pid : '',
	        dataSourceTree:`${ context.contextPath }/micro/GetTreeMenu`,
	        selectDataSource : `${ context.contextPath }/micro/SelectMenuById`,
	        updateDataSource : `${ context.contextPath }/micro/UpdateMenuById`
		}
		
		this.handleUpdateModalAfterSubmit = this.handleUpdateModalAfterSubmit.bind( this );
		this.handleUpdateBeforeSubmit = this.handleUpdateBeforeSubmit.bind( this );
		this.handleUpdateModalClose = this.handleUpdateModalClose.bind( this );
		this.clearUpdateModal = this.clearUpdateModal.bind( this );
		this.handleSelect = this.handleSelect.bind( this );
    	this.handleLoadMore = this.handleLoadMore.bind( this );
  	}
  	
  	componentDidMount() {
        fetch( this.state.selectDataSource, {credentials: 'include', method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
			body: "id=" + this.state.id})     
			.then( ( response ) => response.json() )
			.then( ( data ) =>  this.handleUpdateData( data ));
    }
  
  	/*获得根据id查询的数据，处理数据，在模态框做展示*/
    handleUpdateData(data){
    	let treeValue = {};
    	treeValue.name = data[0].PNAME;
    	treeValue.value = data[0].PID;
        this.setState({menu_name:data[0].NAME, url:data[0].URL,
            icon:data[0].ICON, pid:data[0].PID, pname:data[0].PNAME, treeValue:treeValue, is_disable:data[0].IS_DISABLE, ord:data[0].ORD});
    }
    
    /*form表单提交前，加入id*/
	handleUpdateBeforeSubmit(data){
		data.id = this.state.id;
		data.pid = this.state.pid;
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
			this.props.initData();
		}
	}
    
    /*关闭修改数据的模态框*/
	handleUpdateModalClose(){
		this.setState({visibleUpdateModal:false},()=>{
			this.clearUpdateModal();
		});
	}
	
    /*TreeSelect异步加载更多*/
    handleLoadMore( node ) {
    	 return fetch (`${ context.contextPath }/micro/GetTreeMenu?id=${node.id}`);
  	}
    
	/*TreeSelect选择*/
	handleSelect( node, isSelected, selectedNodes, event ) {
		this.setState({pid:selectedNodes[0].id});
	}

	clearUpdateModal() {
    	this.props._onDisappear( this.props._self );
  	}

	
  render() {
  
    return (
      <Page>
      	<Container type="fluid">
			<Modal visible={ this.state.visibleUpdateModal } onClose={ this.handleUpdateModalClose }>
      			<ModalHeader>
                      	  菜单管理-修改
                </ModalHeader>
                <ModalBody>
                	<Row>
                		<Col size={24} >
		                	<Form
				      			 method="post"
						          action={this.state.updateDataSource}
						          type="horizontal"
						          onSubmit={ this.handleUpdateBeforeSubmit }
						          async={ true }
						          onAfterSubmit={ this.handleUpdateModalAfterSubmit }
				      		>
					      		<FormItem name="menu_name" required>
					      			<Label>菜单名称: </Label>
					      			<Input value={this.state.menu_name} />
					      		</FormItem>
					      		<FormItem name="url" >
					      			<Label>访问地址: </Label>
					      			<Input value={this.state.url} />
					      		</FormItem>
					      		<FormItem name="icon" >
					      			<Label>图标: </Label>
					      			<Input value={this.state.icon} />
					      		</FormItem>
					      		<FormItem name="pid" >
					      			<Label>父菜单: </Label>
					      			<TreeSelect dataSource={this.state.dataSourceTree} 
					      				loadMore ={ this.handleLoadMore }
					      				multiple={ false }
					      				onSelect={ this.handleSelect } 
					      				defaultValue = { this.state.treeValue }/>
					      			
					      		</FormItem>
					      		<FormItem name="is_disable"  required>
					      			<Label>是否隐藏: </Label>
					      			<Select value={this.state.is_disable} >
									  <Option value="0">否</Option>
									  <Option value="1">是</Option>
									</Select>
					      		</FormItem>
					      		<FormItem name="ord" required>
					      			<Label>排序: </Label>
					      			<Input value={this.state.ord} />
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


export { UpdateMenuModal };
export default UpdateMenuModal;