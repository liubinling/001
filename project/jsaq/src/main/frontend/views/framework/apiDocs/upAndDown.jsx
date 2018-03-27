import React, { Component } from 'react';
import { Page, Divider,Table} from 'epm-ui';

const page = {
  title: "上传下载"
};
const columns = [
    {
      "title": "参数",
      "key": "param"
    },
    {
      "title": "说明",
      "key": "explain"
    },
    {
      "title": "类型",
      "key": "type"
    },
    {
      "title": "返回类型",
      "key": "returnType"
    }
];
const dataSource1 = [
  {
    "param": "file",
    "explain": "上传文件",
    "type": "File",
    "returnType": "boolean"
  },
   {
    "param": "remoteDir",
    "explain": "上传目录",
    "type": "String",
    "returnType": "boolean"
  }
];
const dataSource2 = [
  {
    "param": "remotePath",
    "explain": "FTP服务器上的相对路径",
    "type": "String",
    "returnType": "boolean"
  },
   {
    "param": "fileName",
    "explain": "数据库生成的临时文件名",
    "type": "String",
    "returnType": "boolean"
  },
  {
    "param": "realfileName",
    "explain": "文件名",
    "type": "String",
    "returnType": "boolean"
  },
  {
    "param": "request",
    "explain": "HttpServletRequest对象",
    "type": "HttpServletRequest",
    "returnType": "boolean"
  },
  {
    "param": "response",
    "explain": "HttpServletResponse对象",
    "type": "HttpServletResponse",
    "returnType": "boolean"
  }
];
const dataSource3 = [
  {
    "param": "remotePath",
    "explain": "FTP服务器上的相对路径",
    "type": "String",
    "returnType": "boolean"
  },
   {
    "param": "fileName",
    "explain": "要删除的文件名",
    "type": "String",
    "returnType": "boolean"
  }
];
const dataSource4 = [
  {
    "param": "file",
    "explain": "上传文件",
    "type": "File",
    "returnType": "boolean"
  },
   {
    "param": "directory",
    "explain": "上传目录",
    "type": "String",
    "returnType": "boolean"
  }
];
const dataSource5 = [
  {
    "param": "remotedir",
    "explain": "SFTP服务器上的相对路径",
    "type": "String",
    "returnType": "boolean"
  },
   {
    "param": "downloadFile",
    "explain": "数据库生成的临时文件名",
    "type": "String",
    "returnType": "boolean"
  },
   {
    "param": "realfileName",
    "explain": "文件名",
    "type": "String",
    "returnType": "boolean"
  },
   {
    "param": "request",
    "explain": "HttpServletRequest对象",
    "type": "HttpServletRequest",
    "returnType": "boolean"
  },
   {
    "param": "response",
    "explain": "HttpServletResponse对象",
    "type": "HttpServletResponse",
    "returnType": "boolean"
  }
];
const dataSource6 = [
  {
    "param": "remotedir",
    "explain": "SFTP服务器上的相对路径",
    "type": "String",
    "returnType": "boolean"
  },
   {
    "param": "fileName",
    "explain": "要删除的文件名",
    "type": "String",
    "returnType": "boolean"
  }
];
class upAndDown extends Component {

  render() {
    return (
        <Page>
          <h1>{ page.title }</h1>
          <Divider />
          <h4>上传下载使用说明</h4>
          <h5>上传下载分为ftp服务器上传下载和sftp服务器上传下载</h5>
          <h5>ftp服务器或sftp服务器ip、端口号、用户名、密码需要在system-setting.properties文件中配置</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
      	  <h5>my.ftp.ip=ftp服务器ip</h5>
		  <h5>my.ftp.port=ftp服务器端口号</h5>
		  <h5>my.ftp.username=ftp服务器用户名</h5>
		  <h5>my.ftp.password=ftp服务器密码</h5>
      	  <h5>my.sftp.ip=sftp服务器ip</h5>
		  <h5>my.sftp.port=sftp服务器端口号</h5>
		  <h5>my.sftp.username=sftp服务器用户名</h5>
		  <h5>my.sftp.password=sftp服务器密码</h5>
		  </div>
          <Divider />
          <h4>ftp服务器上传下载</h4>
          <h4>upload方法</h4>
          <h5>ftp服务器上传</h5>
           <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>boolean b=FtpUpAndDownUtils.upload(file,remoteDir)</h5>
          </div>
           <Divider />
           <Table dataSource={dataSource1} columns={columns}/> 
	        <Divider />
	         <Divider />
          <h4>downFile方法</h4>
          <h5>ftp服务器下载</h5>
           <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>boolean b=FtpUpAndDownUtils.downFile(remotePath,fileName,realfileName,request,response)</h5>
          </div>
          <Divider />
           <Table dataSource={dataSource2} columns={columns}/> 
	        <Divider />
	         <Divider />
          <h4>deleteFtpFile方法</h4>
          <h5>删除ftp服务器文件</h5>
           <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>boolean b=FtpUpAndDownUtils.deleteFtpFile(remotePath,fileName)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource3} columns={columns}/>
          <Divider />
           <Divider />
           <h4>sftp服务器上传下载</h4>
          <h4>prepareUpload方法</h4>
          <h5>sftp服务器上传</h5>
           <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>boolean b=SftpUpAndDownUtils.upload(file,directory)</h5>
          </div>
           <Divider />
           <Table dataSource={dataSource4} columns={columns}/>
	        <Divider />
	         <Divider />
          <h4>download方法</h4>
          <h5>sftp服务器下载</h5>
           <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>boolean b=SftpUpAndDownUtils.download(remotedir,downloadFile,realfileName,request,response)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource5} columns={columns}/>
	        <Divider />
	         <Divider />
          <h4>DeleteFiles方法</h4>
          <h5>删除sftp服务器文件</h5>
           <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>boolean b=SftpUpAndDownUtils.DeleteFiles(remotedir,fileName)</h5>
          </div>
          <Divider />
           <Table dataSource={dataSource6} columns={columns}/>
          <Divider />
        </Page>
    );
  }

}

upAndDown.epmUIPage = page;

export default upAndDown;
export { upAndDown };