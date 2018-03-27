import React, { Component } from 'react';
import { Page, Divider,Table, Input, Button, Container, Column, Icon } from 'epm-ui';
import { Guide } from '../components';

const page = {
  title: "功能引导使用说明"
};

const tableGuideData = [
	{
		"name":"PAGENAME",	
		"type":"varchar",
		"length":"225",
		"isNull":"否",
		"description":"需要添加引导功能页面的名称"
	},
	{
		"name":"GUIDENAME",	
		"type":"varchar",
		"length":"225",
		"isNull":"否",
		"description":"引导内容的名字，即div的id"
	},
	{
		"name":"GUIDEDESC",	
		"type":"varchar",
		"length":"225",
		"isNull":"否",
		"description":"引导内容的描述"
	},
	{
		"name":"GUIDESTEP",	
		"type":"varchar",
		"length":"20",
		"isNull":"否",
		"description":"引导内容的步骤,即第几步出现"
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
		"pageName":"guide",	
		"guideName":"input",
		"guideDesc":"通过鼠标或键盘输入内容，是最基础的表单域的包装。用于搜集用户信息的标签",
		"guideStep":"1"
	}
];


const tableColumns = [
	{
      "title": "PAGENAME",
      "key": "pageName"
    },
    {
      "title": "GUIDENAME",
      "key": "guideName"
    },
    {
      "title": "GUIDEDESC",
      "key": "guideDesc"
    },
    {
      "title": "GUIDESTEP",
      "key": "guideStep"
    }
];

const tableData02 = [
	{
		"id":"input",
		"description":"通过鼠标或键盘输入内容，是最基础的表单域的包装。用于搜集用户信息的标签"
	}
];


const tableColumns02 = [
	{
      "title": 'id',
      "key": "id"
    },
    {
      "title": 'description',
      "key": "description"
    }
];

class toolClass extends Component {

	render() {
		return (
        	<Page>
        		<Container type="fluid">
					<h1>{ page.title }</h1>
					<Divider />
					<h4>1.功能引导使用说明</h4>
					<h5>更好地介绍网站和功能并引导使用者</h5>
					<Divider />
					<h4>2.使用步骤</h4>
					<h5>(1).在数据库中建一张关于引导页面的表(详细介绍见4.数据库数据存储字段)</h5>
					<h5>(2).在文件头部import处导入Guide和 popup</h5>
					<h5>&nbsp;&nbsp;&nbsp;&nbsp;Guide是自定义组件,需要将frontend/components/guide/guide.jsx引入自己的项目中.<br/> </h5>
					<h5>&nbsp;&nbsp;&nbsp;&nbsp;在frontend/components/index.jsx导入和导出.<br/> </h5>
					<h5>&nbsp;&nbsp;&nbsp;&nbsp;页面写入以下两段代码</h5>
					<pre><code>
						<h5>&nbsp;&nbsp;&nbsp;&nbsp;import &#123; popup &#125; from 'epm-ui';<br/></h5>
						<h5>&nbsp;&nbsp;&nbsp;&nbsp;import &#123; Guide &#125; from '../components';</h5>
					</code></pre>
					<h5>(3).在需要使用功能引导的组件处添加div,并设置id属性</h5>
					<h5>(4).在页面添加一个onClick事件</h5>
					<h5>(5).onClick事件的功能是获取引导数据并在页面引入Guide组件</h5>
					<Divider />
					<h4>3.代码示例</h4>
					<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
						<pre><code>
							<h5>1.文件引入：<br/></h5>
							<h5>import &#123; popup, Button, Input, Page &#125; from 'epm-ui';<br/></h5>
							<h5>import &#123; Guide &#125; from '../components';</h5>
							<h5>2.render()：<br/></h5>
							<h5>&lt;Page&gt;</h5>
							<h5>&nbsp;&nbsp;&lt;div id = "input" /&gt; &lt;Input type=&quot;url&quot; placeholder=&quot;请输入 url 地址&quot; /&gt; &lt;/div&gt;</h5>
							<h5>&nbsp;&nbsp;&lt;Button type="icon" onClick = { this.showGuide } &gt; &lt;Icon icon="life-saver" /&gt; &lt;/Button&gt;</h5>
							<h5>&lt;/Page&gt;</h5>
						</code></pre>
						
		         		<div>
			         		<pre><code>
			         			<h5>3.点击事件：<br/></h5>
				         		<h5>showGuide( event ) = &#123; <br/></h5>
				         		<h5>&nbsp;&nbsp;&nbsp;&nbsp;fetch( `$&#123;context.contextPath&#125;/Guide/GuideInfo`,  &#123; credentials:'include', method: 'POST', <br/></h5>
				         		<h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	headers: &#123; 'Content-Type': 'application/x-www-form-urlencoded', &#125;, <br/></h5>
				         		<h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		body: &quot;pageName=guide&quot;&#125;  )   <br/></h5>
				         		<h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	.then( ( data ) =>  popup( &lt;Guide dataSource=&#123; data &#125; /&gt; )); <br/></h5>
				         		<h5>&#125;</h5>
						  	</code></pre>
			         	</div>
			         	<Divider />
			         	<div>
			         		<h5>4.注意：</h5>
			         		<pre><code>
				         		<h5>showGuide( event ) = &#123; <br/></h5>  
				         				<h5>&nbsp;&nbsp;&nbsp;&nbsp;写请求后台的方法，参数是当前页面名称；<br/></h5>
				         				<h5>&nbsp;&nbsp;&nbsp;&nbsp;获得数据后，页面加入Guide组件,即popup( &lt;Guide dataSource=&#123; data &#125; /&gt;<br/></h5>
				         			<h5>&#125;</h5>
						  	</code></pre>
			         	</div>
					</div>
					
	           		<Divider />
	           		<h4>4.数据库数据存储字段</h4>
	           		<h5>(1).表名：MS_GUIDEINFO</h5>
	           		<h5>(2).表结构</h5>
	           		<Table dataSource={tableGuideData} columns={ tableGuideColumns } />
	           		<h5>(3).表数据</h5>
	           		<Table dataSource={ tableData } columns={ tableColumns } />
	           		<h5>(4).sql语句</h5>
	           		SELECT T.GUIDENAME id, T.GUIDEDESC description FROM MS_GUIDEINFO T WHERE T.PAGENAME = 'guide' ORDER BY GUIDESTEP
	           		<Divider />
	           		<h4>5.注意事项</h4>
	           		<h5>(1).div的id要与数据库中GUIDENAME相同</h5>
	           		<h5>(2).PAGENAME要唯一</h5>
	           		<h5>(3).引导数据格式定义</h5>
	           		<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
	           			<div>
			         		<pre><code>   		
				         		<h5>const dataSource = [  <br/></h5>
				         		<h5>&nbsp;&nbsp;&nbsp;&nbsp;	&#123; <br/></h5>
				         		<h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		id: &quot;input&quot;, <br/></h5>
				         		<h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		description: &quot;通过鼠标或键盘输入内容，是最基础的表单域的包装。用于搜集用户信息的标签&quot;<br/></h5>
				         		<h5>&nbsp;&nbsp;&nbsp;&nbsp;	&#125; <br/></h5>
				         		<h5>];  <br/></h5>
						  		</code></pre>
						  	</div>
			         </div>
			        <h5>(4).符合条件的表数据</h5>
			        <Table dataSource={ tableData02 } columns={ tableColumns02 } />
				</Container>	
        	</Page>
    );
  }

}

toolClass.epmUIPage = page;

export default toolClass;
export { toolClass };