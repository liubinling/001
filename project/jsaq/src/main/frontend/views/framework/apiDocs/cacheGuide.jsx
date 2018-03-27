import React, { Component } from 'react';
import { Page, Divider,Table, Input, Button, Container, Column } from 'epm-ui';

const page = {
  title: "缓存管理使用说明"
};

class toolClass extends Component {
	render() {
		return (
        	<Page>
        		<Container type="fluid">
					<h1>{ page.title }</h1>
					<Divider />
	           		
	           		<h4>1.相关配置操作</h4>
	           		<h5>(1).直接从公司仓库引用在pom.xml文件中添加依赖：<br/></h5>
					<p>
						&lt;dependency&gt;<br/>
							&nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;com.bonc.cache&lt;/groupId&gt;<br/>
							&nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;cache-client&lt;/artifactId&gt;<br/>
							&nbsp;&nbsp;&nbsp;&nbsp;&lt;version&gt;0.0.1-SNAPSHOT&lt;/version&gt;<br/>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;exclusions&gt;<br/>
						        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;exclusion&gt;<br/>
						            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;org.slf4j&lt;/groupId&gt;<br/>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;slf4j-log4j12&lt;/artifactId&gt;<br/>
						        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/exclusion&gt;<br/>
						    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/exclusions&gt;<br/>
						&lt;/dependency&gt;
				    </p>
				    <h5>如图：<br/></h5>
					<img src={`${this.props.site.baseContextPath}/style/demo/image/cacheGuide/2.png`} />
	           		<Divider />
	           		<h5>(2).项目启动类中注册缓存初始化类CacheClientInit:<br/></h5>
					<p>
							@Bean<br/>
							public  CacheClientInit cacheClientInitBean() &#123;<br/>
							&nbsp;&nbsp;&nbsp;&nbsp;	final CacheClientInit cacheClientInit = new CacheClientInit();<br/>
							&nbsp;&nbsp;&nbsp;&nbsp;	return cacheClientInit;<br/>
							&#125;
					</p>
					<h5>如图：<br/></h5>
					<img src={`${this.props.site.baseContextPath}/style/demo/image/cacheGuide/1.png`} />
	           		<Divider />
	           		<h5>(3).mybatis-config文件中配置拦截器插件<br/></h5>
					<h5>&lt;plugin interceptor=&quot;com.bonc.intercept.CacheIntercept&quot;&gt;&lt;/plugin&gt;</h5>
					<h5>如图：<br/></h5>
					<img src={`${this.props.site.baseContextPath}/style/demo/image/cacheGuide/3.png`} />
	           		<Divider />
	           		<h5>(4).添加缓存服务配置文件cache.properties<br/></h5>
					<img src={`${this.props.site.baseContextPath}/style/demo/image/cacheGuide/33.png`} />
	           		<Divider />
	           		
	           		<h4>2.服务应用配置操作</h4>
					<p>
					缓存管理功能是按照系统、模块、sql三个层级进行缓存管理的。使用缓存功能前，需要将对应的信息添加到缓存管理表中。添加需要按照系统->模块->sql顺序进行。
					</p>
					<h5>(1).新增系统 (http://172.16.13.45:8099/cacheservice/systemCache/index)<br/></h5>
					<h5>访问系统信息管理页面，点击‘新增’按钮，完成新增系统操作</h5>
					<img src={`${this.props.site.baseContextPath}/style/demo/image/cacheGuide/12.png`} />
					<h5 style={{color:'red'}}>注意：系统编码不能与已经存在系统重复。</h5>
	           		<Divider />
	           		<h5>(2).根据系统添加模块 (http://172.16.13.45:8099/cacheservice/moduleCache/index)<br/></h5>
					<h5>访问模块信息管理页面，点击‘新增’按钮，完成新增模块操作</h5>
					<img src={`${this.props.site.baseContextPath}/style/demo/image/cacheGuide/13.png`} />
					<h5>所填信息解释：</h5>
					<h5>模块URL：模块访问路径，如 http://localhost:8080/microservice-ui/DateManagement/DateManagementIndex；</h5>
					<h5>缓存时长：缓存添加后存在多长时间, 单位分为小时和天，用户可以根据需要选择；</h5>
					<h5>是否开启缓存：只有缓存开启该模块才能使用缓存。</h5>
					<h5 style={{color:'red'}}>注意：新增模块信息时系统中的模块编码不能相同。</h5>
	           		<Divider />
	           		<h5>(3).根据模块新增sql信息 (http://172.16.13.45:8099/cacheservice/sqlCache/index)<br/></h5>
					<h5>访问SQl信息管理页面，点击‘新增’按钮，完成新增SQl操作</h5>
					<img src={`${this.props.site.baseContextPath}/style/demo/image/cacheGuide/14.png`} />
	           		<h5 style={{color:'red'}}>注意:只有当开启缓存时该sql才支持缓存功能。</h5>
	           		<Divider />
	           		<h5>(4).预加载缓存<br/></h5>
					<h5>分为预加载系统缓存和预加载模块缓存，选择需要预加载缓存的模块或系统，点击‘加载缓存’按钮即可实现缓存预加载。</h5>
	           		<Divider />
	           		
	           		<h4>3.注意事项</h4>
	           		<p style={{color:'red'}}>
	           			①，开启缓存服务时需要在项目启动类中注册缓存初始化类CacheClientInit以及将cache.properties配置文件中的缓存开关cache.open的值设为true<br/>
						②，关闭缓存服务时需要将项目启动类中注册缓存初始化类CacheClientInit注释掉以及将cache.properties配置文件中的缓存开关cache.open的值设为false<br/>
						③，在服务应用配置时可以只新增系统和模块，这样刷新页面时会自动缓存该模块所包含的所有有参数的SQL<br/>
						④，在服务应用配置时新增了系统.模块以及sql信息，刷新模块页面会给指定的sql增加缓存<br/>
						⑤，在③④中提到的方法，缓存会在页面刷新2-3分钟后增加上。有延迟。
	           		</p>
				</Container>	
        	</Page>
    );
  }
}

toolClass.epmUIPage = page;
export default toolClass;
export { toolClass };