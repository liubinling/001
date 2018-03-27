import React, { Component } from 'react';
import { Page, Divider,Table, Input, Button, Container, Column } from 'epm-ui';

const page = {
  title: "组件账期使用说明"
};

const tableGuideData = [
	{
		"name":"MODULE_ID",	
		"type":"varchar",
		"length":"100",
		"isNull":"否",
		"description":"添加账期的组件ID"
	},
	{
		"name":"MODULE_NAME",	
		"type":"varchar",
		"length":"225",
		"isNull":"否",
		"description":"添加账期的组件名称"
	},
	{
		"name":"DATE_TYPE",	
		"type":"varchar",
		"length":"2",
		"isNull":"否",
		"description":"组件账期类型(D/M:日/月)"
	},
	{
		"name":"DATE_VALUE",	
		"type":"varchar",
		"length":"100",
		"isNull":"否",
		"description":"组件账期"
	}
];


const tableGuideColumns = [
	{
      "title": "名称",
      "key": "name"
    },
    {
      "title": "类型",
      "key": "type"
    },
    {
      "title": "长度",
      "key": "length"
    },
    {
      "title": "允许空值",
      "key": "isNull"
    },
    {
      "title": "注释",
      "key": "description"
    }
];

const tableData = [
	{
		"moduleId":"terminal_day",	
		"moduleName":"终端运营(日)",
		"dateType":"D",
		"dateValue":"2017-06-01"
	}
];


const tableColumns = [
	{
      "title": "MODULE_ID",
      "key": "moduleId"
    },
    {
      "title": "MODULE_NAME",
      "key": "moduleName"
    },
    {
      "title": "DATE_TYPE",
      "key": "dateType"
    },
    {
      "title": "DATE_VALUE",
      "key": "dateValue"
    }
];

const normalData = [
	{
		"parameter":"moduleId",	
		"explain":"组件ID",
		"paramType":"String",
		"dataType":"String",
		"dataEg":"20170101"
	}
];


const normalColumns = [
	{
      "title": "参数",
      "key": "parameter"
    },
    {
      "title": "参数说明",
      "key": "explain"
    },
    {
      "title": "参数类型",
      "key": "paramType"
    },
    {
      "title": "返回值类型",
      "key": "dataType"
    },
    {
      "title": "返回值示例",
      "key": "dataEg"
    }
];

const dashData = [
	{
		"parameter":"moduleId",	
		"explain":"组件ID",
		"paramType":"String",
		"dataType":"String",
		"dataEg":"2017-01-01"
	}
];


const dashColumns = [
	{
      "title": "参数",
      "key": "parameter"
    },
    {
      "title": "参数说明",
      "key": "explain"
    },
    {
      "title": "参数类型",
      "key": "paramType"
    },
    {
      "title": "返回值类型",
      "key": "dataType"
    },
    {
      "title": "返回值示例",
      "key": "dataEg"
    }
];

const slashData = [
	{
		"parameter":"moduleId",	
		"explain":"组件ID",
		"paramType":"String",
		"dataType":"String",
		"dataEg":"2017/01/01"
	}
];


const slashColumns = [
	{
      "title": "参数",
      "key": "parameter"
    },
    {
      "title": "参数说明",
      "key": "explain"
    },
    {
      "title": "参数类型",
      "key": "paramType"
    },
    {
      "title": "返回值类型",
      "key": "dataType"
    },
    {
      "title": "返回值示例",
      "key": "dataEg"
    }
];
class toolClass extends Component {
	render() {
		return (
        	<Page>
        		<Container type="fluid">
					<h1>{ page.title }</h1>
					<Divider />
					<h4>1.账期工具使用</h4>
					<h5>调用DateUtils类里面的方法</h5>
					<Divider />
					<h4>2.账期工具方法说明</h4>
					<h5>(1).调用getModuleDate方法：<br/></h5>
					<h5>代码示例</h5>
					<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
						<pre><code>
							<h5>String moduleDate = DateUtils.getModuleDate(moduleId);<br/></h5>
						</code></pre>
					</div>
					<Table dataSource={ normalData } columns={ normalColumns } />
	           		<Divider />
	           		<h5>(2).调用getModuleDateDash方法：<br/></h5>
					<h5>代码示例</h5>
					<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
						<pre><code>
							<h5>String moduleDate = DateUtils.getModuleDateDash(moduleId);<br/></h5>
						</code></pre>
					</div>
					<Table dataSource={ dashData } columns={ dashColumns } />
	           		<Divider />
	           		<h5>(3).调用getModuleDateSlash方法：<br/></h5>
					<h5>代码示例</h5>
					<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
						<pre><code>
							<h5>String moduleDate = DateUtils.getModuleDateSlash(moduleId);<br/></h5>
						</code></pre>
					</div>
					<Table dataSource={ slashData } columns={ slashColumns } />
	           		<Divider />
	           		<h4>3.数据库数据存储字段</h4>
	           		<h5>(1).表名:MS_MODULE_DATE</h5>
	           		<h5>(2).表结构</h5>
	           		<Table dataSource={tableGuideData} columns={ tableGuideColumns } />
	           		<h5>(3).表数据</h5>
	           		<Table dataSource={ tableData } columns={ tableColumns } />
	           		<Divider />
				</Container>	
        	</Page>
    );
  }

}

toolClass.epmUIPage = page;

export default toolClass;
export { toolClass };