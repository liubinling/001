import React, { Component } from 'react';
import { Page, Divider,Container } from 'epm-ui';

const page = {
  title: "流加载使用说明"
};

class flowGuide extends Component {
	render() {
		const text1 = `
① partList:存放要展示的各部分名称，之后会根据名称展示相应内容。
② showPart:默认要展示部分的个数，示例默认展示Part1。
③ showPartList:默认展示的部分名称，与showPart对应。
	`.trim();
	    const text2 = `
① 流加载的内容需要写到<Waterfall/>标签内。
② Part1中展示了表格，折线图，柱状图。在componentDidMount()中调用对应方法。每个Part中展示的内容以及布局可以自定义。
③ 示例将全部内容分成四部分，以流加载的形式，当滚动条滑动到页面底部或点击加载更多按钮时逐个加载。
	`.trim();
		const text3 = `
示例中同时提供滑动滚动条加载和点击按钮加载更多两种方式实现流加载。
	`.trim();	
	
		return (
        	<Page>
        		<Container type="fluid">
					<h2>{ page.title }</h2>
					<Divider line/>
					<h3>使用步骤</h3>
					<h5>1.在写流加载功能代码之前，需要引入相关文件。</h5>
					<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
						<pre><code>
							<h5>import &#123; Line,Bar,Scatter,Pie,Divider,Button,Table,Column,Loading,Alert &#125; from 'epm-ui';<br/></h5>
							<h5>import &#123; Waterfall &#125; from '../components';</h5>
						</code></pre>
					</div>
					<h5>2.确定展示内容需要分成几部分，以及默认展示哪一部分或几部分。示例中分为四部分，默认展示part1。</h5>
					<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
						<pre><code>
							<h5>const&nbsp;partList=[&nbsp;'part1','part2','part3','part4'&nbsp;];<br/></h5>
							<h5>let&nbsp;showPart = 1;<br/></h5>
							<h5>const&nbsp;showPartList =&nbsp;[</h5>
							<h5>&nbsp;&nbsp;`part1`<br/></h5>
							<h5>&nbsp;]</h5>
						</code></pre>
					</div>
					<pre>
					   <code className="xml">
					        <p>{ text1 }</p>
					   </code>
					</pre>
					<Divider />
					<h5>3.给各部分增加展示内容</h5>
					<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
						<pre><code>
							<span style={{marginLeft:'5px'}}>(1).流加载部分</span><br/>
							<span style={{marginLeft:'5px'}}>&#60;Waterfall</span><br/>
							<span style={{marginLeft:'15px'}}>items=&#123; this.state.data &#125;    //data: showPartList</span><br/>
							<span style={{marginLeft:'15px'}}>renderItem=&#123;(item, onMeasured) =&#62; &#123;</span><br/>
							<span style={{marginLeft:'15px'}}>if(item === 'part1')</span><br/>
							<span style={{marginLeft:'25px'}}>return  &#60;table cellPadding="10"&#62;</span><br/>
							<span style={{marginLeft:'90px'}}>&#60;tr&#62;</span><br/>
							<span style={{marginLeft:'100px'}}>&#60;td colSpan = "2"&#62;</span><br/>
							<span style={{marginLeft:'110px'}}>&#60;Table dataSource=&#123; this.state.tableMap &#125; multiLine=&#123; true &#125;&#62;</span><br/>
							<span style={{marginLeft:'120px'}}>&#60;Column title=&#123;this.state.tableTitle[0]&#125; dataIndex="REGION_DESC" /&#62;</span><br/>
							<span style={{marginLeft:'120px'}}>&#60;Column title=&#123;this.state.tableTitle[1]&#125; dataIndex="KPI_CODE" /&#62;</span><br/>
							<span style={{marginLeft:'120px'}}>&#60;Column title=&#123;this.state.tableTitle[2]&#125; dataIndex="KPI_NAME" /&#62;</span><br/>
							<span style={{marginLeft:'120px'}}>&#60;Column title=&#123;this.state.tableTitle[3]&#125; dataIndex="KPI_UNIT" /&#62;</span><br/>
							<span style={{marginLeft:'120px'}}>&#60;Column title=&#123;this.state.tableTitle[4]&#125; dataIndex="KPI_VALUE" /&#62;</span><br/>
							<span style={{marginLeft:'110px'}}>&#60;/Table&#62;</span><br/>
							<span style={{marginLeft:'100px'}}>&#60;/td&#62;</span><br/>
							<span style={{marginLeft:'90px'}}>&#60;/tr&#62;</span><br/>
							<span style={{marginLeft:'90px'}}>&#60;tr&#62;</span><br/>
							<span style={{marginLeft:'100px'}}>&#60;td&#62;</span><br/>
							<span style={{marginLeft:'110px'}}>&#60;Line  dataSource=&#123; this.state.lineData &#125; </span><br/>
							<span style={{marginLeft:'130px'}}>extend=&#123; this.state.lineColorData &#125;</span><br/>
							<span style={{marginLeft:'130px'}}>size = &#123; &#123;height: '400', width: '700'&#125; &#125;</span><br/>
							<span style={{marginLeft:'130px'}}>autoScaling =&#123; false &#125;</span><br/>
							<span style={{marginLeft:'130px'}}>title =&#123; lineTitle &#125; /&#62;</span><br/>
							<span style={{marginLeft:'100px'}}>&#60;/td&#62;</span><br/>
							<span style={{marginLeft:'100px'}}>&#60;td&#62;</span><br/>
							<span style={{marginLeft:'110px'}}>&#60;Bar dataSource=&#123; this.state.barData &#125; </span><br/>
							<span style={{marginLeft:'130px'}}>extend=&#123; this.state.barColorData &#125;</span><br/>
							<span style={{marginLeft:'130px'}}>size = &#123; &#123;height: '400', width: '700'&#125; &#125;</span><br/>
							<span style={{marginLeft:'130px'}}>autoScaling =&#123; false &#125;</span><br/>
							<span style={{marginLeft:'130px'}}>title =&#123; barTitle &#125; /&#62;</span><br/>
							<span style={{marginLeft:'100px'}}>&#60;/td&#62;</span><br/>
							<span style={{marginLeft:'90px'}}>&#60;/tr&#62;</span><br/>
							<span style={{marginLeft:'70px'}}>&#60;/table&#62;</span><br/>
							<span style={{marginLeft:'15px'}}>if(item === 'part2')</span><br/>
							<span style={{marginLeft:'25px'}}>return  </span><br/>
							<span style={{marginLeft:'15px'}}>if(item === 'part3')</span><br/>
							<span style={{marginLeft:'25px'}}>return  </span><br/>
							<span style={{marginLeft:'15px'}}>if(item === 'part4')</span><br/>
							<span style={{marginLeft:'25px'}}>return &#60;div&#62; </span><br/>
							<span style={{marginLeft:'90px'}}>&#60;Bar dataSource=&#123; this.state.barData &#125; </span><br/>
							<span style={{marginLeft:'110px'}}>extend=&#123; this.state.barColorData &#125;</span><br/>
							<span style={{marginLeft:'110px'}}>size = &#123; &#123;height: '350', width: '500'&#125; &#125;</span><br/>
							<span style={{marginLeft:'110px'}}>autoScaling =&#123; false &#125;</span><br/>
							<span style={{marginLeft:'110px'}}>title =&#123; barTitle &#125; /&#62;</span><br/>
							<span style={{marginLeft:'70px'}}>&#60;/div&#62;</span><br/>
							<span style={{marginLeft:'5px'}}> &#125;&#125;/&#62;</span><br/>
							<br/>
							<span style={{marginLeft:'5px'}}>(2).页面初始化Part1</span><br/>
							<span style={{marginLeft:'5px'}}>componentDidMount() &#123;</span><br/>
							<span style={{marginLeft:'20px'}}>window.addEventListener('scroll', this.orderScroll);   //滑动滚动条加载更多</span><br/>
							<span style={{marginLeft:'20px'}}>this.tableData();</span><br/>
							<span style={{marginLeft:'20px'}}>this.lineData();</span><br/>
							<span style={{marginLeft:'20px'}}>this.barData();</span><br/>
							<span style={{marginLeft:'5px'}}>&#125;</span><br/>
							
						</code></pre>
					</div>
					<pre>
					   <code className="xml">
					        <p>{ text2 }</p>
					   </code>
					</pre>
					<h5>4.两种加载方式</h5>
					<h5>(1).点击按钮加载更多</h5>
					<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
						<pre><code>
							<span style={{marginLeft:'5px'}}>showMorePart() &#123;</span><br/>
							<span style={{marginLeft:'20px'}}>const &#123; data &#125; = this.state;</span><br/>
							<span style={{marginLeft:'20px'}}>if(showPart &#60; partList.length)&#123;</span><br/>
							<span style={{marginLeft:'35px'}}>showPartList.push(partList[showPart]);</span><br/>
							<span style={{marginLeft:'35px'}}>if(showPart == partList.length - 1)&#123;</span><br/>
							<span style={{marginLeft:'50px'}}>this.setState( &#123; buttonType: 'none' &#125; );</span><br/>
							<span style={{marginLeft:'35px'}}>&#125;</span><br/>
							<span style={{marginLeft:'20px'}}>&#125;</span><br/>
							<span style={{marginLeft:'20px'}}>this.setState( &#123; data: showPartList &#125; );</span><br/>
							<span style={{marginLeft:'20px'}}>showPart++;</span><br/>
							<span style={{marginLeft:'20px'}}>if(showPart == 2 )&#123;</span><br/>
							<span style={{marginLeft:'35px'}}>this.lineData();</span><br/>
							<span style={{marginLeft:'35px'}}>this.barData();</span><br/>
							<span style={{marginLeft:'30px'}}>&#125;</span><br/>
							<span style={{marginLeft:'20px'}}>if(showPart == 3 )&#123;</span><br/>
							<span style={{marginLeft:'35px'}}>this.barData();</span><br/>
							<span style={{marginLeft:'35px'}}>this.tableData();</span><br/>
							<span style={{marginLeft:'30px'}}>&#125;</span><br/>
							<span style={{marginLeft:'20px'}}>if(showPart == 4 )&#123;</span><br/>
							<span style={{marginLeft:'35px'}}>this.pieData();</span><br/>
							<span style={{marginLeft:'30px'}}>&#125;</span><br/>
							<span style={{marginLeft:'5px'}}>&#125;</span><br/>
						</code></pre>
					</div>
					<h5>(2).滚动加载更多</h5>
					<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
						<pre><code>
						    <span style={{marginLeft:'5px'}}>计算滚动条距底部的距离marginBot</span><br/>
							<span style={{marginLeft:'5px'}}>orderScroll()&#123;</span><br/>
							<span style={{marginLeft:'20px'}}>let marginBot = 0;</span><br/>
							<span style={{marginLeft:'20px'}}>if (document.documentElement.scrollTop)&#123;</span><br/>
							<span style={{marginLeft:'35px'}}>marginBot = document.documentElement.scrollHeight - (document.documentElement.scrollTop+document.body.scrollTop)-document.documentElement.clientHeight;</span><br/>
							<span style={{marginLeft:'35px'}}>this.scrollBottom(marginBot);</span><br/>
							<span style={{marginLeft:'20px'}}>&#125; else &#123;</span><br/>
							<span style={{marginLeft:'35px'}}>marginBot = document.body.scrollHeight - document.body.scrollTop - document.body.clientHeight;</span><br/>
							<span style={{marginLeft:'35px'}}>this.scrollBottom(marginBot);</span><br/>
							<span style={{marginLeft:'20px'}}>&#125;</span><br/>
							<span style={{marginLeft:'5px'}}>&#125;</span><br/>
							<br/>
							<span style={{marginLeft:'5px'}}>当滚动条距底部距离小于等于5px时执行流加载方法，类似于点击按钮加载更多。</span><br/>
							<span style={{marginLeft:'5px'}}>scrollBottom(marginBot) &#123;</span><br/>
							<span style={{marginLeft:'20px'}}>if(marginBot&#60;=5) &#123;</span><br/>
							<span style={{marginLeft:'35px'}}>const &#123; data &#125; = this.state;</span><br/>
							<span style={{marginLeft:'50px'}}>if(showPart &#60; partList.length)&#123;</span><br/>
							<span style={{marginLeft:'65px'}}>showPartList.push(partList[showPart]);</span><br/>
							<span style={{marginLeft:'65px'}}>if(showPart == partList.length - 1)&#123;</span><br/>
							<span style={{marginLeft:'80px'}}>this.setState( &#123; buttonType: 'none' &#125; );</span><br/>
							<span style={{marginLeft:'65px'}}>&#125;</span><br/>
							<span style={{marginLeft:'50px'}}>&#125;</span><br/>
							<span style={{marginLeft:'50px'}}>this.setState( &#123; data: showPartList &#125; );</span><br/>
							<span style={{marginLeft:'50px'}}>showPart++;</span><br/>
							<span style={{marginLeft:'50px'}}>if(showPart == 2 )&#123;</span><br/>
							<span style={{marginLeft:'65px'}}>&#125;</span><br/>
							<span style={{marginLeft:'50px'}}>if(showPart == 3 )&#123;</span><br/>
							<span style={{marginLeft:'65px'}}>&#125;</span><br/>
							<span style={{marginLeft:'50px'}}>if(showPart == 4 )&#123;</span><br/>
							<span style={{marginLeft:'65px'}}>this.setState(&#123;showLoading:true&#125;);</span><br/>
							<span style={{marginLeft:'65px'}}>this.closeTimer = setTimeout( () =&#62; &#123;</span><br/>
							<span style={{marginLeft:'80px'}}>this.setState(&#123;showLoading:false&#125;);</span><br/>
							<span style={{marginLeft:'80px'}}>&#125;, 1*1000 );</span><br/>
							<span style={{marginLeft:'65px'}}>&#125;</span><br/>
							<span style={{marginLeft:'50px'}}>&#125;</span><br/>
							<span style={{marginLeft:'5px'}}>&#125;</span><br/>
							<br/>
							<span style={{marginLeft:'5px'}}>Loading动画标签。</span><br/>
							<span style={{marginLeft:'5px'}}>&#60;div style=&#123;&#123;left:'50%',bottom:'0',position:'fixed',width:'100px',height:'100px',maiginBottom:'50px',zIndex:'-100'&#125;&#125;&#62;</span><br/>
							<span style={{marginLeft:'20px'}}>&#123;this.state.showLoading ? &#60;Loading /&#62; : null &#125; </span><br/>
							<span style={{marginLeft:'5px'}}>&#60;/div&#62;</span><br/>
						</code></pre>
					</div>
					<pre>
					   <code className="xml">
					        <p>{ text3 }</p>
					   </code>
					</pre>
				</Container>	
        	</Page>
    );
  }
}
flowGuide.epmUIPage = page;
export default flowGuide;
export { flowGuide };