import React, { Component } from 'react';
import { Page, Divider,Container } from 'epm-ui';

const page = {
  title: "快速上手"
};

class easyStart extends Component {
	render() {
		return (
        	<Page>
        		<Container type="fluid">
					<h2>{ page.title }</h2>
					<Divider />
					<h4>基于Springboot的微服务开发框架提供面向企业级的开发平台。</h4>  
					<Divider />
					<h3>前置知识</h3>
					<p>
						&nbsp;&nbsp;&nbsp;&nbsp;该开发平台是基于Springboot的微服务开发框架提供，建议使用前先熟悉
						<a href="https://spring.io/">Spring</a>、
						<a href="http://projects.spring.io/spring-boot/">Spring-boot</a>
						以及集成的
						<a href="http://www.mybatis.org/mybatis-3/zh/index.html">Mybatis</a>。
						该开发平台，前台开发需要使用
					    <a href="https://code.bonc.com.cn/epm-ui/docs/getting-started">EPM UI</a>，
					    EPM UI是
					    <a href="https://facebook.github.io/react/">React</a>
					          组件集，所以对 React 机理的了解是必要的。
					          微服务平台还提供了服务治理，使用之前可以先了解
					    <a href="https://springcloud.cc/">Spring-Cloud</a>。
					           同时需要了解项目管理相关工具
					    <a href="https://git-scm.com/">Git</a>、
					    <a href="http://maven.apache.org/">Maven</a>等。
					</p> 
					<Divider />
					<h3>在项目中使用</h3> 
					<h4>安装</h4> 
					<h5>1，git下载</h5> 
					<h5>git clone https://code.bonc.com.cn/prc/microservice-ui.git</h5> 
					<h5>2，eclipse引入，启动</h5>  
					<h5>①</h5>  
					<img style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/1.png`} />
					<Divider />
					<h5>②</h5>  
					<img style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/2.png`} />
					<Divider />
					<h5>③</h5>  
					<img style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/3.png`} />
					<Divider />
					<h5>④</h5>  
					<img style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/4.png`} />
					<Divider />
					<h5>⑤</h5>  
					<img style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/5.png`} />
					<Divider />
					<h5>⑥</h5>  
					<img style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/6.png`} />
					<Divider />
					<h5>⑦ 运行项目：MicroApplication.java</h5>  
					<img style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/7.png`} /> 
					<h5>⑧ 项目访问路径</h5>  
					<h5>http://localhost:8080/microservice-ui/micro/menu</h5>  
					<img style={{width:'40%'}} style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/23.png`} /> 
					<h5>http://localhost:8080/microservice-ui/micro/api</h5>  
					<img style={{width:'40%'}} style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/24.png`} /> 
					<Divider />
					<h4>项目开发</h4> 
					<h5>从数据库到前台页面</h5>    
					<h5>① mapper.xml</h5> 
					<img style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/11.png`} />
					<h5>② mapper.java</h5>  
					<img style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/12.png`} />
					<h5>③ serviceImpl.java</h5> 
					<img style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/13.png`} />
					<h5>④ service.java</h5>
					<img style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/14.png`} />
					<h5>⑤ controller.java</h5> 
					<img style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/15.png`} />
					<h5>⑥ .jsx文件</h5>  
					<img style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/16.png`} />
					<Divider />
					<Divider />
					<h4>相关配置</h4> 
					<h5>① mybatis-config.xml文件  需要映射到相应的mapper文件</h5> 
					<img style={{width:'40%'}} src={`${this.props.site.baseContextPath}/style/demo/image/easyStart/21.png`} />
					<h5>② application.properties，配置项目名、端口号、数据库连接等。</h5>
					<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
						<pre><code>
							<span style={{marginLeft:'10px'}}>server.port=8080</span><br/>
							<span style={{marginLeft:'10px'}}>server.context-path=/microservice-ui</span><br/>
						</code></pre>
					</div>
					<Divider />
					<Divider />
					<Divider />
				</Container>	
        	</Page>
    );
  }
}
easyStart.epmUIPage = page;
export default easyStart;
export { easyStart };