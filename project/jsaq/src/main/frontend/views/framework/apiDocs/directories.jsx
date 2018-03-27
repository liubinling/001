import React, { Component } from 'react';
import { Container, Divider, Col, Row, Tree, Tabs, Tab, RadioGroup, Radio } from 'epm-ui';

const page = {
		  title: "目录结构"
		};

class DirectoriesPage extends Component {
  
constructor( props ) {
    super( props );

    this.state = {
      desc: '',
      nodeId: '',
      nodeName: '',
      capture: '0'
    };

    this.handleSelect = this.handleSelect.bind( this );
    this.handleExpand = this.handleExpand.bind( this );
    this.handleCheck = this.handleCheck.bind( this );
  }

  handleSelect( node, isSelected, selectedNodes, event ) {
    this.setState( { nodeId: node.id, nodeName: node.name ,desc: node.desc} );
  }

  handleExpand( node, isSelected, selectedNodes, event ) {
    this.setState( { nodeId: node.id, nodeName: node.name ,desc: node.desc} );
  }

  handleCheck( node, isChecked, checkedNodes ) {
	this.setState( { nodeId: node.id, nodeName: node.name ,desc: node.desc} );
  }

  render() {  
  const codeExample1 = `
例:
<groupId>com.bonc.microservice</groupId>        --><groupId>com.bonc.xxxxxx</groupId>
<artifactId>microservice-ui</artifactId>        --><artifactId>xxxxxxxxxxxx</artifactId>
<version>0.0.3-SNAPSHOT</version>               --><version>x.x.x</version>
  		  		      `.trim();
  const codeExample2 = `
例:
"name": "microservice-ui"                       -->"name": "xxxxxxxxxxxx"
"version": "0.0.3"                              -->"version": "x.x.x"
"description": "microservice-ui"                -->"description": "xxxxxxxxxxxx"
  		      `.trim();	  
  const codeExample3 = `
例:
"name": "microservice-ui"                       -->"name": "xxxxxxxxxxxx"
"description": "microservice-ui"                -->"description": "xxxxxxxxxxxx"
  		      `.trim();
  const codeExample4 = `
例:
server.port=8080                                -->8088
server.context-path=/microservice-ui            -->/xxxxxxxxxxxx
		  		      `.trim();
	  
	  const treeData = [
      {
        'id': '1',
        'name': 'src',
        'desc':'根目录',
        'expanded': true,
        'children': [
          {
            'id': '1-1',
            'name': 'main',
            'desc':'main目录',
            'expanded': true,
            'children': [
              {
                'id': '1-1-1',
                'name': 'java',
                'desc':'Java目录',
                'expanded': true,
                'children': [
                  {
                    'id': '1-1-1-1',
                    'name': 'com',
                    'desc':'目录',
                    'expanded': true,
                    'children':[
                    	{
                    		'id': '1-1-1-1-1',
                            'name': 'bonc',
                            'desc':'目录',
                            'expanded': true,
                            'children':[
                            	{
                            		'id': '1-1-1-1-1-1',
                                    'name': 'common',
                                    'desc':'系统公共配置',
                                    'children':[
                                    	{
                                    		'id': '1-1-1-1-1-1-1',
                                            'name': '...',
                                            'desc':'...'
                                    	}
                                    ]
                            	},
                            	{
                            		'id': '1-1-1-1-1-2',
                                    'name': 'micro',
                                    'desc':'应用名称',
                                    'children':[
                                    	{
                                    		'id': '1-1-1-1-1-2-1',
                                            'name': 'common',
                                            'desc':'应用公共配置，公共方法等',
                                            'children':[
                                            	{
                                            		'id': '1-1-1-1-1-2-1-1',
                                                    'name': 'utils',
                                                    'desc':'工具类',
                                                    'children':[
                                                    	{
                                                    		'id': '1-1-1-1-1-2-1-1-1',
                                                            'name': '...',
                                                            'desc':'...'
                                                    	}
                                                    ]
                                            	}
                                            ]
                                    	},
                                    	{
                                    		'id': '1-1-1-1-1-2-2',
                                            'name': 'controller',
                                            'desc':'业务处理',
                                            'children':[
                                            	{
                                            		'id': '1-1-1-1-1-2-2-1',
                                                    'name': '...',
                                                    'desc':'...'
                                            	}
                                            ]
                                    	},
                                    	{
                                    		'id': '1-1-1-1-1-2-3',
                                            'name': 'domain',
                                            'desc':'实体',
                                            'children':[
                                            	{
                                            		'id': '1-1-1-1-1-2-3-1',
                                                    'name': '...',
                                                    'desc':'...'
                                            	}
                                            ]
                                    	},
                                    	{
                                    		'id': '1-1-1-1-1-2-6',
                                            'name': 'mapper',
                                            'desc':'存放SQL',
                                            'children':[
                                            	{
                                            		'id': '1-1-1-1-1-2-6-1',
                                                    'name': '...',
                                                    'desc':'...'
                                            	}
                                            ]
                                    	},
                                    	{
                                    		'id': '1-1-1-1-1-2-4',
                                            'name': 'service',
                                            'desc':'业务逻辑服务',
                                            'children':[
                                            	{
                                            		'id': '1-1-1-1-1-2-4-1',
                                                    'name': '...',
                                                    'desc':'...'
                                            	}
                                            ]
                                    	},
                                    	{
                                    		'id': '1-1-1-1-1-2-5',
                                            'name': 'MicroApplication.java',
                                            'desc':'应用入口'
                                    	}
                                    ]
                            	}
                            ]
                    	}
                    ]
                  }
                ]
              },
              {
                'id': '1-1-2',
                'name': 'frontend',
                'desc':'frontend 文件夹中存放的是页面文件、自定义组件及 EPM UI 组件等',
                'children': [
                  {
                    'id': '1-1-2-1',
                    'name': 'components',
                    'desc':'用于存放您的工程所需的自定义组件。'
                  },
                  {
                    'id': '1-1-2-2',
                    'name': 'frame',
                    'desc':'epmui框架文件'
                  },
                  {
                      'id': '1-1-2-4',
                      'name': 'tasks',
                      'desc':'存放 node 相关的任务流程及路径的配置文件。'
                   },
                   {
                        'id': '1-1-2-5',
                        'name': 'views',
                        'desc':'存放您所需开发的页面。页面文件以 .jsx 的形式存储，以 React + es6 的模式开发。'
                   },
                   {
                       'id': '1-1-2-6',
                       'name': 'bower.json',
                       'desc':'bower.json 里面 dependencies 中存放的是所需插件的配置和版本信息'
                   },
                   {
                        'id': '1-1-2-7',
                        'name': 'gulpfile.js',
                        'desc':'gulp配置'
                   },
                   {
                        'id': '1-1-2-8',
                        'name': 'LICENSE',
                        'desc':'存放的是版权的相关信息'
                   },
                   {
                        'id': '1-1-2-9',
                        'name': 'package.json',
                        'desc':'本项目的基本相关信息及依赖包的配置信息，另外还有 gulp 命令的一些配置，例如 bulid、dist、postinstall、 watch等等。'
                   }
                ]
              },
              {
                  'id': '1-1-3',
                  'name': 'resources',
                  'desc':'resource 文件夹中存放的是项目所需配置文件、静态资源及编译后的 .js 文件资源。',
                  'children': [
                    {
                      'id': '1-1-3-1',
                      'name': 'conf',
                      'desc':'配置文件目录，里面存放项目整体配置包括数据库连接、门户安全、权限、端口号等信息',
                      'children':[
                    	  {
	                    	  'id': '1-1-3-1-1',
	                          'name': 'dev',
	                          'desc':'dev',
	                          'children':[
	                        	  {
	    	                    	  'id': '1-1-3-1-1-1',
	    	                          'name': 'application.properties',
	    	                          'desc':'application.properties'
	                        	  },
	                        	  {
	    	                    	  'id': '1-1-3-1-1-2',
	    	                          'name': 'bonc-security-base.properties',
	    	                          'desc':'安全路径配置'
	                        	  },
	                        	  {
	    	                    	  'id': '1-1-3-1-1-5',
	    	                          'name': 'cache.properties',
	    	                          'desc':'缓存服务配置文件'
	                        	  },
	                        	  {
	    	                    	  'id': '1-1-3-1-1-3',
	    	                          'name': 'db.properties',
	    	                          'desc':'数据库别名配置'
	                        	  },
	                        	  {
	    	                    	  'id': '1-1-3-1-1-4',
	    	                          'name': 'system-setting.properties',
	    	                          'desc':'第三方资源配置信息，目前包括sftp、ftp下载配置等'
	                        	  }
	                           ]
                    	  },
                    	  {
	                    	  'id': '1-1-3-1-2',
	                          'name': 'prepare',
	                          'desc':'动态配置文件同dev'
                    	  },
                    	  {
	                    	  'id': '1-1-3-1-3',
	                          'name': 'product',
	                          'desc':'动态配置文件同dev'
                    	  },
                    	  {
	                    	  'id': '1-1-3-1-4',
	                          'name': '...',
	                          'desc':'...'
                    	  }
                      ]
                    },
                    {
                      'id': '1-1-3-2',
                      'name': 'mybatisMapper',
                      'desc':'存放sql'
                    },
                    {
                        'id': '1-1-3-3',
                        'name': 'static',
                        'desc':'静态文件目录,包括编译后生成的epmui文件',
                        'children': [
                            {
                              'id': '1-1-3-3-1',
                              'name': 'icons',
                              'desc':'存放epmui图标'
                            },
                            {
                              'id': '1-1-3-3-2',
                              'name': 'style',
                              'desc':'存放css,img等'
                            }
                          ]
                    },
                    {
                    	'id':'1-1-3-4',
                    	'name':'log4j.properties',
                    	'desc':'日志配置文件'
                    },
                    {
                    	'id':'1-1-3-5',
                    	'name':'mybatis-config.xml',
                    	'desc':'mybatis配置'
                    }
                  ]
                }
            ]
          },
          {
          	'id':'4',
          	'name':'test',
          	'desc':'测试目录，用来编写单元测试',
          	'children': [
                   {
                     'id': '4-1',
                     'name': 'java.com.bonc.micro',
                     'desc':'测试目录，用来编写单元测试'
                   }
                 ]
         }
        ]
      },{
    	  'id':'2',
    	  'name':'docs',
          'desc':'文档'
      },{
    	  'id':'3',
    	  'name':'pom.xml',
          'desc':'项目依赖，打包'
      }
      
      
    ];
  
    return (
    <Container>
    <Divider />
    <h1>{ page.title }</h1>
    <Divider />
    <Divider />
      <Row>
        <Col size={ 12 }>
          <Tree dataSource={ treeData }
                multiple={ false }
                checkable={ false }
                onSelect={ this.handleSelect }
                onExpand={ this.handleExpand }
                onCheck={ this.handleCheck }
                capture={ this.state.capture }
          />
          </Col>
          <Col size={ 12 }>
          <Divider />
          <Divider />
          <Divider />
          <h5>
            {
              this.state.nodeId ? '说 明: ' + this.state.desc : '请单击节点查看解释'
            }
          </h5>
          </Col>
          <Col size={ 24 }>
	          <Divider />
	          <h5>修改项目名称需注意事项</h5>
	          <h5>1.修改pom.xml文件</h5>
	          <pre style={{background:'#f1f0f0'}}>
	            <code className="xml">
	              <h5>{ codeExample1 }</h5>
	            </code>
	          </pre>
	          <Divider />
	          <h5>2.修改package.json</h5>
	          <pre style={{background:'#f1f0f0'}}>
	            <code className="xml">
	              <h5>{ codeExample2 }</h5>
	            </code>
	          </pre>
	     	  <Divider />
	     	  <h5>3.修改bower.json</h5>
	     	  <pre style={{background:'#f1f0f0'}}>
	            <code className="xml">
	              <h5>{ codeExample3 }</h5>
	            </code>
	          </pre>
	     	  <Divider />
	     	  <h5>4.修改conf下application.properties文件</h5>
	     	  <pre style={{background:'#f1f0f0'}}>
	            <code className="xml">
	              <h5>{ codeExample4 }</h5>
	            </code>
	          </pre>
	     	  <Divider />
	     	  <h5>5.修改dockerfiles文件</h5>
	     	  <pre>
	            <code className="xml">
	              <h5>如果docker部署需要修改</h5>
	            </code>
	          </pre>
          </Col>
      </Row>
     </Container>
    );
  }

}

DirectoriesPage.epmUIPage = page;

export { DirectoriesPage };
export default DirectoriesPage;