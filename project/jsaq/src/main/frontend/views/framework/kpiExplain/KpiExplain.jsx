import React, { Component,PropTypes} from 'react';
import { Container, Button, Col, Row,Alert, Table, context, Column, Page, Input, Divider, Pagination, Modal, ModalHeader, ModalBody, ModalFooter, Textarea} from 'epm-ui';

class  IndexAllocation extends Component {

constructor( props ) {
  super( props );
  this.state = {
          tableTitle:['ID','模块名称','指标解释',' 操 作'],
          tableMap:[{value1:'--',value2:'--',value3:'--',value4:'--'}],
          tempMap:[{value1:'--',value2:'--',value3:'--',value4:'--'}],
          tableLength:0,
          tableIndex:1,
          tableSize:10,
          tablePages:12,
          keyWords: '',
          searchData:[],
          ids:'',              //需要删除的ID
          msg:'',              //提示框内容
          moduleInfo:{},      //修改功能的初始数据 
          moduleInfoAdd:{},   //新增数据
          show:false,
          add:false,
          revise:false,
          preview:false,
          addSuccess:false,   //新增成功提示
          addError:false,     //新增失败提示
          delSuccess:false,   //删除成功提示
          delError:false,     //删除失败提示
          saveSuccess:false,  //保存成功提示
          saveError:false,    //保存失败提示
          
          preId:'',
          preName:'',
          preExplain:'',
          preInfo:{},        //预览功能的数据
         
          inputName:'',
          inputId:'',
          inputExplain:'',
          saveExplain:'',
          saveName:'',
          saveId:'',
          url:`${this.props.site.baseContextPath}/KpiExplain/KpiExplainIndex`,
          dataSource:`${this.props.site.baseContextPath}/KpiExplain/KpiExplainData` , //从dataSource中取出数据
          delMods:`${this.props.site.baseContextPath}/KpiExplain/DelData`,
          dataSourceAdd:`${this.props.site.baseContextPath}/KpiExplain/AddData`,
          dataSourceRev:`${this.props.site.baseContextPath}/KpiExplain/RevData`
  };

  
  //搜索
  this.handleInput = this.handleInput.bind( this );
  this.handleClick = this.handleClick.bind( this );
  this.handleSelect = this.handleSelect.bind( this );
  
  //预览
  this.handleClick1 = this.handleClick1.bind( this );
  //关闭提示框
  this.handlerrorClose = this.handlerrorClose.bind( this );     
  //分页
  this.handleChange = this.handleChange.bind( this );
  //新增模态框
  this.addInputName = this.addInputName.bind( this );
  this.addInputId   = this.addInputId.bind( this );
  this.addInputExplain = this.addInputExplain.bind( this );
  this.addClick     = this.addClick.bind( this );
  //删除
  this.delModule= this.delModule.bind(this);
  //修改
  this.saveInputExplain = this.saveInputExplain.bind(this);
  this.saveClick     = this.saveClick.bind( this );
}

//模态框关闭按钮------------------------------------------
handleClose() {
    this.setState( { preview: false,add: false,revise:false,flag1: false,flag2: false,addSuccess: false,addError: false,delSuccess: false,delError: false,saveSuccess: false,saveError: false } );
  }
handlerrorClose() {
    this.setState( { addError: false,saveError: false } );
  }

//预览模态框-------------------------------------------------------------------------------------------------------------------
showModal(value,index,rowData) {   
    this.setState( { preview: true, preId:rowData.KPI_ID,preExplain:rowData.KPI_EXPLAIN,preName:rowData.KPI_NAME,preInfo:rowData } );
  }
handleClick1() { 
    fetch( this.state.dataSourceRev,{ credentials: "include", method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',},
        body: "&preExplain=" + encodeURIComponent(this.state.saveExplain)+"&preId=" + encodeURIComponent(this.state.saveId)
     })
   .then( ( response ) => response.json() )
   .then( ( data ) => this.assignDataPre(data) )
   .catch( ( err ) => console.error( this.state.dataSourceRev, err.toString() ) );
  }  
assignDataPre( data ) {
    this.handleClose();
    this.initData();
    };

//删除--------------------------------------------------------------------------------------------------------------------------
handleSelect( data ) {
        const apps = data.map( ( item ) => item.KPI_ID ).join(",");
        this.setState( { ids: apps } );
   }
delModule( ) {
	var flag = confirm("是否要删除关于 "+this.state.ids+" 的所有数据");
	if( flag==true ){
		fetch( this.state.delMods, { method: 'POST',
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


//修改---------------------------------------------------------------------------------------------------------------------------
saveInputExplain(data) {
    this.setState( { saveExplain: data } );
  }
saveClick(){
    fetch( this.state.dataSourceRev,{ credentials: "include", method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',},
        body: "&saveExplain=" + encodeURIComponent(this.state.saveExplain)+"&saveId=" + encodeURIComponent(this.state.saveId)
     })
   .then( ( response ) => response.json() )
   .then( ( data ) => this.assignDataRev(data) )
   .catch( ( err ) => console.error( this.state.dataSourceRev, err.toString() ) );
  }
assignDataRev( data ) {
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
    };
  //修改模态框显示
    showUpdateModal(value,index,rowData) {
      this.setState( { revise: true,saveId:rowData.KPI_ID,saveExplain:rowData.KPI_EXPLAIN,saveName:rowData.KPI_NAME,moduleInfo:rowData } );
    }

//新增---------------------------------------------------------------------------------------------------------------------------------
addInputName( data) {
  this.setState( { inputName: data } );  
}
addInputId( data ) {
  this.setState( { inputId: data } );
}
addInputExplain( data ) {
  this.setState( { inputExplain: data } );
}
//新增模态框显示
showAddModal() {
  this.setState( { add: true } );
}

addClick(){
    fetch( this.state.dataSourceAdd,{ credentials: "include", method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',},
        body: "inputName=" + encodeURIComponent(this.state.inputName)+"&inputId=" + encodeURIComponent(this.state.inputId)+"&inputExplain=" + encodeURIComponent(this.state.inputExplain)
     })
   .then( ( response ) => response.json() )
   .then( ( data ) => this.assignDataAdd(data) )
   .catch( ( err ) => console.error( this.state.dataSourceAdd, err.toString() ) );
  }

assignDataAdd( data ) {
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
    };
 
//渲染完与后台交互异步数据，后端不会走-------------------------------------------------------------------------------------
componentDidMount(param) {
   this.initData();
}

initData(){
    const keyWords = this.state.keyWords;
    fetch( `${this.props.site.baseContextPath}/KpiExplain/KpiExplainData`,
            { credentials: "include", 
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',},
        body: "keyWords=" + encodeURIComponent(keyWords)
        } )
    .then( ( response ) => response.json() )
    .then( ( data ) => this.assignData(data));
}

//处理分页数据---------------------------------------------------------------------------------------
handleChange(index,size){
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
    assignData( data ) {
    this.state.tempMap=data;
    let pages=Math.ceil(data.length/this.state.tableSize);
    this.state.tableLength = data.length;
    this.state.tablePages = pages;
    this.handleChange(1,this.state.tableSize);
};
  
//搜索--------------------------------------------------------------------------------------------------
handleClick() { 
  const keyWords = this.state.keyWords;
  fetch( 
    `${this.props.site.baseContextPath}/KpiExplain/KpiExplainData`,
    { credentials: "include", 
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded',},
      body: "keyWords=" + encodeURIComponent(keyWords)
      } )
  .then( ( response ) => response.json() )
  .then( ( searchData ) => this.assignData(searchData) )
  .catch( ( err ) => console.error( url, err.toString() ) );
  }  
//搜索框
handleInput( date ) {
    this.setState( { keyWords: date } );  
  }

render() {
  return (
    <Page>
    	<Container type="fluid">
          <Row>
              <h2>&nbsp;&nbsp;&nbsp;&nbsp;指标解释 </h2>
          </Row> 
          <Divider line />
          <Row>    
              <Col size={ 16 }>
              <h4 style={{float:'left',marginBottom:'2px'}}>&nbsp;&nbsp;&nbsp;指标名称：</h4>
                 <Input placeholder="请输入指标名称" style={{float:'left'}} onChange={ this.handleInput } />
              &nbsp;&nbsp;<Button type="primary" onClick={ this.handleClick }>搜索</Button>
              </Col>
              <Col size={ 8 }>
                 <Button type="primary" style={{float:'right',marginRight:'30px'}}  onClick={ this.showAddModal.bind( this ) }>新增</Button>
                 <Button type="primary" style={{float:'right',marginRight:'10px'}}  onClick={ this.delModule }>删除</Button>              
              </Col>
          </Row>
          <Divider clearing />
                 {this.state.delSuccess?<Alert message={ this.state.msg }  type="success" dismissible />
                         :null                 
                 }
                 {this.state.delError?<Alert message={ this.state.msg } type="warning" dismissible />
                         :null                    
                 }
          <Table dataSource={ this.state.tableMap } resizable={ true }  checkable onCheck={ this.handleSelect } >
             <Column title={this.state.tableTitle[0]} dataIndex="KPI_ID" />
             <Column title={this.state.tableTitle[1]} dataIndex="KPI_NAME" />
             <Column title={this.state.tableTitle[2]} dataIndex="KPI_EXPLAIN" />
                 <Column title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;操作" dataIndex="KPI_OPERATE" >
                 { ( value,index,rowData) =><div> 
                 <Button type="primary" onClick={ this.showUpdateModal.bind( this,value,index,rowData ) }> 修改 </Button>
                 <Button type="primary" onClick={ this.showModal.bind( this,value,index,rowData ) }> 预览 </Button>
                 </div> }
                
                 </Column>
         </Table>
          <br />
          <Row>
              <Col size={20}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您搜索的是：<span style={ { color: 'red' } }>{ this.state.keyWords }</span></Col>
              <Col size={4}>
                 <div style={{float:'right'}}>
                    <Pagination index={ this.state.tableIndex } size={this.state.tableSize} total={ this.state.tableLength } onChange={this.handleChange}/>
                 </div>
              </Col>
         </Row>
              
              <Modal visible={ this.state.preview } onClose={ this.handleClose.bind( this ) } >
              <ModalHeader>
              {this.state.preInfo.KPI_NAME}
              </ModalHeader>
              <ModalBody>
              <Textarea rows={ 15 } name="textarea"  value={this.state.preInfo.KPI_EXPLAIN} readonly/>
              </ModalBody>
             </Modal>
              <Modal visible={ this.state.add } onClose={ this.handleClose.bind( this ) } closable={false}>
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
                      <h4 >指标ID：</h4>
                      <Input placeholder="请输入指标ID" onChange={ this.addInputId }/>
                      <h4 >指标名称：</h4>
                      <Input placeholder="请输入指标名称" onChange={ this.addInputName }/>
                      <h4 >指标解释：</h4>
                      <Textarea placeholder="请输入指标解释"  rows={ 8 } name="textarea" onChange={ this.addInputExplain }/>
              </ModalBody>
              <ModalFooter>
              <Button onClick={ this.handleClose.bind( this ) }>关闭</Button>
              <Button onClick={ this.addClick }>保存</Button>
              </ModalFooter>
          </Modal>
              <Modal visible={ this.state.revise } onClose={ this.handleClose.bind( this ) } closable={false}>
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
                     <h5>指标名称：</h5>
                     <Textarea rows={ 1 } name="textarea"  value={this.state.moduleInfo.KPI_NAME} readonly/>
                     <h5 >修改指标解释：</h5>
                     <Textarea rows={ 8 } name="textarea"  value={this.state.moduleInfo.KPI_EXPLAIN}  onChange={ this.saveInputExplain }/>
              </ModalBody>
              <ModalFooter>
              <Button onClick={ this.handleClose.bind( this ) }>关闭</Button>
              <Button onClick={ this.saveClick.bind(this )}>保存</Button>
              </ModalFooter>
          </Modal>
		</Container>
    </Page>
  );
}

}
export { IndexAllocation };
export default IndexAllocation;