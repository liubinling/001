import React, { Component } from 'react';
import { Page, Divider} from 'epm-ui';

const page = {
  title: "Micro Service"
};

class StartPage extends Component {

  render() {
    return (
        <Page>
          <Divider />
          <h1>{ page.title }</h1>
          <Divider />
          <h3>微服务开发框架是面向企业级的开发平台</h3>
          <Divider />
          <h3>配置简单、页面风格统一、代码结构清晰、可独立运行</h3>
          <h3>提供SDK服务包，使开发更简单、便捷</h3>
          <Divider />
          
          <Divider line />
          
          <Divider />
          <Divider />
          <h3>特色</h3>
          <h6>自动配置并嵌入Tomcat</h6>
          <h6>自动化依赖式管理</h6>
          <h6>度量和健康监测</h6>
          <Divider line />
          <h3>服务</h3>
          <h6>微服务治理spring-cloud</h6>
          <h6>门户及安全</h6>
          <h6>缓存服务</h6>
          <h6>SDK服务包</h6>
          <h6>&nbsp;&nbsp;&nbsp;EPM-UI</h6>
          <h6>&nbsp;&nbsp;&nbsp;ApiJson</h6>
          <h6>&nbsp;&nbsp;&nbsp;MyBatis</h6>
          <h6>&nbsp;&nbsp;&nbsp;Redis</h6>
          <h6>&nbsp;&nbsp;&nbsp;Swagger</h6>
          <h6>&nbsp;&nbsp;&nbsp;Spring Data Jpa</h6>
          <h6>&nbsp;&nbsp;&nbsp;Druid连接池</h6>
          <h6>&nbsp;&nbsp;&nbsp;Xcloud行云数据库</h6>
          <h6>&nbsp;&nbsp;&nbsp;Docker部署</h6>
          <Divider line />
          <h4>环境配置</h4>
          <h6>jdk1.7以上;推荐JDK1.8</h6>
          <h6>Eclipse 4.6以上或者最新版IDEA;推荐eclipse4.6.2</h6>
          <h6>windows64位操作系统/mac操作系统</h6>
          <Divider line />
          <h4>下载项目</h4>
          <h6>git clone ssh://git@code.bonc.com.cn:10022/prc/microservice-ui.git</h6>
          <Divider line />
          <h4>项目搭建</h4>
          <h6>
          	<a href="http://code.bonc.com.cn/prc/microservice-ui/blob/f945e396890893e9d1660defa4a4acf6dfb353a2/docs/微服务框架启动手册(eclipse必看).docx"  target="view_window">
          		eclipse使用说明
          	</a>
          		<Divider />
          	<a href="http://code.bonc.com.cn/confluence/pages/viewpage.action?pageId=10655049" target="view_window">
          	开发环境与运行
          	</a>
          </h6>
          <Divider />
          <h4>运行项目</h4>
          <h6>MicroApplication.java</h6>
        	<a href="../micro/api"  target="view_window">
        	API工具
        	</a>
          <Divider />
        </Page>
    );
  }

}

StartPage.epmUIPage = page;

export default StartPage;
export { StartPage };