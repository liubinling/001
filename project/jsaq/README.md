当前版本号V0.1.2

1.开发运行环境：

	jdk1.7以上
	
	eclipse4.6以上/IDEA最新版
	
	windows64位操作系统/mac操作系统

2.<a href="http://code.bonc.com.cn/confluence/pages/viewpage.action?pageId=10655040">相关资源</a> 	

	http://code.bonc.com.cn/confluence/pages/viewpage.action?pageId=10655040

3.git下载地址 

	ssh://git@code.bonc.com.cn:10022/prc/microservice-ui.git
	
	https://code.bonc.com.cn/prc/microservice-ui.git

4.相关组件版本介绍

	epm-ui:0.4.18
	
	epm-ui-css：0.1.13
	
	swagger:2.6.1
	
	缓存服务:0.0.1
	
	mybatis:1.1.1
	
	spring-boot-starter-parent：1.5.6.RELEASE
		
	druid：1.0.25
		
	ojdbc7：1.0
		
	xcloud:2.0.8
		
	bonc-sso-client：2.2.0
		
	bonc-jdbc：0.0.1
		
	bonc-commons-core:2.4.0

5.目录介绍

	src
		
		main
		
			java–---后台代码
			
				com.bonc.common----项目公共配置文件
				
				com.bonc.micro--------应用开发
				
					common---------存放应用开发的配置文件或者公共方法
					
					controller--------控制层
					
					service-----------逻辑层
					
					domain-----------实体类
					
					mapper----------访问数据库mapper的接口
					
			resources—存放资源配置等
			
				conf-------------------------存放配置文件
				
					dev------------------开发环境配置文件
					
					prepare------------准备正式环境配置文件
					
					product-------------正式环境配置文件
					
					test------------------测试环境配置文件
					
				mybatisMapper-----------存放sql
				
				static
				
					icons-----------------存放前端框架图标
					
					style-----------------存放css,image等静态资源
					
			frontend----------------------存放的是页面文件、自定义组件及 EPM UI 组件等
			
				components---------用于存放您的工程所需的自定义组
				
				frame-----------------前端框架文件
				
				tasks------------------存放 node 相关的任务流程及路径的配置文件
				
				views-----------------存放您所需开发的页面。页面文件以 .jsx 的形式存储，以 React + es6 的模式开发。
				
		test.java.com.bonc.micro--------用来写单元测试