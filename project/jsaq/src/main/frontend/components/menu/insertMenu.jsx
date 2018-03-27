import React, { Component } from 'react';
import { Page, Container, Row, Col, Button, Table, TreeSelect, Select, Option, Column, Divider, popup, Form, FormItem, Label, Input, context, Snackbar, Modal, ModalHeader, ModalBody, ModalFooter, Pagination} from 'epm-ui';
import { InsertMenuModal } from './insertMenuModal';
import { UpdateMenuModal } from './updateMenuModal';

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
		this.showInsertModal = this.showInsertModal.bind( this );
		this.handleTableData = this.handleTableData.bind( this );
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
	
	/*点击查看*/
	handleMore(){
		this.props.handleMore(`${ context.contextPath }/micro/GetInsertMenuView`);
	}
    
    /*点击修改，根据id去后台查询相关数据*/
	handleUpdateClick(id){
		popup( <UpdateMenuModal  menuId = {id}  initData = {this.getInit} /> );
		
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
		popup( <InsertMenuModal initData = {this.getInit}  /> );
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
	      "title": "操作",
	      "key": "id",
	      "sub": (value,index,rowData)=>{
	      	return(
	      		<div>
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
            <Row>
            	<Col size={24}>
            		<div style={{float:'right'}}>
		            	<a onClick={ this.handleMore.bind( this ) } >查看更多</a>
		            </div>
            	</Col>
            </Row>
            <Divider  />
      		<Form
				method="post"
		        action={ this.state.updateProjectInfo }
		        type="horizontal"
		        async={ true }
		        onSubmit={ this.handleProjectBeforeSubmit }
		        onAfterSubmit={ this.handleUpdateProject }
      		>
      			<FormItem name="project_name">
      				<div>
	      				<div style={{textAlign:'left',verticalAlign:'top',position:'relative',top:'0.1875rem',marginRight:'0px',marginBottom:'0px',color:'#54698d',fontSize:'0,75rem',lineHeight:'1.8', width:'70px'}}><div style={{float:'left',width:'65px'}}>项目名称</div>:</div>
	          			<div style={{position:'absolute', left:'47px', top:'0px'}}>
	          				<Input type="text" value={this.state.project_name} />
	          			</div>
          			</div>
      			</FormItem>
      			<FormItem name="project_icon">
	      				<div style={{textAlign:'left',verticalAlign:'top',position:'relative',top:'0.1875rem',marginRight:'0px',marginBottom:'0px',color:'#54698d',fontSize:'0,75rem',lineHeight:'1.8', width:'70px'}}><div style={{float:'left',width:'65px'}}>LOGO</div>:</div>
	          			<div style={{position:'absolute', left:'47px', top:'40px'}}>
	          				<Input  type="text" value={this.state.project_icon} />
	          			</div>
      			</FormItem>
      			<Divider/>
      			<Button type="primary" htmlType="submit">保存</Button>
      		</Form>
      		
      		<Divider/>
      		<Form
				method="post"
		        action={ this.state.searchDataSource }
		        type="horizontal"
		        async={ true }
		        onSubmit={ this.handleSearchBeforeSubmit }
		        onAfterSubmit={ this.handleTableData }
      		>
      			<FormItem name="menuName">
      				<div style={{textAlign:'left',verticalAlign:'top',position:'relative',top:'0.1875rem',marginRight:'0px',marginBottom:'0px',color:'#54698d',fontSize:'0,75rem',lineHeight:'1.8', width:'70px'}}><div style={{float:'left',width:'65px'}}>菜单名称</div>:</div>
          			<div style={{position:'absolute', left:'47px', top:'0px'}}>
          				<Input type="text" placeholder="请输入菜单名称"  />
          			</div>
      			</FormItem>
      			<Divider/>
      			<Button type="primary" htmlType="submit">搜索</Button>
      			<Button type="primary" onClick = { this.showInsertModal } >新增</Button>
      			
      		</Form>
      		<Divider/>
			<Table dataSource={ this.state.tableMap } columns={ tableColumns }  />
			<Divider/>
			<Pagination align="right" pages={5} index={ this.state.tableIndex } size={this.state.tableSize} total={ this.state.tableLength }  onChange={this.handleChangePagination}/>
        </Container>
      </Page>
    );
  }
}

InsertMenu.epmUIPage = page;

export default InsertMenu;
export { InsertMenu };