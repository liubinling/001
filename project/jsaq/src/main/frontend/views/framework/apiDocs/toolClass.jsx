import React, { Component } from 'react';
import { Page, Divider,Table} from 'epm-ui';

const page = {
  title: "工具类"
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
    "param": "req",
    "explain": "HttpServletRequest对象",
    "type": "HttpServletRequest",
    "returnType": "Userinfo"
  }
];
const dataSource2 = [
  {
    "param": "req",
    "explain": "HttpServletRequest对象",
    "type": "HttpServletRequest",
    "returnType": "String"
  }
];
const dataSource3 = [
  {
    "param": "loginId",
    "explain": "登录用户ID",
    "type": "String",
    "returnType": "Userinfo"
  }
];
const dataSource4 = [
  {
    "param": "loginId",
    "explain": "登录用户ID",
    "type": "String",
    "returnType": "String"
  }
];
const dataSource5 = [
  {
    "param": "fileName",
    "explain": "property文件名",
    "type": "String",
    "returnType": "String"
  },
   {
    "param": "key",
    "explain": "字段",
    "type": "String",
    "returnType": "String"
  }
];
const dataSource6 = [
  {
    "param": "value",
    "explain": "要判断是否为空的字符串",
    "type": "String",
    "returnType": "boolean"
  }
];
const dataSource7 = [
  {
    "param": "array",
    "explain": "要判断是否为空的数组",
    "type": "T[]",
    "returnType": "boolean"
  }
];
const dataSource8 = [
  {
    "param": "list",
    "explain": "要判断是否为空的list",
    "type": "List",
    "returnType": "boolean"
  }
];
const dataSource9 = [
  {
    "param": "value",
    "explain": "要判断是否为非空的字符串",
    "type": "String",
    "returnType": "boolean"
  }
];
const dataSource10 = [
  {
    "param": "array",
    "explain": "要判断是否为非空的数组",
    "type": "T[]",
    "returnType": "boolean"
  }
];
const dataSource11 = [
  {
    "param": "list",
    "explain": "要判断是否为非空的list",
    "type": "List",
    "returnType": "boolean"
  }
];
const dataSource12 = [
  {
    "param": "obj",
    "explain": "要转换成JSON格式输出的Java对象",
    "type": "Object",
    "returnType": "String"
  }
];
const dataSource13 = [
  {
    "param": "obj",
    "explain": "要转换成JSON格式输出的JavaBean对象",
    "type": "Object",
    "returnType": "String"
  }
];
const dataSource14 = [
  {
    "param": "list",
    "explain": "要转换成JSON格式输出的List",
    "type": "List",
    "returnType": "String"
  }
];
const dataSource15 = [
  {
    "param": "array",
    "explain": "要转换成JSON格式输出的数组",
    "type": "Object[]",
    "returnType": "String"
  }
];
const dataSource16 = [
  {
    "param": "map",
    "explain": "要转换成JSON格式输出的Map",
    "type": "Map",
    "returnType": "String"
  }
];
const dataSource17 = [
  {
    "param": "set",
    "explain": "要转换成JSON格式输出的Set",
    "type": "Set",
    "returnType": "String"
  }
];
const dataSource18 = [
  {
    "param": "s",
    "explain": "要转换成JSON格式输出的String",
    "type": "String",
    "returnType": "String"
  }
];
const dataSource19 = [
  {
    "param": "acctDate",
    "explain": "日账期",
    "type": "String",
    "returnType": "String"
  },
  {
    "param": "dateType",
    "explain": "D",
    "type": "String",
    "returnType": "String"
  }
];
const dataSource20 = [
  {
    "param": "acctDate",
    "explain": "账期",
    "type": "String",
    "returnType": "String"
  },
  {
    "param": "dateType",
    "explain": "D/M",
    "type": "String",
    "returnType": "String"
  }
];
const dataSource21 = [
  {
    "param": "--",
    "explain": "--",
    "type": "--",
    "returnType": "String"
  }
];
class toolClass extends Component {

  render() {
    return (
        <Page>
          <h1>{ page.title }</h1>
          <Divider />
          <h3><b>工具类的使用</b></h3>
          <h5>调用MicroUtils类里面的方法</h5>
          <Divider />
          <h3><b>工具类中方法说明</b></h3>
          <Divider />
          <h3><b>findCurrentUserinfo方法</b></h3>
          <h5>取得当前登录用户对象</h5>
           <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>Userinfo userInfo=MicroUtils.findCurrentUserinfo(req)</h5>
          </div>
           <Divider />
           <Table dataSource={dataSource1} columns={columns}/> 
	       <Divider />
	       <Divider />
          <h3><b>findCurrentLoginId方法</b></h3>
          <h5>取得当前登录用户ID</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String loginId=MicroUtils.findCurrentLoginId(req)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource2} columns={columns}/> 
	       <Divider />
	        <Divider />
          <h3><b>findUserByLoginId方法</b></h3>
          <h5>用户信息查新</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>Userinfo userInfo=MicroUtils.findUserByLoginId(loginId)</h5>
          </div>
         <Divider />
          <Table dataSource={dataSource3} columns={columns}/> 
	       <Divider />
	       <Divider />
          <h3><b>findTenantIdByloginId方法</b></h3>
          <h5>查询用户的租户ID</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String tenantId=MicroUtils.findTenantIdByloginId(loginId)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource4} columns={columns}/> 
	       <Divider />
	        <Divider />
          <h3><b>getRegionNo方法</b></h3>
          <h5>查询组织机构ID</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String reginId=MicroUtils.getRegionNo(req)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource2} columns={columns}/> 
	       <Divider />
	         <Divider />
          <h3><b>getRegionDesc方法</b></h3>
          <h5>查询组织机构名称</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String reginDesc=MicroUtils.getRegionDesc(req)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource2} columns={columns}/> 
	         <Divider />
	         <Divider />
          <h3><b>getProperty方法</b></h3>
          <h5>获取指定property文件中的某个字段</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String value=MicroUtils.getProperty(fileName,key)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource5} columns={columns}/> 
	       <Divider />
	        <Divider />
          <h3><b>isEmpty方法</b></h3>
          <h5>判断字符串是否为空</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>boolean b=MicroUtils.isEmpty(value)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource6} columns={columns}/> 
	       <Divider />
	         <Divider />
          <h3><b>isEmpty方法</b></h3>
          <h5>判断数组是否为空</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>boolean b=MicroUtils.isEmpty(array)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource7} columns={columns}/> 
	       <Divider />
	         <Divider />
          <h3><b>isEmpty方法</b></h3>
          <h5>判断list是否为空</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>boolean b=MicroUtils.isEmpty(list)</h5>
          </div>
          <Divider />
           <Table dataSource={dataSource8} columns={columns}/> 
	       <Divider />
	        <Divider />
          <h3><b>isNotEmpty方法</b></h3>
          <h5>判断字符串是否为非空</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>boolean b=MicroUtils.isNotEmpty(value)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource9} columns={columns}/> 
	         <Divider />
	         <Divider />
          <h3><b>isNotEmpty方法</b></h3>
          <h5>判断数组是否为空</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>boolean b=MicroUtils.isNotEmpty(array)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource10} columns={columns}/> 
	       <Divider />
	         <Divider />
          <h3><b>isNotEmpty方法</b></h3>
          <h5>判断list是否为空</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>boolean b=MicroUtils.isNotEmpty(list)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource11} columns={columns}/> 
	       <Divider />
	        <Divider />
          <h3><b>object2json方法</b></h3>
          <h5>用来把Java对象转换成JSON格式输出</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String str=MicroUtils.object2json(obj)</h5>
          </div>
          <Divider />
           <Table dataSource={dataSource12} columns={columns}/>
	       <Divider />
	         <Divider />
          <h3><b>bean2json方法</b></h3>
          <h5>任意JavaBean转换成json</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String str=MicroUtils.bean2json(bean)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource13} columns={columns}/>
	       <Divider />
	         <Divider />
          <h3><b>list2json方法</b></h3>
          <h5>list转换成json</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String str=MicroUtils.list2json(list)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource14} columns={columns}/>
	       <Divider />
	         <Divider />
          <h3><b>array2json方法</b></h3>
          <h5>数组转换成json</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String str=MicroUtils.array2json(array)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource15} columns={columns}/>
	       <Divider />
	         <Divider />
          <h3><b>map2json方法</b></h3>
          <h5>map转换成json</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String str=MicroUtils.map2json(map)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource16} columns={columns}/>
	       <Divider />
	         <Divider />
          <h3><b>set2json方法</b></h3>
          <h5>set转换成json</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String str=MicroUtils.set2json(set)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource17} columns={columns}/>
	       <Divider />
	        <Divider />
          <h3><b>string2json方法</b></h3>
          <h5>String转换成json</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String str=MicroUtils.string2json(s)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource18} columns={columns}/>
	       <Divider />
	        <Divider />
          <h3><b>getThisMonthFirstDay方法</b></h3>
          <h5>获取当当前账期月第一天</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String str=MicroUtils.getThisMonthFirstDay(acctDate,dateType)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource19} columns={columns}/>
	       <Divider />
	       <Divider />
          <h3><b>getLastMonthFirstDay方法</b></h3>
          <h5>获取上个月第一天</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String str=MicroUtils.getLastMonthFirstDay(acctDate,dateType)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource20} columns={columns}/>
	       <Divider />
	        <Divider />
          <h3><b>getLastMonthLastDay方法</b></h3>
          <h5>获取上个月最后一天</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String str=MicroUtils.getLastMonthLastDay(acctDate,dateType)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource20} columns={columns}/>
	       <Divider />
	       <Divider />
          <h3><b>getLastYear方法</b></h3>
          <h5>获取去年年份</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String str=MicroUtils.getLastYear(acctDate,dateType)</h5>
          </div>
          <Divider />
          <Table dataSource={dataSource20} columns={columns}/>
	       <Divider />
	       <Divider />
          <h3><b>createNewUUID方法</b></h3>
          <h5>生成简化UUID，不含“-”</h5>
          <Divider />
          <h5>代码示例</h5>
          <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
          <h5>String str=MicroUtils.createNewUUID()</h5>
          </div>
         <Divider />
         <Table dataSource={dataSource21} columns={columns}/>
          <Divider />
        </Page>
    );
  }

}

toolClass.epmUIPage = page;

export default toolClass;
export { toolClass };