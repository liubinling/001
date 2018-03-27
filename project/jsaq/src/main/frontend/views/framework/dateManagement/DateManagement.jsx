import React, { Component,PropTypes } from 'react';
import {Container, Button, Col, Alert, Row, Table, context, Column, Page, Input, Divider, Pagination, Modal, ModalHeader, ModalBody, ModalFooter, RadioGroup, Radio, DateTimePicker, Calendar, FormItem, Label, Form } from 'epm-ui';

const page = {
  title: "组件账期管理"
};


class DateManagement extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			tableTitle:['组件ID','组件名称','账期类型(D/M)','账期','操作'],
			tableMap:[{MODULE_ID:'--',MODULE_NAME:'--',DATE_TYPE:'--',DATE_VALUE:'--',OPERATE:'--'}],
			tempMap :[{MODULE_ID:'--',MODULE_NAME:'--',DATE_TYPE:'--',DATE_VALUE:'--',OPERATE:'--'}],
			tableLength:0,      //分页相关
			tableIndex:1,
			tableSize:10,
			tablePages:6,
			
			searchValue: '',
			searchData:[],
			ids:'',				//需要删除的ID
			msg:'',				//提示框内容
		    addModal: false,    //新增模态框默认关闭
		    modifyModal:false,  //修改模态框默认关闭
		    addSuccess:false,   //新增成功提示
            addError:false,     //新增失败提示
            delSuccess:false,   //删除成功提示
            delError:false,     //删除失败提示
            saveSuccess:false,  //保存成功提示
            saveError:false,    //保存失败提示
			typeValue: '',      //根据账期类型展示数据
			moduleInfo:{},      //修改功能的初始数据
			moduleInfoAdd:{},   //新增数据
			typeAdd:'date',     //新增控制账期插件
			typeSave:'date',    //修改控制账期插件
			url:`${this.props.site.baseContextPath}/DateManagement/DateManagementIndex`,
			dataSourceIndex:`${this.props.site.baseContextPath}/DateManagement/getAllData`,
			dataSourceType:`${this.props.site.baseContextPath}/DateManagement/getAllDataByType`,
			dataSourceAdd:`${this.props.site.baseContextPath}/DateManagement/addData`,
			dataSourceDel:`${this.props.site.baseContextPath}/DateManagement/delData`
			};
			
  		this.typeChange = this.typeChange.bind( this );               //账期类型对应展示数据
  		this.handlerrorClose = this.handlerrorClose.bind( this );     //关闭提示框
		this.searchInput = this.searchInput.bind( this );             //搜索框
		this.searchClick = this.searchClick.bind( this );             //搜索按钮
		this.paginationChange = this.paginationChange.bind( this );   //分页
		this.handleSelect = this.handleSelect.bind( this );           //表格选择框获取ID
		this.addSubmit = this.addSubmit.bind(this);                   //新增保存
		this.delModule= this.delModule.bind(this);                    //删除按钮
		this.modifySubmit = this.modifySubmit.bind(this);             //修改保存操作
	
	}

	componentDidMount() {
		  this.initData();
		}
		
	initData(){
	  const searchValue = this.state.searchValue;
	    fetch( this.state.dataSourceIndex,{ credentials: "include", method: "POST",
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded',},
	        body: "searchValue=" + encodeURIComponent(searchValue)
	        } )
	    .then( ( response ) => response.json() )
	    .then( ( data ) => this.assignData(data));
	}
	assignData( data ) {
	    this.state.tempMap=data;
	    let pages=Math.ceil(data.length/this.state.tableSize);
	    this.state.tableLength = data.length;
	    this.state.tablePages = pages;
	    this.paginationChange(1,this.state.tableSize);
	};

	//----------------根据账期类型展示数据-------------------------------------------------------------------
	typeChange( value ) {
	    const typeValue = value;
	    fetch( this.state.dataSourceType,{ credentials: "include", method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',},
            body: "typeValue=" + typeValue
         })
       .then( ( response ) => response.json() )
       .then( ( searchData ) => this.assignData(searchData) )
       .catch( ( err ) => console.error( this.state.dataSourceType, err.toString() ) );
	  }
	
	//----------------搜索---------------------------------------------------------------------------
	searchInput( date ) {
    	this.setState( { searchValue: date } );    
  	}
	searchClick() { 
    	const searchValue = this.state.searchValue;
        fetch( this.state.dataSourceIndex,{ credentials: "include", method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',},
            body: "searchValue=" + encodeURIComponent(searchValue)
         })
       .then( ( response ) => response.json() )
       .then( ( searchData ) => this.assignData(searchData) )
       .catch( ( err ) => console.error( this.state.dataSourceIndex, err.toString() ) );
	}  

	//----------------分页---------------------------------------------------------------------------
	paginationChange(index,size){
	    let colindex = 0 ;
	    if( index == 1){
	        colindex = 0
	    }else{
	        colindex=(index-1)*size;
	    }
	    let tableList = [];
	    this.setState({tableMap:[]});
	    let pageIndex = 0;
	    if(index == this.state.tablePages){
	        pageIndex = this.state.tableLength;
	    }else{
	        pageIndex = index*size;
	    }
	    for(let i=colindex;i<pageIndex;i++){
	        let tableMapTemp={};
	        tableMapTemp = this.state.tempMap[i];
	        tableList.push(tableMapTemp);
	    }
	    this.setState({tableMap:tableList,tableIndex:index});
	}
	
	//----------------模态框显示关闭----------------------------------------------------------------------
	showAddModal() {
      this.setState( { addModal: true} );
    }
    handleClose() {
        this.setState( { addModal: false,modifyModal: false,addSuccess: false,addError: false,delSuccess: false,delError: false,saveSuccess: false,saveError: false } );
      }
    handlerrorClose() {
        this.setState( { addError: false,saveError: false } );
      }
      
    //----------------新增---------------------------------------------------------------------------
    addSubmit( data ) {
        let str = JSON.stringify( data );
        let msg=data.msg;
        let flag=data.flag;
        this.setState({msg:msg});
        if(flag == 'true'){
            this.setState({addSuccess:true});
            this.closeTimer = setTimeout( () => {
            	this.handleClose();
            	}, 1*1000 );
            const w=window.open('about:blank','_self');
            w.location.href=this.state.url;
        }else{
            this.setState({addError:true});
            this.closeTimer = setTimeout( () => {
	        	this.handlerrorClose();
	        	}, 1*1000 );
        }
       }
	saveType(data){
	   	 if( data == 'D'){
	        this.setState({typeAdd:'date'});
	    }else{
	    	this.setState({typeAdd:'month'});
	    }
	   }
    
    //----------------删除---------------------------------------------------------------------------
    
    handleSelect( data ) {
  		const apps = data.map( ( item ) => item.MODULE_ID ).join(",");
  		this.setState( { ids: apps } );
	}
    delModule( ) {
	    var flag = confirm("是否要删除关于 "+this.state.ids+" 的所有数据");
		if( flag==true ){
			fetch( this.state.dataSourceDel, { method: 'POST',
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
	            body: "ids="+this.state.ids}  )
	            .then( ( response ) => response.json() )
	            .then( ( data ) => this.del(data));
		}
      }
    del(data){
    	let msg=data.msg;
        let flag=data.flag;
         this.setState({msg:msg});
    	if(flag == 'true'){
        	this.setState({delSuccess:true});
            this.closeTimer = setTimeout( () => {
            	this.handleClose();
            	}, 1*1000 );
            const w=window.open('about:blank','_self');
            w.location.href=this.state.url;
    	}else{
    		this.setState({delError:true});
            this.closeTimer = setTimeout( () => {
            	this.handleClose();
            	}, 1*1000 );
    	}
    }
    
    //----------------修改---------------------------------------------------------------------------
    modifyClick( value,index,rowData ) {
    	if( rowData.DATE_TYPE == 'D'){
	        this.setState({typeSave:'date'});
	    }else{
	    	this.setState({typeSave:'month'});
	    }
    	this.setState( { modifyModal: true,moduleInfo:rowData } );
      }
    modifySubmit( data ) {
	    let msg=data.msg;
        let flag=data.flag;
	    if(flag == 'true'){
	        this.setState({saveSuccess:true});
	        this.closeTimer = setTimeout( () => {
	        	this.handleClose();
	        	}, 1*1000 );
	        this.initData();
	    }else{
	        this.setState({saveError:true});
	        this.closeTimer = setTimeout( () => {
	        	this.handlerrorClose();
	        	}, 1*1000 );
	    }
	   }
    
	render() {
		return (
			<Page>
				<Container type="fluid">
					<h2>&nbsp;&nbsp;&nbsp;账期管理</h2>
	            	<Divider line />
	          	    <Row>
	          	    	<Col size={24}>
	          	    		<div>
	          	    			<h4 style={{float:'left',marginBottom:'2px'}}>&nbsp;&nbsp;&nbsp;组件名称：</h4>
	                    		<Input placeholder="请输入组件名称/ID"  style={{float:'left'}} onChange={ this.searchInput } />
	                    		<Button type="primary" style={{float:'left',marginLeft:'10px'}} onClick={ this.searchClick }>搜索</Button>
	                    		<div style={{float:'left',marginLeft:'10px'}}>
		                    		<RadioGroup name="addType" value="" type="inline" onChange={ this.typeChange }>
									  <Radio value="">全部账期(D/M)</Radio>
									  <Radio value="D">日账期(D)</Radio>
									  <Radio value="M">月账期(M)</Radio>
									</RadioGroup>
	                    		</div>
	                        	<Button type="primary" style={{float:'right',marginRight:'30px'}} onClick={ this.delModule }>删除</Button>    
	                        	<Button type="primary" style={{float:'right',marginRight:'10px'}} onClick={ this.showAddModal.bind( this ) }>新增</Button>
	                 		</div>
	          	    	</Col>
	          	    </Row>
		            <Divider clearing />
		            {this.state.delSuccess?<Alert message={ this.state.msg }  type="success" dismissible />
	                                 :null                 
	                         }
	                         {this.state.delError?<Alert message={ this.state.msg } type="warning" dismissible />
	                                 :null                    
	                         }
		            <Table dataSource={ this.state.tableMap } checkable onCheck={ this.handleSelect } multiLine={ true }>
		            	<Column title={this.state.tableTitle[0]} dataIndex="MODULE_ID" />
		                <Column title={this.state.tableTitle[1]} dataIndex="MODULE_NAME" />
		                <Column title={this.state.tableTitle[2]} dataIndex="DATE_TYPE" />
		                <Column title={this.state.tableTitle[3]} dataIndex="DATE_VALUE" />
		                <Column title={this.state.tableTitle[4]} dataIndex="KPI_OPERATE" >
	                 		{ ( value,index,rowData ) => <Button type="primary" onClick={this.modifyClick.bind(this,value,index,rowData)}>编辑 </Button> }
	                 	</Column>
		            </Table>
		            <br />
		            <Row>
		                <Col size={24}>
		                	<div style={{float:'right',marginRight:'25px'}}>
		                    	<Pagination index={ this.state.tableIndex } size={this.state.tableSize} total={ this.state.tableLength } onChange={this.paginationChange}/>
		                    </div>
		                </Col>
		            </Row>
		            <Modal visible={ this.state.addModal } onClose={ this.handleClose.bind( this ) }>
	            		<ModalHeader>
	             			 新增
	            		</ModalHeader>
	            		<ModalBody>
	            			{this.state.addSuccess?<Alert message={ this.state.msg } type="success" dismissible />
	                                 :null                 
	                         }
	                         {this.state.addError?<Alert message={ this.state.msg } type="warning" dismissible />
	                                 :null                    
	                         }
	                       <Row>
	                       	<Col size ={ 24 }>
	                       		<Form method="post" type="horizontal"  async={ true } onAfterSubmit={ this.addSubmit }
			                       action={ `${this.props.site.baseContextPath}/DateManagement/addData` } >
			            			<FormItem required>
			                           <Label>组件名称：</Label>
			                           <Input name="inputName"  pattern= { /^[\u4E00-\u9FA5-a-zA-Z0-9_.-]{1,30}$/ } value={this.state.moduleInfoAdd.MODULE_NAME} placeholder="支持中英文、数字、符号（._-）" />
			                        </FormItem>
			                        <FormItem required>
			                           <Label>组件ID：</Label>
			                           <Input name="inputId"  pattern= { /^[a-zA-Z0-9_.-]{1,30}$/ } placeholder="支持英文、数字、符号（._-）" />
			                        </FormItem>
			                        <FormItem required>
			                           <Label>账期类型：</Label>
			                           <RadioGroup name="inputType" value='D' type="inline" onChange={this.saveType.bind(this)}>
										  <Radio value="D">日账期(D)</Radio>
										  <Radio value="M">月账期(M)</Radio>
									   </RadioGroup>
			                        </FormItem>
			                        <FormItem required>
			                           <Label>账期值：</Label>
			                           <DateTimePicker name="inputDate" type={this.state.typeAdd} />
			                        </FormItem>
			                       <Button onClick={ this.handleClose.bind( this ) }>关闭</Button>
			                       <Button type="primary" htmlType="submit">提交</Button>
			            		    <div style={{height:22+'em'}}></div>
			                     </Form>
	                       	</Col>
	                       </Row>
	                 </ModalBody>
	               </Modal>
	               <Modal visible={ this.state.modifyModal } onClose={ this.handleClose.bind( this ) }>
	            		<ModalHeader>
	             			 修改
	            		</ModalHeader>
	            		<ModalBody>
	            			{this.state.saveSuccess?<Alert message="保存成功！"  type="success" dismissible />
	                                   :   null                 
	                           }
	                        {this.state.saveError?<Alert message="保存失败！"  type="warning" dismissible />
	                               :null                    
	                           }
	                       <Row>
	                       	<Col size ={ 24 }>
		                       <Form method="post" type="horizontal"  async={ true } onAfterSubmit={ this.modifySubmit }
		                       action={ `${this.props.site.baseContextPath}/DateManagement/upData` } >
		            		   		<FormItem required>
		                            	<Label>组件名称：</Label>
		                           	    <Input name="saveName" pattern= { /^[\u4E00-\u9FA5-a-zA-Z0-9_.-]{1,30}$/ } value={this.state.moduleInfo.MODULE_NAME} />
		                            </FormItem>
		                            <FormItem required>
		                            	<Label>组件ID：</Label>
		                            	<Input name="saveId" pattern= { /^[a-zA-Z0-9_.-]{1,30}$/ } value={this.state.moduleInfo.MODULE_ID} disabled/>
		                            </FormItem>
		                            <FormItem required>
		                            	<Label>账期类型：</Label>
		                            	<RadioGroup  name="saveType" value={this.state.moduleInfo.DATE_TYPE} type="inline" disabled>
									    	<Radio value="D">日账期(D)</Radio>
									    	<Radio value="M">月账期(M)</Radio>
								    	</RadioGroup>
		                         	</FormItem>
		                            <FormItem required>
		                            	<Label>账期值：</Label>
		                            	<DateTimePicker name="saveDate" value={this.state.moduleInfo.DATE_VALUE} type={this.state.typeSave}/>
		                         	</FormItem>
		                       	    <Button onClick={ this.handleClose.bind( this ) }>关闭</Button>
		                            <Button type="primary" htmlType="submit">保存</Button>
		            		        <div style={{height:22+'em'}}></div>
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

DateManagement.epmUIPage = page;

export {DateManagement};
export default DateManagement;
