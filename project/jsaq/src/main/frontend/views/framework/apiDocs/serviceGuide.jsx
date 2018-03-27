import React, { Component } from 'react';
import { Page, Divider, Table ,Row,Col} from 'epm-ui';

const page = {
  title: "服务治理使用说明"
};

class servicePage extends Component {
  render() {
    return (
        <Page>
        <Divider />
        <h1>{ page.title }</h1>
        <Divider />
	        <a href="#01"><h4>1.服务注册与发现</h4></a>
			<a href="#02"><h4>2.服务调用</h4></a>
	        <a href="#03"><h4>3.断路器与监控</h4></a> 
		<Divider />
		<Divider />
		<Divider />
		<h5 style={{marginLeft:'5px'}}>使用以上三个功能需要在pom文件配置spring cloud的组件依赖</h5>
		<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
			<pre><code>
				<span style={{marginLeft:'5px' }}>&#60;dependencyManagement&#62;</span><br/>
				<span style={{marginLeft:'15px'}}>&#60;dependencies&#62;</span><br/>
				<span style={{marginLeft:'25px'}}>&#60;dependency&#62;</span><br/>
				<span style={{marginLeft:'45px'}}>&#60;groupId&#62;org.springframework.cloud&#60;/groupId&#62;</span><br/>
				<span style={{marginLeft:'45px'}}>&#60;artifactId&#62;spring-cloud-dependencies&#60;/artifactId&#62;</span><br/>
				<span style={{marginLeft:'45px'}}>&#60;version&#62;Camden.SR3&#60;/version&#62;</span><br/>
				<span style={{marginLeft:'45px'}}>&#60;type&#62;pom&#60;/type&#62;</span><br/>
				<span style={{marginLeft:'45px'}}>&#60;scope&#62;import&#60;/scope&#62;</span><br/>
				<span style={{marginLeft:'25px'}}>&#60;/dependency&#62;</span><br/>
				<span style={{marginLeft:'15px'}}>&#60;/dependencies&#62;</span><br/>
				<span style={{marginLeft:'5px' }}>&#60;/dependencyManagement&#62;</span><br/>
			</code></pre>
		</div>
		<Divider line/>
		<h4 name ="01" id ="01">1.服务注册与发现</h4>
		<h5 style={{marginLeft:'15px'}}>(1).Maven项目中pom文件配置</h5>
		<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
			<pre><code>
				<span style={{marginLeft:'5px' }}>•引入spring cloud的eureka支持组件</span><br/>
				<span style={{marginLeft:'5px' }}>&#60;dependency&#62;</span><br/>
				<span style={{marginLeft:'20px'}}>&#60;groupId&#62;org.springframework.cloud&#60;/groupId&#62;</span><br/>
				<span style={{marginLeft:'20px'}}>&#60;artifactId&#62;spring-cloud-starter-eureka&#60;/artifactId&#62;</span><br/>
				<span style={{marginLeft:'5px' }}>&#60;/dependency&#62;</span><br/>
			</code></pre>
		</div>
		<h5 style={{marginLeft:'15px'}}>(2).配置eureka服务注册</h5>
		<h5 style={{marginLeft:'20px'}}>•使用注解：spring boot 项目中在启动类添加注解@EnableDiscoveryClient</h5>
		<img style={{width:'50%',marginLeft:'20px'}} src={`${this.props.site.baseContextPath}/style/demo/image/serviceGuide/1.png`} />
		<h5 style={{marginLeft:'15px'}}>(3).在配置文件中配置服务</h5>
		<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
			<pre><code>
				<span style={{marginLeft:'5px' }}>•配置application.properties</span><br/>
				<span style={{marginLeft:'10px'}}>spring.profiles.active=dev   //使用的环境</span><br/>
				<span style={{marginLeft:'10px'}}>spring.application.name=microservice-ui</span><br/>
				<span style={{marginLeft:'10px'}}>info.name=microservice-ui</span><br/>
				<span style={{marginLeft:'10px'}}>info.description=\u5FAE\u670D\u52A1\u6846\u67B6</span><br/>
				<span style={{marginLeft:'10px'}}>eureka.instance.prefer-ip-address=true</span><br/>
				<span style={{marginLeft:'10px'}}>eureka.instance.hostName=172.16.63.35  //服务访问地址</span><br/>
				<span style={{marginLeft:'10px'}}>eureka.client.serviceUrl.defaultZone=http://172.16.11.51:8088/eurekaserver/eureka/    //注册中心访问地址</span><br/>
			</code></pre>
		</div>
		<Divider />
		<h5 style={{marginLeft:'15px'}}>(4).配置完成访问 http://172.16.11.51:8088/eurekaserver/admin/</h5>
		<img style={{width:'50%',marginLeft:'20px'}} src={`${this.props.site.baseContextPath}/style/demo/image/serviceGuide/2.png`} />
		<Divider line/>
		
        <h4 name ="02" id ="02">2.服务调用</h4>
        <h5 style={{marginLeft:'15px'}}>(1).Maven 项目中pom文件配置</h5>
		<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
			<pre><code>
				<span style={{marginLeft:'5px' }}>•引入spring-cloud-starter-feign 依赖</span><br/>
				<span style={{marginLeft:'15px'}}>&#60;dependency&#62;</span><br/>
				<span style={{marginLeft:'25px'}}>&#60;groupId&#62;org.springframework.cloud&#60;/groupId&#62;</span><br/>
				<span style={{marginLeft:'25px'}}>&#60;artifactId&#62;spring-cloud-starter-feign&#60;/artifactId&#62;</span><br/>
				<span style={{marginLeft:'15px'}}>&#60;/dependency&#62;</span><br/>
			</code></pre>
		</div>
		<h5 style={{marginLeft:'15px'}}>(2).实现eureka服务发现</h5>
		<img style={{width:'50%',marginLeft:'20px'}} src={`${this.props.site.baseContextPath}/style/demo/image/serviceGuide/6.png`} />
		<h5 style={{marginLeft:'15px'}}>服务调用时用到跨域，在启动类加入跨域方法。</h5>
		<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
			<pre><code>
				<span style={{marginLeft:'5px' }}>@Bean</span><br/>
				<span style={{marginLeft:'5px' }}>public WebMvcConfigurer corsConfigurer() &#123;</span><br/>
				<span style={{marginLeft:'20px'}}>return new WebMvcConfigurerAdapter() &#123;</span><br/>
				<span style={{marginLeft:'35px'}}>@Override</span><br/>
				<span style={{marginLeft:'35px'}}>public void addCorsMappings(CorsRegistry registry) &#123;</span><br/>
				<span style={{marginLeft:'50px'}}>registry.addMapping("/**");</span><br/>
				<span style={{marginLeft:'35px'}}>&#125;</span><br/>
				<span style={{marginLeft:'20px'}}>&#125;</span><br/>
				<span style={{marginLeft:'5px' }}>&#125;</span><br/>
			</code></pre>
		</div>
		<Divider />
		<h5 style={{marginLeft:'15px'}}>(3).同服务注册，配置eureka服务发现，Docker内部署配置如下：</h5>
		<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
			<pre><code>
				<span style={{marginLeft:'5px' }}>•配置application.properties</span><br/>
				<span style={{marginLeft:'10px'}}>spring.profiles.active=dev   //使用的环境</span><br/>
				<span style={{marginLeft:'10px'}}>spring.application.name=microservice-ui</span><br/>
				<span style={{marginLeft:'10px'}}>info.name=microservice-ui</span><br/>
				<span style={{marginLeft:'10px'}}>info.description=\u5FAE\u670D\u52A1\u6846\u67B6</span><br/>
				<span style={{marginLeft:'10px'}}>eureka.instance.prefer-ip-address=true</span><br/>
				<span style={{marginLeft:'10px'}}>eureka.instance.hostName=172.16.63.35  //服务访问地址</span><br/>
				<span style={{marginLeft:'10px'}}>eureka.client.serviceUrl.defaultZone=http://172.16.11.51:8088/eurekaserver/eureka/    //注册中心访问地址</span><br/>
			</code></pre>
		</div>
		<Divider />
		<h5 style={{marginLeft:'15px'}}>(4).创建Feign客户端</h5>
		<h5 style={{marginLeft:'15px'}}>在应用中创建一个接口，在接口上使用feignClient注解，注解中的name配置为服务提供方的servceName，接口方法为servceName提供的服务，与服务名称参数保持一致。</h5>
		<img style={{width:'50%',marginLeft:'20px'}} src={`${this.props.site.baseContextPath}/style/demo/image/serviceGuide/7.png`} />
		<Divider/>
		<h5 style={{marginLeft:'15px'}}>(5).实现服务调用</h5>  
		<h5 style={{marginLeft:'15px'}}>在类中注入定义的feignClient接口，在方法中直接使用接口调用。</h5>
		<img style={{width:'50%',marginLeft:'20px'}} src={`${this.props.site.baseContextPath}/style/demo/image/serviceGuide/8.png`} />
		<Divider line/>
		
		<h4 name ="03" id ="03">3.断路器与监控</h4>
		<h5 style={{marginLeft:'15px'}}>注：断路器和监控是针对服务调用过程的，验证时需要配置服务调用相关的配置。</h5>
		<h5 style={{marginLeft:'15px'}}>(1).Maven 项目中pom文件配置</h5>
		<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
			<pre><code>
				<span style={{marginLeft:'5px' }}>•引入spring cloud及hystrix组件</span><br/>
				<span style={{marginLeft:'5px' }}>Maven 项目中pom文件配置（其中spring-cloud-starter-hystrix-dashboard的引入为实现页面监控）</span><br/>
				<span style={{marginLeft:'15px'}}>&#60;dependency&#62;</span><br/>
				<span style={{marginLeft:'25px'}}>&#60;groupId&#62;org.springframework.cloud&#60;/groupId&#62;</span><br/>
				<span style={{marginLeft:'25px'}}>&#60;artifactId&#62;spring-cloud-starter-hystrix&#60;/artifactId&#62;</span><br/>
				<span style={{marginLeft:'15px'}}>&#60;/dependency&#62;</span><br/>
				<span style={{marginLeft:'15px'}}>&#60;dependency&#62;</span><br/>
				<span style={{marginLeft:'25px'}}>&#60;groupId&#62;org.springframework.cloud&#60;/groupId&#62;</span><br/>
				<span style={{marginLeft:'25px'}}>&#60;artifactId&#62;spring-cloud-starter-hystrix-dashboard&#60;/artifactId&#62;</span><br/>
				<span style={{marginLeft:'15px'}}>&#60;/dependency&#62;</span><br/>  
			</code></pre>
		</div>    
		<h5 style={{marginLeft:'15px'}}>(2).配置 hystrix</h5>
		<div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
			<pre><code>
				<span style={{marginLeft:'5px' }}>①项目启动类添加注解</span><br/>
				<span style={{marginLeft:'10px'}}>@EnableCircuitBreaker – 开启断路器</span><br/>
				<span style={{marginLeft:'10px'}}>@EnableHystrixDashboard – 开启断路监控</span><br/>
				<span style={{marginLeft:'5px' }}>②设置服务熔断超时时间</span><br/>
				<span style={{marginLeft:'10px'}}>hystrix.command.default.execution.isolation.thread.timeoutInMilliseconds=5000（该配置为全局配置）</span><br/>
				<span style={{marginLeft:'10px'}}>注：Hystrix默认的超时时间为1s 大多数服务初次访问响应时间会超过1s 此处需要修改；如有特殊情况服务响应时间较长可适当增加超时时间</span><br/>
			</code></pre>
		</div> 
		<Divider />
		<img style={{width:'50%',marginLeft:'20px'}} src={`${this.props.site.baseContextPath}/style/demo/image/serviceGuide/3.png`} />  
		<Divider />
		<h5 style={{marginLeft:'15px'}}>(3).使用断路器</h5>
		<h5 style={{marginLeft:'15px'}}>在feignClient接口中定义fallback，指定服务调用失败后的处理类</h5>
		<h5 style={{marginLeft:'15px'}}>Fallback方法的实现需要根据具体的业务场景做出相应的处理，例如从上次查询缓存中获取数据、返回提示信息等。</h5>
		<img style={{width:'50%',marginLeft:'20px'}} src={`${this.props.site.baseContextPath}/style/demo/image/serviceGuide/f.png`} />  
		<Divider />
		<h5 style={{marginLeft:'15px'}}>(4).使用hystrix监控服务</h5>
		<h5 style={{marginLeft:'15px'}}>在服务调用端引入spring-cloud-starter-hystrix-dashboard之后，即可通过hystrix-dashboard监控页面查看服务响应情况。</h5>
        <h5 style={{marginLeft:'15px'}}>访问路径http://localhost:8080/microservice-ui/hystrix,看到如下页面：</h5>
        <img style={{width:'50%',marginLeft:'20px'}} src={`${this.props.site.baseContextPath}/style/demo/image/serviceGuide/4.png`} />  
        <h5 style={{marginLeft:'15px'}}>在页面上输入url： http://localhost:8080/microservice-ui/hystrix.stream 点击下方的按钮，即可开始监控服务调用的断路情况，如下图：</h5>
        <img style={{width:'50%',marginLeft:'20px'}} src={`${this.props.site.baseContextPath}/style/demo/image/serviceGuide/5.png`} />  
        <Divider />
        <Divider line/>
        </Page>
    );
  }
}

servicePage.epmUIPage = page;
export default servicePage;
export { servicePage };

