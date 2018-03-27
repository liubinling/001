import React, { Component } from 'react';
import { Page, Divider} from 'epm-ui';

const page = {
  title: "JPA"
};

class JpaPage extends Component {

  render() {
	  const codeExample1 = `

<dependencies>下增加
	
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		
</dependencies>	  
		      `.trim();


	  const codeExample2 = `
	  
	  
    `.trim();
		  
    return (
        <Page>
        <Divider />
        <h1>{ page.title }</h1>
        
        <Divider />
	        <h3>
	        1、JPA介绍
	        </h3>
	        <h4>JPA全称为Java Persistence API ，Java持久化API是Sun公司在java EE 5规范中提出的Java持久化接口。</h4>
	        <h4>JPA吸取了目前Java持久化技术的优点，旨在规范、简化Java对象的持久化工作。使用JPA持久化对象，并不是依赖于某一个ORM框架。</h4>
		    <Divider />
	    	<h3>
	        2、jpa集成
	    	pom.xml文件
	    	</h3>
		    <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
		    <pre>
		        <code className="xml">
		          <h4>{ codeExample1 }</h4>
		        </code>
		    </pre>
		    </div>
		    <Divider />
		    <h3>
	        3、注意
	        </h3>
	        <h4>使用JPA需保证主数据源链接正确,否则会导致项目启动报错</h4>
	        <Divider />
	        <pre>
		        <code className="xml">
		          <h4>{ codeExample2 }</h4>
		        </code>
	        </pre>
	        <Divider />
        </Page>
    );
  }
}

JpaPage.epmUIPage = page;

export default JpaPage;
export { JpaPage };