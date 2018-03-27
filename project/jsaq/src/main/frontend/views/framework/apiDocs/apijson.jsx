import React, { Component } from 'react';
import { Page, Divider, Card, CardBody, Table ,Row,Col} from 'epm-ui';

const page = {
  title: "ApiJson"
};

class ApiJsonPage extends Component {
  render() {
	  const codeExample1 = `
APIJSON是一种JSON传输结构协议。
客户端可以定义任何JSON结构去向服务端发起请求，服务端就会返回对应结构的JSON字符串，所求即所得。
一次请求任意结构任意数据，方便灵活，不需要专门接口或多次请求。
支持增删改查、模糊搜索、远程函数调用等。还能去除重复数据，节省流量提高速度！
从此HTTP传输JSON数据没有接口，更不需要文档！
客户端再也不用和服务端沟通接口或文档问题了！再也不会被文档各种错误坑了！
服务端再也不用为了兼容旧版客户端写新版接口和文档了！再也不会被客户端随时随地没完没了地烦了！
	`.trim();

	 const codeExample2 = `
 					{
	"User":{
	}
}
	`.trim();
	const codeExample3 = `
 					{
  "[]":{
    "count":3,
    "User":{
      "@column":"id,name"
    }
  }
}
	`.trim();
	const codeExample4 = `
 					{
  "[]":{                             //请求一个Array
    "page":0,                        //Array条件
    "count":2,
    "User":{                         //请求一个名为User的Table
      "sex":0,                       //Object条件
      "@column":"id,name,head"       //指定返回字段
    },
    "Moment":{
      "userId@":"/User/id"           //缺省依赖路径，从同级Object的路径开始
    },
    "Comment[]":{                    //请求一个名为Comment的Array
      "count":2,
      "Comment":{
        "momentId@":"[]/Moment/id"   //完整依赖路径
      }
    }
  }
}
	`.trim();
	const codeExample5 = `
 					1.base_url指基地址，一般是顶级域名，其它分支url都是在base_url后扩展。如base_url:http://www.google.com/ ，对应的GET分支url:http://www.google.com/get/ ，下同。
2.请求中的 / 需要转义。JSONRequest.java已经用URLEncoder.encode转义，不需要再写；但如果是浏览器或Postman等直接输入url/request，需要把request中的所有 / 都改成 %252F ，下同。
3.status，指返回结果中的状态码，200表示成功，其它都是错误码，值全部都是HTTP标准状态码。下同。
4.message，指返回结果中的状态信息，对成功结果或错误原因的详细说明。下同。
5.status和message总是在返回结果的同一层级成对出现。对所有请求的返回结果都会在最外层有一对总结式status和message。对非GET类请求，返回结果里面的每个JSONObject里都会有一对status和message说明这个JSONObject的状态。下同。
6.id等字段对应的值仅供说明，不一定是数据库里存在的，请求里用的是真实存在的值。下同。
	`.trim();
	const codeExample6 = `
 	1.TableName指要查询的table的名称字符串。第一个字符为大写字母，剩下的字符要符合英语字母、数字、下划线中的任何一种。对应的值为内部所传字段符合对应Table的JSONObject，结构是{...}
2."tag":tag 后面的tag是非GET、HEAD请求中匹配请求的JSON结构的key，一般是要查询的table的名称，由服务端Request表中指定。
3.非GET、HEAD请求，其对应的 方法、tag、结构 必须和 服务端Request表中指定的 一一对应，否则请求将不被通过。
4.POST_GET与GET、POST_HEAD与HEAD分别为同类方法，请求方式不同但返回结果相同。下同。
5.在HTTP通信中，GET、HEAD方法一般用HTTP GET请求，其它一般用HTTP POST请求。下同。
	`.trim();
	const codeExample7 = `
 	配置相关的实体。
	`.trim();
	const codeExample8 = `
 	配置数据库相关信息：数据库连接URL、用户名、密码、数据库驱动类型。
	`.trim();
	
	const table222 = `
 				base_url/lowercase_table_name?key0=value0&key1=value1...&currentUserId=100&loginPassword=1234其中currentUserId和loginPassword只在请求部分接口时需要
	`.trim();
	const table223 = `
 				base_url/{TableName0:{key0:value0, key1:value1 ...}, TableName1:{...}..., currentUserId:100, loginPassword:1234}其中currentUserId和loginPassword只在请求部分接口时需要
	`.trim();
	const data21 = [
	  {
	    "line1": "接口传输",
	    "line2": "等服务端编辑接口，然后更新文档，客户端再按照文档编辑请求和解析代码",
	    "line3": "客户端按照自己的需求编辑请求和解析代码。没有接口，更不需要文档！ 客户端再也不用和服务端沟通接口或文档问题了！"
	  },
	  {
	   "line1": "兼容旧版",
	   "line2": "服务端增加新接口，用v2表示第2版接口，然后更新文档",
	   "line3": "什么都不用做！"
	  }
	];

	const columns21 = [
	  {
	    title: '开发流程',
	    key: 'line1'
	  },
	  {
	    title: '传统方式',
	    key: 'line2'
	  },
	  {
	    title: 'APIJSON',
	    key: 'line3'
	  }
	];
	
	const data22 = [
	  {
	    "line221": "要求",
	    "line222": "客户端按照文档在对应url后面拼接键值对",
	    "line223": "客户端按照自己的需求在固定url后拼接JSON"
	  },
	  {
	   "line221": "结构",
	   "line222": table222,
	   "line223": table223
	  },
	  {
	   "line221": "URL",
	   "line222": "不同的请求对应不同的url",
	   "line223": "相同的请求方法(GET，POST等)都用同一个url"
	  },
	  {
	   "line221": "键值对",
	   "line222": "key=value",
	   "line223": "key:value"
	  }
	];

	const columns22 = [
	  {
	    title: '客户端请求',
	    key: 'line221'
	  },
	  {
	    title: '传统方式',
	    key: 'line222'
	  },
	  {
	    title: 'APIJSON',
	    key: 'line223'
	  }
	];
	
	const data23 = [
	  {
	    "line231": "解析和返回",
	    "line232": "取出键值对，把键值对作为条件用预设的的方式去查询数据库，最后封装JSON并返回给客户端",
	    "line233": "把Parser#parse方法的返回值返回给客户端就行"
	  },
	  {
	   "line231": "返回JSON结构的设定方式",
	   "line232": "由服务端设定，客户端不能修改",
	   "line233": "由客户端设定，服务端不能修改"
	  }
	];

	const columns23 = [
	  {
	    title: '服务端操作',
	    key: 'line231'
	  },
	  {
	    title: '传统方式',
	    key: 'line232'
	  },
	  {
	    title: 'APIJSON',
	    key: 'line233'
	  }
	];
	
	const data24 = [
	  {
	    "line241": "查看方式",
	    "line242": "查文档或等请求成功后看log",
	    "line243": "看请求就行，所求即所得。也可以等请求成功后看log"
	  },
	  {
	   "line241": "方法",
	   "line242": "解析JSONObject",
	   "line243": "可以用JSONResponse解析JSONObject或传统方式"
	  }
	];

	const columns24 = [
	  {
	    title: '客户端解析',
	    key: 'line241'
	  },
	  {
	    title: '传统方式',
	    key: 'line242'
	  },
	  {
	    title: 'APIJSON',
	    key: 'line243'
	  }
	];
    return (
        <Page>
        <Divider />
        <h1>{ page.title }</h1>
        <Divider />
	        <a href="#01"><h4>1.简介</h4></a>
	        <a href="#02"><h4>2.对比传统方式</h4></a>
		        <a href="#021"><h5>&nbsp;&nbsp;&nbsp;&nbsp;2.1 开发流程</h5></a>
		        <a href="#022"><h5>&nbsp;&nbsp;&nbsp;&nbsp;2.2 客户端请求</h5></a>
		        <a href="#023"><h5>&nbsp;&nbsp;&nbsp;&nbsp;2.3 服务端操作</h5></a>
		        <a href="#024"><h5>&nbsp;&nbsp;&nbsp;&nbsp;2.4 客户端解析</h5></a>
		        <a href="#025"><h5>&nbsp;&nbsp;&nbsp;&nbsp;2.5 对应不同需求的请求</h5></a>
		        <a href="#026"><h5>&nbsp;&nbsp;&nbsp;&nbsp;2.6 对应不同请求的结果</h5></a>
			<a href="#03"><h4>3.对应关系总览</h4></a>
			<a href="#04"><h4>4.功能符</h4></a>
			<a href="#05"><h4>5.配置说明</h4></a>
		<Divider />
		<h4 name ="01" id ="01">1.简介</h4>
		<Divider line />
		    <pre>
		        <code className="xml">
		          <h5>{ codeExample1 }</h5>
		        </code>
		    </pre>
	    <Divider />
	    <h4>举几个例子:</h4>
	    <h5>查询用户 </h5>
	    	<Card>
			  <CardBody>
			    <div>
			      <p style={ { float: 'left' } }>请求:</p>
			    </div>
			    <Divider clearing line />
			    <p>
				   <pre>
		        	<code className="xml">
		          		<p>{ codeExample2 }</p>
		        	</code>
		    		</pre> 
			    </p>
			  </CardBody>
			</Card>
		<Divider />
		<h5>查询用户列表 </h5>
	    	<Card>
			  <CardBody>
			    <div>
			      <p style={ { float: 'left' } }>请求:</p>
			    </div>
			    <Divider clearing line />
			    <p>
				   <pre>
		        	<code className="xml">
		          		<p>{ codeExample3 }</p>
		        	</code>
		    		</pre> 
			    </p>
			  </CardBody>
			</Card>
		<Divider />
		<h5>查询类似微信朋友圈的动态列表 </h5>
	    	<Card>
			  <CardBody>
			    <div>
			      <p style={ { float: 'left' } }>请求:</p>
			    </div>
			    <Divider clearing line />
			    <p>
				   <pre>
		        	<code className="xml">
		          		<p>{ codeExample4 }</p>
		        	</code>
		    		</pre> 
			    </p>
			  </CardBody>
			</Card>
		<h4 name ="02" id ="02">2.对比传统方式</h4>   
		<Divider line />
		<h5 name ="021" id ="021">2.1 开发流程</h5>  
	    <Table dataSource={ data21 } multiLine={ true } columns={ columns21 } />
	    <Divider />
        <h5 name ="022" id ="022">2.2 客户端请求</h5> 
        <Table dataSource={ data22 }  multiLine={ true } columns={ columns22 } />
        <Divider />
        <h5 name ="023" id ="023">2.3 服务端操作</h5>
        <Table dataSource={ data23 } multiLine={ true } columns={ columns23 } striped={true}/>
        <Divider />
		<h5 name ="024" id ="024">2.4 客户端解析</h5>
		<Table dataSource={ data24 } multiLine={ true } columns={ columns24 } striped={true}/>
		<Divider />
        <h5 name ="025" id ="025">2.5 对应不同需求的请求</h5>
        <table style={{width:'100%',fontSize:'0.875rem'}}>
			<tr>
				<td style={{borderTop:'1px solid #D8DDE6',borderBottom:'1px solid #D8DDE6'}}>
					<p style={{color:'#54698d',padding:'5px'}}>客户端对应不同需求的请求</p>
				</td>
				<td style={{borderTop:'1px solid #D8DDE6',borderBottom:'1px solid #D8DDE6'}}>
					<p style={{color:'#54698d',padding:'5px'}}>传统方式</p>
				</td>
				<td style={{borderTop:'1px solid #D8DDE6',borderBottom:'1px solid #D8DDE6'}}>
					<p style={{color:'#54698d',padding:'5px'}}>APIJSON</p>
				</td>
			</tr>
        	<tr>
        		<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        			<p style={{padding:'5px'}}>User</p>
        		</td>
        		<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        			<p style={{padding:'5px'}}>base_url/get/user?id=1</p>
        		</td>
        		<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        			<p style={{padding:'5px'}}>base_url/apijson/get/&#123;&quot;[]&quot;:&#123;&quot;page&quot;:0, &quot;count&quot;:3, &quot;MS_API_TABLE&quot;:&#123;&quot;pid&quot;:1&#125;&#125;&#125;</p>
        		</td>
        	</tr>
        	<tr>
        		<td style={{borderBottom:'1px solid #D8DDE6'}}>
        			<p style={{padding:'5px'}}>Moment和对应的User</p>
        		</td>
        		<td style={{borderBottom:'1px solid #D8DDE6'}}>
        		  	<p style={{padding:'5px'}}>分两次请求Moment: base_url/get/moment?userId=1 <br/>User: base_url/get/user?id=1</p>
        		</td>
        		<td style={{borderBottom:'1px solid #D8DDE6'}}>
        		    <p style={{padding:'5px'}}>base_url/apijson/get/&#123;&quot;MS_API_TABLE&quot;:&#123;&quot;id&quot;:1&#125;, &quot;MS_MENU_TABLE&quot;:&#123;&quot;id&quot;:1&#125;&#125;</p>
        		</td>
        	</tr>
        	<tr>
        		<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        			<p style={{padding:'5px'}}>User列表</p>
        		</td>
        		<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        			<p style={{padding:'5px'}}>base_url/get/user/list?page=0&count=3&sex=0	</p>
        		</td>
        		<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        		  	<p style={{padding:'5px'}}>base_url/apijson/get/&#123;&quot;[]&quot;:&#123;&quot;page&quot;:0, &quot;count&quot;:3, &quot;MS_MENU_TABLE&quot;:&#123;&quot;pid&quot;:&quot;root&quot;&#125;&#125;&#125;</p>
        		</td>
        	</tr>
        	<tr>
        		<td style={{borderBottom:'1px solid #D8DDE6'}}>
        			<p style={{padding:'5px'}}>Moment列表，每个Moment包括发布者User和前3条Comment</p>
        		</td>
        		<td style={{borderBottom:'1px solid #D8DDE6'}}>
        		  	<p style={{padding:'5px'}}>Moment里必须有User的Object和Comment的Arraybase_url/get/moment/list?page=0&<br/>count=3&commentCount=3</p>
        		</td>
        		<td style={{borderBottom:'1px solid #D8DDE6'}}>
        		    <p style={{padding:'5px'}}>base_url/apijson/get/&#123;&quot;[]&quot;:&#123;&quot;page&quot;:0, &quot;count&quot;:3, &quot;MS_API_TABLE&quot;:&#123;&#125;, <br/>&quot;MS_MENU_TABLE&quot;:&#123;&quot;id@&quot;:&quot;%252FMS_API_TABLE%252Fid&quot;&#125;, <br/>&quot;[]&quot;:&#123;&quot;count&quot;:3, &quot;DOWNLOADLOGS&quot;:&#123;&quot;id@&quot;:&quot;[]%252FMS_API_TABLE%252Fid&quot;&#125;&#125;&#125;&#125;</p>
        		</td>
        	</tr>
        	<tr>
        		<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        			<p style={{padding:'5px'}}>User发布的Moment列表，每个Moment包括发布者User和前3条Comment</p>
        		</td>
        		<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        		  	<p style={{padding:'5px'}}>Moment里必须有User的Object和Comment的<br/>Arraybase_url/get/moment/list?page=0&count=3&commentCount=3&userId=1</p>
        		</td>
        		<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        			<p style={{padding:'5px'}}>有以下几种方法:<br/>
						①把以上请求&quot;MS_API_TABLE&quot;:&#123;&#125;,&quot;MS_MENU_TABLE&quot;:&#123;&quot;id@&quot;:&quot;/MS_API_TABLE/id&quot;&#125;<br/>
						改为&quot;MS_API_TABLE&quot;:&#123;&quot;id&quot;:1&#125;, &quot;MS_MENU_TABLE&quot;:&#123;&quot;id&quot;:1&#125;<br/>
						②或这样省去4条重复数据 base_url/apijson/get/&#123;&quot;MS_MENU_TABLE&quot;:&#123;&quot;id&quot;:1&#125;,<br/>
						&quot;[]&quot;:&#123;&quot;page&quot;:0, &quot;count&quot;:3, &quot;MS_API_TABLE&quot;:&#123;&quot;id&quot;:1&#125;,<br/>
						&quot;[]&quot;:&#123;&quot;count&quot;:3, &quot;DOWNLOADLOGS&quot;:&#123;&quot;id@&quot;:&quot;[]/MS_API_TABLE/id&quot;&#125;&#125;&#125;&#125;<br/>
						③如果MS_MENU_TABLE之前已经获取到了，还可以这样省去所有重复数据<br/>
						base_url/apijson/get/&#123;&quot;[]&quot;:&#123;&quot;page&quot;:0, &quot;count&quot;:3,<br/>
						&quot;MS_API_TABLE&quot;:&#123;&quot;id&quot;:1&#125;, &quot;[]&quot;:&#123;&quot;count&quot;:3,<br/>
						&quot;DOWNLOADLOGS&quot;:&#123;&quot;id@&quot;:&quot;[]/MS_API_TABLE/id&quot;&#125;&#125;&#125;&#125;</p>
        		</td>
        	</tr>
        </table>
		<h5 name ="026" id ="026">2.6 对应不同请求的结果</h5>
		<table style={{width:'100%',fontSize:'0.875rem'}}>
			<tr>
				<td style={{borderTop:'1px solid #D8DDE6',borderBottom:'1px solid #D8DDE6'}}>
				<p style={{color:'#54698d',padding:'5px'}}>服务端对应不同请求的返回结果</p>
				</td>
				<td style={{borderTop:'1px solid #D8DDE6',borderBottom:'1px solid #D8DDE6'}}>
					<p style={{color:'#54698d',padding:'5px'}}>传统方式</p>
				</td>
				<td style={{borderTop:'1px solid #D8DDE6',borderBottom:'1px solid #D8DDE6'}}>
				<p style={{color:'#54698d',padding:'5px'}}>APIJSON</p>
				</td>
			</tr>
			<tr>
				<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
				  	    				<p style={{padding:'5px'}}>User</p>
				</td>
				<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
				  	    				<p style={{padding:'5px'}}>&#123;&quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;, &quot;data&quot;:&#123;&quot;id&quot;:1, &quot;name&quot;:&quot;xxx&quot;...&#125;&#125;</p>
				</td>
				<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
				  	    				<p style={{padding:'5px'}}>&#123;&quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;, &quot;User&quot;:&#123;&quot;id&quot;:1, &quot;name&quot;:&quot;xxx&quot;...&#125;&#125;</p>
				</td>
			</tr>
			<tr>
				<td style={{borderBottom:'1px solid #D8DDE6'}}>
				  	    				<p style={{padding:'5px'}}>Moment和对应的User</p>
				</td>
				<td style={{borderBottom:'1px solid #D8DDE6'}}>
						<p style={{padding:'5px'}}>分别返回两次请求的结果Moment:<br/>
  	    			    &#123;&quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;, &quot;data&quot;:&#123;&quot;id&quot;:1, &quot;name&quot;:&quot;xxx&quot;...&#125;&#125;<br/>
						User: &#123;&quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;, &quot;data&quot;:&#123;&quot;id&quot;:1, &quot;name&quot;:&quot;xxx&quot;...&#125;&#125;</p>
				</td>
				<td style={{borderBottom:'1px solid #D8DDE6'}}>
					  	    		   <p style={{padding:'5px'}}>&#123;&quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;, &quot;Moment&quot;:&#123;&quot;id&quot;:1, &quot;content&quot;:&quot;xxx&quot;...&#125;, &quot;User&quot;:&#123;&quot;id&quot;:1, &quot;name&quot;:&quot;xxx&quot;...&#125;&#125;</p>
				</td>
			</tr>
			<tr>
				<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
				<p style={{padding:'5px'}}>User列表</p>
				</td>
				<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
				<p style={{padding:'5px'}}>&#123;&quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;, &quot;data&quot;:[&#123;&quot;id&quot;:1, &quot;name&quot;:&quot;xxx&quot;...&#125;, &#123;&quot;id&quot;:2...&#125;...]&#125;
  	    				</p>
				</td>
				<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
				<p style={{padding:'5px'}}>&#123;&quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;, &quot;[]&quot;:&#123;&quot;0&quot;:&#123;&quot;User&quot;:&#123;&quot;id&quot;:1, &quot;name&quot;:&quot;xxx&quot;...&#125;&#125;, &quot;1&quot;:&#123;&quot;User&quot;:&#123;&quot;id&quot;:2...&#125;&#125;...&#125;&#125;
  	    				</p>
				</td>
			</tr>
			<tr>
				<td style={{borderBottom:'1px solid #D8DDE6'}}>
					<p style={{padding:'5px'}}>Moment列表，每个Moment包括发布者User和前3条Comment</p>
				</td>
				<td style={{borderBottom:'1px solid #D8DDE6'}}>
					<p style={{padding:'5px'}}>&#123;&quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;, &quot;data&quot;:[&#123;&quot;id&quot;:1, &quot;content&quot;:&quot;xxx&quot;..., &quot;User&quot;:&#123;...&#125;, &quot;Comment&quot;:[...]&#125;, &#123;&quot;id&quot;:2...&#125;...]&#125;
  	    				</p>
				</td>
				<td style={{borderBottom:'1px solid #D8DDE6'}}>
					<p style={{padding:'5px'}}>&#123;&quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;, &quot;[]&quot;:&#123;&quot;0&quot;:&#123;&quot;Moment&quot;:&#123;&quot;id&quot;:1, &quot;content&quot;:&quot;xxx&quot;...&#125;,<br/> &quot;User&quot;:&#123;...&#125;, &quot;[]&quot;:&#123;&quot;0&quot;:&#123;&quot;Comment&quot;:&#123;...&#125;...&#125;&#125;&#125;, &quot;1&quot;:&#123;...&#125;...&#125;&#125;
  	    				</p>
				</td>
			</tr>
			<tr>
				<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
					<p style={{padding:'5px'}}>User发布的Moment列表，每个Moment包括发布者User和前3条Comment</p>
				</td>
				<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
					  	    			<p style={{padding:'5px'}}>&#123;&quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;, &quot;data&quot;:[&#123;&quot;id&quot;:1, &quot;content&quot;:&quot;xxx&quot;..., &quot;User&quot;:&#123;...&#125;, &quot;Comment&quot;:[...]&#125;, &#123;&quot;id&quot;:2...&#125;...]&#125;</p>
				</td>
				<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
				<p style={{padding:'5px'}}>        以上不同请求方法的结果:<br/>
						   ①&#123;&quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;, <br/>
						   &quot;[]&quot;:&#123;&quot;0&quot;:&#123;&quot;User&quot;:&#123;&quot;id&quot;:1, &quot;name&quot;:&quot;xxx&quot;...&#125;, &quot;Moment&quot;:&#123;...&#125;, <br/>
						   &quot;[]&quot;:&#123;&quot;0&quot;:&#123;&quot;Comment&quot;:&#123;...&#125;...&#125;&#125;&#125;, &quot;1&quot;:&#123;...&#125;...&#125;&#125;<br/>
						   ②&#123;&quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;, &quot;User&quot;:&#123;...&#125;, <br/>
						   &quot;[]&quot;:&#123;&quot;0&quot;:&#123;&quot;Moment&quot;:&#123;&quot;id&quot;:1, &quot;content&quot;:&quot;xxx&quot;...&#125;,<br/> 
						   &quot;[]&quot;:&#123;&quot;0&quot;:&#123;&quot;Comment&quot;:&#123;...&#125;...&#125;&#125;&#125;, &quot;1&quot;:&#123;...&#125;...&#125;&#125;<br/>
						   ③&#123;&quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;, <br/>
						   &quot;[]&quot;:&#123;&quot;0&quot;:&#123;&quot;Moment&quot;:&#123;&quot;id&quot;:1, &quot;content&quot;:&quot;xxx&quot;...&#125;, <br/>
						   &quot;[]&quot;:&#123;&quot;0&quot;:&#123;&quot;Comment&quot;:&#123;...&#125;...&#125;&#125;&#125;, &quot;1&quot;:&#123;...&#125;...&#125;&#125;
  	    				</p>
				</td>
			</tr>
		</table>
		
        <pre>
		   <code className="xml">
		        <p>{ codeExample5 }</p>
		   </code>
		</pre> 
		<Divider />
        <h4 name ="03" id ="03">3.请求方法、URL、Request、Response对应关系总览</h4>
        <table style={{width:'100%',fontSize:'0.875rem'}}>
        	<tr>
        	  <td style={{borderTop:'1px solid #D8DDE6',borderBottom:'1px solid #D8DDE6'}}>
        	  <p style={{color:'#54698d',padding:'5px'}}>方法及说明</p>
        	  </td>
        	  <td style={{borderTop:'1px solid #D8DDE6',borderBottom:'1px solid #D8DDE6'}}>
        	    	    				<p style={{color:'#54698d',padding:'5px'}}>URL</p>
        	  </td>
        	  <td style={{borderTop:'1px solid #D8DDE6',borderBottom:'1px solid #D8DDE6'}}>
        	    	    				<p style={{color:'#54698d',padding:'5px'}}>Request</p>
        	  </td>
        	  <td style={{borderTop:'1px solid #D8DDE6',borderBottom:'1px solid #D8DDE6'}}>
        	    	    				<p style={{color:'#54698d',padding:'5px'}}>Response</p>
        	  </td>
        	</tr>
        	<tr>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	    	    				<p style={{padding:'5px'}}>GET：普通获取请求，明文，可用浏览器调试</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	    	    				<p style={{padding:'5px'}}>base_url/get/</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	  	<p style={{padding:'5px'}}>&#123;TableName:&#123;…&#125;&#125;，&#123;…&#125;内为限制条件。<br/>
						例如:获取一个id为1的MS_API_TABLE：<br/>
						&#123;&quot;MS_API_TABLE&quot;:&#123;&quot;id&quot;:1&#125;&#125;</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	  		<p style={{padding:'5px'}}>&#123;TableName:&#123;...&#125;, &quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;&#125;<br/>
						例如:&#123;&quot;MS_API_TABLE&quot;:&#123;&quot;ID&quot;:1,&quot;PID&quot;:&quot;root&quot;,<br/>
						&quot;NAME&quot;:&quot;SDK服务&quot;,&quot;URL&quot;:&quot;&quot;,&quot;ORD&quot;:5&#125;,<br/>
						&quot;status&quot;:200,&quot;message&quot;:&quot;success&quot;&#125;</p>
        	  </td>
        	</tr>
        	<tr>
        	  <td style={{borderBottom:'1px solid #D8DDE6'}}>
        	  <p style={{padding:'5px'}}>HEAD：普通获取数量请求，明文，可用浏览器调试</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6'}}>
        	  <p style={{padding:'5px'}}>base_url/head/</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6'}}>
        	  	<p style={{padding:'5px'}}>&#123;TableName:&#123;…&#125;&#125;，&#123;…&#125;内为限制条件。<br/>
						例如:获取一个id为1的用户所发布的MS_API_TABLE总数：<br/>
						&#123;&quot;MS_API_TABLE&quot;:&#123;&quot;id&quot;:1&#125;&#125;</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6'}}>
        	  	<p style={{padding:'5px'}}>&#123;TableName:&#123;&quot;status&quot;:200, <br/>
							 &quot;message&quot;:&quot;success&quot;, <br/>
							 &quot;count&quot;:10&#125;, <br/>
							&quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;&#125;<br/>
						例如:&#123;&quot;MS_API_TABLE&quot;:&#123;&quot;status&quot;:200,<br/>
						&quot;message&quot;:&quot;success&quot;,&quot;count&quot;:1&#125;,<br/>
						&quot;status&quot;:200,&quot;message&quot;:&quot;success&quot;&#125;</p>
        	  </td>
        	</tr>
        	<tr>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	  <p style={{padding:'5px'}}>POST_GET：安全/私密获取请求，非明文，<br/>用于获取钱包等对安全性要求高的数据</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	  <p style={{padding:'5px'}}>base_url/post_get/</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	  <p style={{padding:'5px'}}>最外层加一个&quot;tag&quot;:tag，其它同GET</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	  <p style={{padding:'5px'}}>同GET</p>
        	  </td>
        	</tr>
        	<tr>
        	  <td style={{borderBottom:'1px solid #D8DDE6'}}>
        	  <p style={{padding:'5px'}}>POST_HEAD：安全/私密获取数量请求，非明文，<br/>用于获取银行卡数量等对安全性要求高的数据</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6'}}>
        	  <p style={{padding:'5px'}}>base_url/post_head/</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6'}}>
        	  <p style={{padding:'5px'}}>最外层加一个&quot;tag&quot;:tag，其它同HEAD</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6'}}>
        	  <p style={{padding:'5px'}}>同HEAD</p>
        	  </td>
        	</tr>
        	<tr>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	  <p style={{padding:'5px'}}>POST：新增数据，非明文</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	  <p style={{padding:'5px'}}>base_url/post/</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	  	<p style={{padding:'5px'}}>&#123;TableName:&#123;…&#125;, &quot;tag&quot;:tag&#125;，&#123;…&#125;中id由服务端生成，<br/>
							客户端不能传。<br/>
							例如:&#123;&quot;MS_API_TABLE&quot;:&#123;&quot;id&quot;:1, &quot;name&quot;:&quot;SDK服务&quot;&#125;, <br/>
							&quot;tag&quot;:&quot;MS_API_TABLE&quot;&#125;</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	  	<p style={{padding:'5px'}}>&#123;TableName:&#123;&quot;status&quot;:200, <br/>
						      &quot;message&quot;:&quot;success&quot;, &quot;id&quot;:1&#125;, <br/>
						&quot;status&quot;:200, &quot;message&quot;:&quot;success&quot;&#125;<br/>
						例如&#123;&quot;MS_API_TABLE&quot;:&#123;&quot;status&quot;:200,&quot;message&quot;:&quot;success&quot;,<br/>
						&quot;count&quot;:1&#125;,&quot;tag&quot;:&quot;MS_API_TABLE&quot;,<br/>
						&quot;status&quot;:200,&quot;message&quot;:&quot;success&quot;&#125;</p>
        	  </td>
        	</tr>
        	<tr>
        	  <td style={{borderBottom:'1px solid #D8DDE6'}}>
        	  <p style={{padding:'5px'}}>PUT：修改数据，非明文，只修改所传的字段</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6'}}>
        	  <p style={{padding:'5px'}}>base_url/put/</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6'}}>
        	  <p style={{padding:'5px'}}>&#123;TableName:&#123;&quot;id&quot;:id,…&#125;, &quot;tag&quot;:tag&#125;，&#123;…&#125;中id必传。<br/>
						例如:修改id为1的MS_API_TABLE的name：&#123;&quot;MS_API_TABLE&quot;:<br/>
						&#123;&quot;id&quot;:000,<br/>
						&quot;name&quot;:&quot;测试数据tag&quot;&#125;, <br/>
						&quot;tag&quot;:&quot;MS_API_TABLE&quot;&#125;</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6'}}>
        	  <p style={{padding:'5px'}}>同POST</p>
        	  </td>
        	</tr>
        	<tr>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	  	<p style={{padding:'5px'}}>DELETE：删除数据，非明文</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	  <p style={{padding:'5px'}}>base_url/delete/</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	  	<p style={{padding:'5px'}}>&#123;TableName:&#123;&quot;id&quot;:id&#125;, &quot;tag&quot;:tag&#125;，&#123;…&#125;中id必传，<br/>
							一般只传id。<br/>
							例如:删除id为000的MS_API_TABLE：&#123;&quot;MS_API_TABLE&quot;:<br/>
							&#123;&quot;id&quot;:1&#125;,&quot;tag&quot;:&quot;MS_API_TABLE&quot;&#125;</p>
        	  </td>
        	  <td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
        	  	<p style={{padding:'5px'}}>同POST</p>
        	  </td>
        	</tr>
        </table>
        <pre>
		   <code className="xml">
		        <p>{ codeExample6 }</p>
		   </code>
		</pre> 
		<Divider />
        <h4 name ="04" id ="04">4.功能符</h4>
        
        <table style={{width:'100%',fontSize:'0.875rem'}}>
	        <tr>
	        	<td style={{borderTop:'1px solid #D8DDE6',borderBottom:'1px solid #D8DDE6'}}>
	        	<p style={{color:'#54698d',padding:'5px'}}>键值对格式</p>
	        	</td>
	        	<td style={{borderTop:'1px solid #D8DDE6',borderBottom:'1px solid #D8DDE6'}}>
	        	<p style={{color:'#54698d',padding:'5px'}}>功能与作用</p>
	        	</td>
	        	<td style={{borderTop:'1px solid #D8DDE6',borderBottom:'1px solid #D8DDE6'}}>
	        	  	    				<p style={{color:'#54698d',padding:'5px'}}>使用示例</p>
	        	</td>
	        </tr>
	        <tr>
	        	<td style={{borderBottom:'1px solid #D8DDE6'}}>
	        	<p style={{padding:'5px'}}>&quot;key[]&quot;:&#123;&#125;，后面是JSONObject</p>
	        	</td>
	        	<td style={{borderBottom:'1px solid #D8DDE6'}}>
	        	<p style={{padding:'5px'}}>查询数组</p>
	        	</td>
	        	<td style={{borderBottom:'1px solid #D8DDE6'}}>
	        	<p style={{padding:'5px'}}>&#123;&quot;MS_API_TABLE[]&quot;:&#123;&quot;MS_API_TABLE&quot;:&#123;&quot;pid&quot;:&quot;root&quot;&#125;&#125;&#125;，查询pid为root的一个MS_API_TABLE数组	
  	    				</p>
	        	</td>
	        </tr>
	        <tr>
	        	<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
	        		<p style={{padding:'5px'}}>&quot;key&#123;&#125;&quot;:[]，后面是JSONArray，作为key可取的值的选项
  	    				</p>
	        	</td>
	        	<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
	        		<p style={{padding:'5px'}}>匹配选项范围</p>
	        	</td>
	        	<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
	        		<p style={{padding:'5px'}}>&#123;&quot;[]&quot;:&#123;&quot;MS_API_TABLE&quot;:&#123;&quot;id&#123;&#125;&quot;:[1,14,21]&#125;&#125;&#125;，查询id符合1,14,21中任意一个的一个MS_API_TABLE数组
  	    				</p>
	        	</td>
	        </tr>
	        <tr>
	        	<td style={{borderBottom:'1px solid #D8DDE6'}}>
	        		<p style={{padding:'5px'}}>&quot;key&#123;&#125;&quot;:&quot;条件0,条件1...&quot;，条件为任意SQL比较表达式字符串，<br/>非Number类型必须用''包含条件的值，如'a'
  	    				</p>
	        	</td>
	        	<td style={{borderBottom:'1px solid #D8DDE6'}}>
	        		<p style={{padding:'5px'}}>匹配条件范围</p>
	        	</td>
	        	<td style={{borderBottom:'1px solid #D8DDE6'}}>
	        		<p style={{padding:'5px'}}>&#123;&quot;MS_API_TABLE[]&quot;:&#123;&quot;count&quot;:5,&quot;MS_API_TABLE&quot;:&#123;&quot;id&#123;&#125;&quot;:&quot;&lt;=3,&gt;13&quot;&#125;&#125;&#125;，<br/>
						查询id符合id&lt;=3 | id&gt;13的一个User数组</p>
	        	</td>
	        </tr>
	        <tr>
	        	<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
	        	<p style={{padding:'5px'}}>&quot;key@&quot;:&quot;依赖路径&quot;，依赖路径为用/分隔的字符串
  	    				</p>
	        	</td>
	        	<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
	        	<p style={{padding:'5px'}}>依赖引用</p>
	        	</td>
	        	<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
	        		<p style={{padding:'5px'}}>&#123;&quot;MS_API_TABLE&quot;:&#123;&quot;id&quot;:&quot;000&quot;&#125;,&quot;MS_MENU_TABLE&quot;:&#123;&quot;id@&quot;:&quot;/MS_API_TABLE/id&quot;&#125;&#125;，<br/>
						MS_MENU_TABLE中的id依赖引用同级MS_API_TABLE内的id值，<br/>
						假设id=&quot;000&quot;，则请求完成后会变成MS_MENU_TABLE的 &quot;id&quot;:&quot;000&quot;</p>
	        	</td>
	        </tr>
	        <tr>
	        	<td style={{borderBottom:'1px solid #D8DDE6'}}>
	        	<p style={{padding:'5px'}}>&quot;key$&quot;:&quot;SQL搜索表达式&quot; => &quot;key$&quot;:[&quot;SQL搜索表达式&quot;]，<br/>任意SQL搜索表达式字符串，<br/>如 %key%, %k%e%y% 等
  	    				</p>
	        	</td>
	        	<td style={{borderBottom:'1px solid #D8DDE6'}}>
	        	<p style={{padding:'5px'}}>模糊搜索</p>
	        	</td>
	        	<td style={{borderBottom:'1px solid #D8DDE6'}}>
	        	<p style={{padding:'5px'}}>&#123;&quot;User[]&quot;:&#123;&quot;count&quot;:3,&quot;MS_MENU_TABLE&quot;:&#123;&quot;name$&quot;:&quot;%2525SDK%2525&quot;&#125;&#125;&#125;，<br/>
						查询name包含&quot;m&quot;的一个MS_MENU_TABLE数组</p>
	        	</td>
	        </tr>
	        <tr>
	        	<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
	        	<p style={{padding:'5px'}}> &amp;, &#124;, &#33; 逻辑运算符。<br/>
						   ① &amp; 可用于&quot;key&amp;&#123;&#125;&quot;:&quot;条件&quot;等<br/>
						   ② &#124; 可用于&quot;key&#124;&#123;&#125;&quot;:&quot;条件&quot;, &quot;key&#124;&#123;&#125;&quot;:[]等，一般可省略<br/>
						   ③ &#33; 可单独使用，如&quot;key&#33;&quot;:Object，也可像&amp;,&#124;一样配合其他功能符使用</p>
	        	</td>
	        	<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
	        	<p style={{padding:'5px'}}>逻辑运算</p>
	        	</td>
	        	<td style={{borderBottom:'1px solid #D8DDE6',background:'#F4F6F9'}}>
	        	<p style={{padding:'5px'}}>   ① &quot;id&amp;&#123;&#125;&quot;:&quot;&gt;80000,&lt;=90000&quot;，即id满足id&gt;80000 &amp; id&lt;=90000<br/>
					   ② &quot;id&#124;&#123;&#125;&quot;:&quot;&gt;90000,&lt;=80000&quot;，同&quot;id&#123;&#125;&quot;:&quot;&gt;90000,&lt;=80000&quot;，即id满足id&gt;90000 &#124; id&lt;=80000<br/>
					   ③ &quot;id!&#123;&#125;&quot;:[82001,38710]，即id满足 ! (id=82001 &#124; id=38710)，可过滤黑名单的消息</p>
	        	</td>
	        </tr>
	        <tr>
	        	<td style={{borderBottom:'1px solid #D8DDE6'}}>
	        	<p style={{padding:'5px'}}>&quot;@key&quot;:key指定类型的Object，@key为JSONObject中的关键词<br/>
						   ① &quot;@column&quot;:&quot;key0,key1...&quot;, 指定返回字段<br/>
						   ② &quot;@order&quot;:&quot;key0,key1+,key2-...&quot;，指定排序方式<br/>
						   ③ &quot;@group&quot;:&quot;key0,key1,key2...&quot;，指定分组方式。如果@column里声明了<br/>
						   Table主键(一般是id)，则该主键也必须在@group中声明；<br/>
						        其它情况下必须满足至少一个条件:<br/>
						   1.分组的key在@column里声明;<br/>
						   2.Table主键在@group中声明<br/>
						   ④ &quot;@having&quot;:&quot;function0(...)?valu0,function1(...)?valu1,function2(...)?value2...&quot;，<br/>
						         指定分组函数条件，必须和@group一起用，函数一般在@column里声明</p>
	        	</td>
	        	<td style={{borderBottom:'1px solid #D8DDE6'}}>
	        	<p style={{padding:'5px'}}>关键词,可自定义</p>
	        	</td>
	        	<td style={{borderBottom:'1px solid #D8DDE6'}}>
	        	<p style={{padding:'5px'}}> ① 只查询id,pid,name这几列并且请求结果也按照这个顺序：<br/>
						   &quot;@column&quot;:&quot;id,pid,name&quot;<br/>
						   ② 查询按 name降序、id默认顺序 排序的MS_API_TABLE数组：<br/>
						   &quot;@order&quot;:&quot;name-,id&quot;<br/>
						   ③ 查询按id分组的MS_MENU_TABLE数组：<br/>
						   &quot;@group&quot;=&quot;id,name&quot;<br/>
						   ④ 查询 按id分组、ord最大值&lt;=10 的Moment数组：<br/>
						   &quot;@column&quot;:&quot;id,max(ord)&quot;,<br/>
						   &quot;@group&quot;:&quot;id&quot;,，<br/>
						   &quot;@having&quot;:&quot;max(ord)&lt;=10&quot;<br/>
						         还可以指定函数返回名：<br/>
						   &quot;@column&quot;:&quot;id,max(ord):maxOrd&quot;,<br/>
						   &quot;@group&quot;:&quot;id&quot;,<br/>
						   ...</p>
	        	</td>
	        </tr>
        </table>
        <h4 name ="05" id ="05">5.配置说明</h4>
        <h5>(1).AccessVerifier.java</h5>
        <img src={`${this.props.site.baseContextPath}/style/demo/image/apiJson/accessVerifier.png`} />
        <pre>
		   <code className="xml">
		        <p>{ codeExample7 }</p>
		   </code>
		</pre>
        <h5>(2).QueryHelper.java</h5>
        <img src={`${this.props.site.baseContextPath}/style/demo/image/apiJson/queryHelper.png`} />
        <pre>
		   <code className="xml">
		        <p>{ codeExample8 }</p>
		   </code>
		</pre>
        <Divider />
        </Page>
    );
  }
}

ApiJsonPage.epmUIPage = page;

export default ApiJsonPage;
export { ApiJsonPage };

