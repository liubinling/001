import React, { Component } from 'react';
import { Container,Page,Col,Row,Form,FormItem,Table,Column,PagiTable,Divider,Label,Input,Button,Alert,Upload,context,Snackbar,popup} from 'epm-ui';

class TableList extends Component {
    constructor(props) {
        super(props);
 		this.state = {
 			tableCount:1,
 			tableCount1:1,
            tableIndex:1,
            tableSize:5,
            dataSource1:`${context.contextPath}/upAndDown/getList`,
            dataSource2:`${context.contextPath}/upAndDown/downFile`,
            dataSource3:`${context.contextPath}/upAndDown/deleteFile`,
            dataSource4:`${context.contextPath}/upAndDown/findFile`
        };
        this.handleSubmit = this.handleSubmit.bind( this);
        this.handleAfterSubmit = this.handleAfterSubmit.bind( this);
        this.handleAfterSubmit1 = this.handleAfterSubmit1.bind( this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind( this );
        this.handleSearchSubmit1 = this.handleSearchSubmit1.bind( this );
        this.handleOnChange = this.handleOnChange.bind( this );
        this.handleOnChange1 = this.handleOnChange1.bind( this );
        
    };
 	componentDidMount(){
 		this.queryData();
 		this.queryData1();
    }
    queryData(){
	    fetch(this.state.dataSource1,{ credentials: 'include', method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
            body: "type=1&index="+this.state.tableIndex+"&size="+this.state.tableSize}  )
            .then((response) => response.json())
            .then((data) => this.setState({tableMap:data[0],tableCount:data[1]}));
    }
    queryData1(){
	    fetch(this.state.dataSource1,{ credentials: 'include', method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
            body: "type=0&index="+this.state.tableIndex+"&size="+this.state.tableSize}  )
            .then((response) => response.json())
            .then((data) => this.setState({tableMap1:data[0],tableCount1:data[1]}));
    }
    
   handleOnChange(pageIndex, pageSize){
   		this.setState({tableIndex:pageIndex},()=> {
            this.queryData();
        });
   }
   handleOnChange1(pageIndex, pageSize){
   		this.setState({tableIndex:pageIndex},()=> {
            this.queryData1();
        });
   }
    download(value,type){
   	 window.location.href = this.state.dataSource2+"?filenumber="+value+"&type="+type;
    }
    deleteFile(value,type){
	     fetch( this.state.dataSource3,{ credentials: 'include', method: 'POST',
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
	            body: "filenumber="+value+"&type="+type}  )
	            .then( ( response ) => response.json() )            
	            .then( (data) =>{
	            	if(data[0]=="2"){
	    			  	popup( <Snackbar message="删除成功" duration={ 3 } />);
	    			  	setTimeout(this.setState({tableIndex:1},()=> {
        	this.queryData();}),1000);
	            	}
	            	if(data[0]=="3"){
	            		popup( <Snackbar message="删除失败" duration={ 3 } />);
	            	}
	            });
    }    
    deleteFile1(value,type){
	     fetch( this.state.dataSource3,{ credentials: 'include', method: 'POST',
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
	            body: "filenumber="+value+"&type="+type}  )
	            .then( ( response ) => response.json() )            
	            .then( (data) =>{
	            	if(data[0]=="2"){
	    			  	popup( <Snackbar message="删除成功" duration={ 3 } />);
	    			  	setTimeout(this.setState({tableIndex:1},()=> {
        	this.queryData1();}),1000);
	            	}
	            	if(data[0]=="3"){
	            		popup( <Snackbar message="删除失败" duration={ 3 } />);
	            	}
	            });
    }
    handleSubmit(data){
    	var arr=[];
    	for (var i=0;i<data.file.length;i++) {
  			arr.push(encodeURIComponent(data.file[i].name));
	  	}
	  	data["fileNames"]=arr;
    	return data;
    }
    handleAfterSubmit(data){
    	if(data[0]=="1"){
    		let mess="文件"+data[1]+"已经存在，请重命名或删除后重新上传";
		  	popup( <Snackbar message={mess} duration={ 3 } />);
		}
		if(data[0]=="2"){
		  	popup( <Snackbar message="上传成功" duration={ 3 } />);
		}
		if(data[0]=="3"){
			popup( <Snackbar message="上传失败，请联系管理员" duration={ 3 } />);
		}
		this.setState({tableIndex:1},()=> {
        	this.queryData();
        });
    }
     handleAfterSubmit1(data){
    	if(data[0]=="1"){
    		let mess="文件"+data[1]+"已经存在，请重命名或删除后重新上传";
		  	popup( <Snackbar message={mess} duration={ 3 } />);
		}
		if(data[0]=="2"){
		  	popup( <Snackbar message="上传成功" duration={ 3 } />);
		}
		if(data[0]=="3"){
			popup( <Snackbar message="上传失败，请联系管理员" duration={ 3 } />);
		}
		this.setState({tableIndex:1},()=> {
        	this.queryData1();
        });
    }
    handleSearchSubmit(data){
        this.setState({tableMap:data[0],tableCount:data[1],tableIndex:1},()=> {
        });
    }
    handleSearchSubmit1(data){
        this.setState({tableMap1:data[0],tableCount1:data[1],tableIndex:1},()=> {
        });
    }
    render() {
    const columns = [
    	{
		    title: '文件名',
		    key: 'FILENAME', 
		  },
		  {
		    title: '文件大小',
		    key: 'FILESIZE', 
		  },
		  {
		    title: '文件路径',
		    key: 'FILEPATH', 
		  },
		  {
		    title: '文件上传时间',
		    key: 'UPDATEDATE', 
		  },
		  {
		    title: '上传用户',
		    key: 'USERNAME', 
		  },
		  {
		    title: '操作',
		    key: 'ID', 
		    sub:(value)=>{
		    		 return (
		    		 	<div>
                              <Button type="link" onClick={ this.download.bind( this,  value,1 ) } >下载</Button>
                              <Button type="link" onClick={ this.deleteFile.bind( this,  value,1) } >删除</Button>
                        </div>
                        )
                         }
		  }
    ];
    const columns1 = [
    	{
		    title: '文件名',
		    key: 'FILENAME', 
		  },
		  {
		    title: '文件大小',
		    key: 'FILESIZE', 
		  },
		  {
		    title: '文件路径',
		    key: 'FILEPATH', 
		  },
		  {
		    title: '文件上传时间',
		    key: 'UPDATEDATE', 
		  },
		  {
		    title: '上传用户',
		    key: 'USERNAME', 
		  },
		  {
		    title: '操作',
		    key: 'ID', 
		    sub:(value)=>{
		    		 return (
		    		 	<div>
                              <Button type="link" onClick={ this.download.bind( this,  value,0 ) } >下载</Button>
                              <Button type="link" onClick={ this.deleteFile1.bind( this,  value,0) } >删除</Button>
                        </div>
                        )
                         }
		  }
    ];
        return (
            <Page>
            	<Container type="fluid">
	            	<Row>
	            		<Col size={24}>
	            			<h5>SFTP服务文件上传下载管理</h5>
	            		</Col>
	            	</Row>
	            	<Divider/>
	            	<Divider/>
	            	<Row>
	            		<Col size={8}>
	            			<Form method="post"
	                    	  type="inline"
	                          async={ true }
	                          action={ `${context.contextPath}/upAndDown/getList?type=1&index=1&size=`+this.state.tableSize} 
	                          onAfterSubmit={ this.handleSearchSubmit }
	                          > 
							  	<FormItem>
		                            <Label>文件名称:</Label>
									<Input name="fileName" placeholder="请输入文件名称" />
	                        	</FormItem>	
							  	<Button type="primary" htmlType="submit">搜索</Button>				
							</Form>
	            		</Col>
	            		<Col size={8}>
	            		</Col>
	            		<Col size={8}>
							 <Form method="post"
	                    	  type="inline"
	                          async={ true }
	                          enctype="multipart/form-data"
	                          action={ `${context.contextPath}/upAndDown/uploadFile2?type=1`} 
	                          onAfterSubmit={ this.handleAfterSubmit } 
	                          onSubmit={this.handleSubmit}> 
							  	<FormItem name="file">
	        						<Upload placeholder="上传"  />
							  	</FormItem>	
							  	<Button type="primary" htmlType="submit">提交</Button>				
							</Form>
	            		</Col>
	            	</Row>
	            	<Divider/>
	            	<Divider/>
	                <Row>
	                    <Col size={24}>
	                        <PagiTable dataSource={this.state.tableMap} 
	                         columns={ columns }
	                        pageIndex={ this.state.tableIndex }
	 					    pageSize={ this.state.tableSize } pageTotal={ this.state.tableCount} 
	                        onChange={this.handleOnChange}>   
	                        </PagiTable>                   
	                    </Col>
	                </Row>
	                <Divider/>
	            	<Divider/>
	                <Row>
	            		<Col size={24}>
	            			<h5>FTP服务文件上传下载管理</h5>
	            		</Col>
	            	</Row>
	            	<Divider/>
	            	<Divider/>
	            	<Row>
	            		<Col size={8}>
	            			<Form method="post"
	                    	  type="inline"
	                          async={ true }
	                          action={ `${context.contextPath}/upAndDown/getList?type=0&index=1&size=`+this.state.tableSize} 
	                          onAfterSubmit={ this.handleSearchSubmit1 }
	                          > 
							  	<FormItem>
		                            <Label>文件名称:</Label>
									<Input name="fileName" placeholder="请输入文件名称" />
	                        	</FormItem>	
							  	<Button type="primary" htmlType="submit">搜索</Button>				
							</Form>
	            		</Col>
	            		<Col size={8}>
	            		</Col>
	            		<Col size={8}>
							 <Form method="post"
	                    	  type="inline"
	                          async={ true }
	                          enctype="multipart/form-data"
	                          action={ `${context.contextPath}/upAndDown/uploadFile2?type=0`} 
	                          onAfterSubmit={ this.handleAfterSubmit1 }
	                          onSubmit={this.handleSubmit}> 
							  	<FormItem name="file">
	        						<Upload placeholder="上传"  />
							  	</FormItem>	
							  	<Button type="primary" htmlType="submit">提交</Button>				
							</Form>
	            		</Col>
	            	</Row>
	            	<Divider/>
	            	<Divider/>
	                <Row>
	                    <Col size={24}>
	                        <PagiTable dataSource={this.state.tableMap1} 
	                         columns={ columns1 }
	                        pageIndex={ this.state.tableIndex }
	 					    pageSize={ this.state.tableSize } pageTotal={ this.state.tableCount1} 
	                        onChange={this.handleOnChange1}>   
	                        </PagiTable>                   
	                    </Col>
	                </Row>
				</Container>
            </Page>
        );
    }
}
export { TableList };
export default TableList;