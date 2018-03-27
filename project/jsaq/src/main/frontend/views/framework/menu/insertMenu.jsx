import React, { Component } from 'react';
import { Page, Container, Row, Col, Button, Table, TreeSelect, Select, Option, Column, Divider, popup, Form, FormItem, Label, Input, context, Snackbar, Modal, ModalHeader, ModalBody, ModalFooter, Pagination} from 'epm-ui';
import { InsertMenuModal, UpdateMenuModal } from '../components';

const page = {
  title: "菜单修改"
};

class InsertMenu extends Component {
	constructor(props){
    	super(props);
    	this.state = {
    		idList:null,
	        menuName : '',
	        project_name : props.project_name || '',
	        project_icon : props.project_icon || '',
	        project_id : props.project_id || '',
	        dataSource : `${ context.contextPath }/micro/GetAllMenu`,
	        searchDataSource : `${ context.contextPath }/micro/GetMenuByName`,
	        deleteDataSource : `${ context.contextPath }/micro/DeleteMenuById`,
	        updateProjectInfo : `${ context.contextPath }/micro/UpdateProjectInfo`,
	        tableLength:0,
            tableIndex:1,
            tableSize:10,
            tablePages:0
            
	        
		}
		this.showInsertModal = this.showInsertModal.bind(this);
		this.handleTableData = this.handleTableData.bind(this);
		this.handleSearchBeforeSubmit = this.handleSearchBeforeSubmit.bind( this );
		this.handleUpdateProject = this.handleUpdateProject.bind( this );
		this.handleProjectBeforeSubmit = this.handleProjectBeforeSubmit.bind( this );
		this.handleChangePagination = this.handleChangePagination.bind( this );
		this.getInit = this.getInit.bind( this );
	
  	}
  	
  	componentDidMount() {
        fetch( this.state.dataSource , { credentials: 'same-origin' } )
         .then( ( response ) => response.json() )
         .then( ( data ) => this.handleTableData(data))
         .catch( ( err ) => console.error( this.state.dataSource, err.toString() ) );
    }
    
    /*初始化表格数据,type是判断菜单名称是否转码*/
    getInit(){
    	fetch( this.state.searchDataSource, {credentials: 'include', method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
			body: "menuName="+encodeURIComponent(this.state.menuName)+"&type=1"})     
			.then( ( response ) => response.json() )
			.then( ( data ) =>  this.handleTableData( data ));
    }
    
    /*菜单查找form表单提交前，修改this.state.menuName的值*/
	handleSearchBeforeSubmit(data){
		this.state.menuName = data.menuName;
		return data;
	}
    
    /*点击修改，根据id去后台查询相关数据*/
	handleUpdateClick(id){
		popup( <UpdateMenuModal  menuId = {id} initData = {this.getInit} /> );
		
	}
    
	/*点击删除，根据id删除数据*/
	handleDeleteClick(id, rowData){
		var flag = confirm("是否要删除关于 "+rowData.name+" 的所有数据");
		if( flag==true ){
			fetch( this.state.deleteDataSource, {credentials: 'include', method: 'POST',
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
    
    handleTableData(data){
    	let pages=Math.ceil(data.length/this.state.tableSize);
    	this.setState({tableDataSource:data,tableLength:data.length,tablePages:pages});
    	this.handleChangePagination(1,this.state.tableSize);
    }
    
  	/*显示插入数据的模态框*/
	showInsertModal(){
		popup( <InsertMenuModal  initData = {this.getInit} /> );
	}
	
	/*处理提交前的数据*/
	handleProjectBeforeSubmit(data){
		data.project_id = this.state.project_id;
		return data;
	}
	
	/*框架信息修改完成后*/
	handleUpdateProject(data){
		let msg = data.msg;
		popup( <Snackbar message={msg} duration={ 3 } /> );
	}
	
	/*处理分页数据，每页数据成表格*/
    handleChangePagination(index,size){
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
            tableMapTemp = this.state.tableDataSource[i];
            tableList.push(tableMapTemp);
        }

        this.setState({tableMap:tableList,tableIndex:index});

    }
	
  render() {
  
  
	const tableColumns = [
		{
	      "title": "菜单名称",
	      "key": "name"
	    },
	     {
	      "title": "访问地址",
	      "key": "url"
	    },
	    {
	      "title": "图标",
	      "key": "icon"
	    },
	    {
	      "title": "父菜单",
	      "key": "pname"
	    },
	    {
	      "title": "排序",
	      "key": "ord"
	    },
	    {
	      "title": "操作",
	      "key": "id",
	      "sub": (value,index,rowData)=>{
	      	return(
	      		<div className="text" style={{marginLeft: '0px',  height: '100%', lineHeight: '2.5'}}>
		      		<a onClick={ this.handleUpdateClick.bind( this, value ) } >修改</a>&nbsp;&nbsp;&nbsp;&nbsp;
		      		<a onClick={ this.handleDeleteClick.bind( this, value, rowData ) } >删除</a>
	      		</div>
	      	)
	      }
	    }
	];
			
    return (
      <Page>
      	<Container type="fluid">
            <Divider  />
      		<Form
				method="post"
		        action={ this.state.updateProjectInfo }
		        type="inline"
		        async={ true }
		        onSubmit={ this.handleProjectBeforeSubmit }
		        onAfterSubmit={ this.handleUpdateProject }
      		>
      			<FormItem name="project_name">
      				<Label>项目名称:</Label>
          			<Input type="text" value={this.state.project_name} />
      			</FormItem>
      			<FormItem name="project_icon">
      				<Label>LOGO&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Label>
          			<Input  type="text" value={this.state.project_icon} />
      			</FormItem>
      			<Button type="primary" htmlType="submit">保存</Button>
      		</Form>
      		
      		<Divider/>
      		<Form
				method="post"
		        action={ this.state.searchDataSource }
		        type="inline"
		        async={ true }
		        onSubmit={ this.handleSearchBeforeSubmit }
		        onAfterSubmit={ this.handleTableData }
      		>
      			<FormItem name="menuName">
      				<Label>菜单名称:</Label>
          			<Input type="text" placeholder="请输入菜单名称"  />
      			</FormItem>
      			<Button type="primary" htmlType="submit">搜索</Button>
      			<Button type="primary" onClick = { this.showInsertModal } >新增</Button>
      			
      		</Form>
      		<Divider/>
			<Table dataSource={ this.state.tableMap } columns={ tableColumns } showContextMenu={ true } bordered={true} />
			<Divider/>
			<Pagination align="right"  index={ this.state.tableIndex } size={this.state.tableSize} total={ this.state.tableLength } pages={ 5 } onChange={this.handleChangePagination}/>
        </Container>
      </Page>
    );
  }
}

InsertMenu.epmUIPage = page;

export default InsertMenu;
export { InsertMenu };