import React , { Component } from 'react';
import {
  Container ,
  Layout ,
  Row ,
  Col ,
  Divider ,
  Tree ,
  ButtonGroup ,
  Button ,
  Form ,
  FormItem ,
  Label ,
  Select ,
  Option ,
  Line ,
  Bar ,
  Card ,
  CardBody ,
  Icon ,
  Modal ,
  ModalHeader ,
  ModalBody ,
  Input ,
  popup ,
  Notification ,
  Textarea
} from 'epm-ui';
import { DynamicCharts } from '../components/index';
import '../../styles/platformMonitor.less';

const clone = ( obj ) => {
  let o = null;

  if ( typeof obj == 'object' ) {
    if ( obj === null ) {
      o = null;
    } else if ( obj instanceof Array ) {
      o = [];
      for ( let i = 0 , len = obj.length ; i < len ; i ++ ) {
        o.push ( clone ( obj[ i ] ) );
      }
    } else {
      o = {};
      for ( const j in obj ) {
        o[ j ] = clone ( obj[ j ] );
      }
    }
  } else {
    o = obj;
  }

  return o;
};


//  平台监控页面

const treeData = [ {
  'name' : '资源' ,
  'icon' : 'tree' ,
  'data' : {
    "type" : "resource"
  } ,
  'isLeaf' : false ,
  'expanded' : true ,
  'children' : [] ,
} ];


class PlatformMonitor extends Component {

  constructor ( props ) {
    super ( props );

    this.state = {
      treeData : treeData ,
      timeRate : 5000 ,
    };

    this.handleContextMenu = this.handleContextMenu.bind ( this );
    this.getHostTreeData = this.getHostTreeData.bind ( this );
    this.formatHostTreeData = this.formatHostTreeData.bind ( this );
    this.formatTomaCatTreeData = this.formatTomaCatTreeData.bind ( this );
    this.createModal = this.createModal.bind ( this );
    this.handleRateChange = this.handleRateChange.bind ( this );
    this.addTreeData = this.addTreeData.bind ( this );
    this.updateTreeData = this.updateTreeData.bind ( this );
    this.deleteTreeData = this.deleteTreeData.bind ( this );
  }

  componentDidMount () {
    this.getHostTreeData ();
  }


  /**
   * 获取主机数据节点
   */
  getHostTreeData () {
    const url = `http://172.16.11.52:8081/api/v1.0/host/all`
    fetch ( url , {
      method : 'GET' ,
    } )
      .then ( ( response ) => {
        return response.json ();
      } )
      .then ( ( responseJson ) => {
        if ( responseJson.success ) {
          this.formatHostTreeData ( responseJson.result );
        }

      } )
      .catch ( ( err ) => console.error ( err ) )
  };

  /**
   * 加载子树
   * @param node
   */
  handleLoadMore ( node ) {

    const dataType = node.data.type;

    switch ( dataType ) {
      case 'host':
        return fetch ( `http://172.16.11.52:8081/api/v1.0/tomcat?hostId=${ node.data.id }` , {
          method : 'GET' ,
        } ).then ( ( response ) => {
          return response.json ();
        } ).then ( ( responseJson ) => {
          return this.formatTomaCatTreeData ( responseJson.result );
        } );
        break;
      case 'tomcat':
        return fetch ( `http://172.16.11.52:8081/api/v1.0/app?tomcatId=${ node.data.id }` , {
          method : 'GET' ,
        } ).then ( ( response ) => {
          return response.json ();
        } ).then ( ( responseJson ) => {
          return this.formatAppTreeData ( responseJson.result );
        } );
        break;
    }
    ;
  }

  /**
   * 规范 主机 节点数据类型
   * @param hostData
   */
  formatHostTreeData ( hostData ) {
    const hostTreeData = [];
    for ( const i in hostData ) {
      let host = {};
      host.name = hostData[ i ].name;
      host.isLeaf = false;
      host.children = [];
      host.icon = 'laptop';
      let data = {};
      data.type = "host";
      data.id = hostData[ i ].id;
      data.ip = hostData[ i ].ip;
      data.port = hostData[ i ].port;
      data.user = hostData[ i ].user;
      data.password = hostData[ i ].password;
      host.data = data;
      hostTreeData.push ( host );
    }

    this.state.treeData[ 0 ].children = hostTreeData;

    this.forceUpdate ();

  };

  /**
   * 规范 Tomcat 节点数据类型
   * @param tomcatData
   */
  formatTomaCatTreeData ( tomcatData ) {

    const tomcatTreeData = [];

    for ( const i in tomcatData ) {
      let tomcat = {};
      tomcat.name = tomcatData[ i ].name;
      tomcat.isLeaf = false;
      tomcat.children = [];
      tomcat.icon = 'globe';
      let data = {};
      data.type = "tomcat";
      data.id = tomcatData[ i ].id;
      data.parentId = tomcatData[ i ].host.id;
      data.path = tomcatData[ i ].path;
      data.port = tomcatData[ i ].port;
      data.user = tomcatData[ i ].user;
      data.password = tomcatData[ i ].password;
      tomcat.data = data;
      tomcatTreeData.push ( tomcat );
    }

    return tomcatTreeData;

  };

  /**
   * 规范 App 节点数据类型
   * @param tomcatData
   */
  formatAppTreeData ( AppData ) {

    const AppTreeData = [];

    for ( const i in AppData ) {
      let app = {};
      app.name = AppData[ i ].name;
      app.isLeaf = true;
      app.expanded = true;
      app.children = [];
      app.icon = 'list';
      let data = {};
      data.type = "app";
      data.id = AppData[ i ].id;
      data.parentId = AppData[ i ].tomcat.id;
      data.path = AppData[ i ].path;
      data.version = AppData[ i ].version;
      data.descr = AppData[ i ].descr;
      app.data = data;
      AppTreeData.push ( app );
    }

    return AppTreeData;
  };

  /**
   *
   * @param node 单击树导航跳转到对应页面
   */
  handleSelect ( node ) {

    let PanelData = {};
    PanelData.id = node.data.id;
    PanelData.name = node.name;
    this.setState ( { PanelType : node.data.type , PanelData } );

  };


  /**
   * 改变周期速率
   * @param selectedValue
   */
  handleRateChange ( selectedValue ) {
    this.setState ( {
      timeRate : selectedValue
    } )
  };

  /**
   * 重启关闭开启按钮
   * @param type
   */
  handleControl ( type ) {
    console.log ( type );
  };


  /**
   * 增加和修改 modal
   * @returns {XML}
   */
  createModal () {

    const { AddModalVisible , UpdateModalVisible , nodeInfo } = this.state;


    if ( AddModalVisible ) {

      if ( nodeInfo.data.type === "resource" ) {
        return (
          <Modal visible={ true } onClose={ () => this.setState ( { AddModalVisible : false } ) }>
            <ModalHeader >
              <Icon icon="plus"/> 新增主机节点
            </ModalHeader>
            <ModalBody>
              <Form
                type="horizontal"
                onSubmit={ this.addTreeData }
              >
                <FormItem name="name">
                  <Label>名称：</Label>
                  <Input/>
                </FormItem>
                <FormItem name="ip">
                  <Label>IP地址：</Label>
                  <Input/>
                </FormItem>
                <FormItem name="port">
                  <Label>端口号：</Label>
                  <Input/>
                </FormItem>
                <FormItem name="user">
                  <Label>用户名：</Label>
                  <Input/>
                </FormItem>
                <FormItem name="password">
                  <Label>密码：</Label>
                  <Input/>
                </FormItem>
                <Button type="primary" htmlType="submit" style={{ marginRight : '15px' }}>
                  保存
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        );
      } else if ( nodeInfo.data.type === "host" ) {
        return (
          <Modal visible={ true } onClose={ () => this.setState ( { AddModalVisible : false } ) }>
            <ModalHeader >
              <Icon icon="plus"/> 新增Tomcat节点
            </ModalHeader>
            <ModalBody>
              <Form
                type="horizontal"
                onSubmit={ this.addTreeData }
              >
                <FormItem name="name">
                  <Label>名称：</Label>
                  <Input/>
                </FormItem>
                <FormItem name="path">
                  <Label>路径：</Label>
                  <Input/>
                </FormItem>
                <FormItem name="port">
                  <Label>端口号：</Label>
                  <Input/>
                </FormItem>
                <FormItem name="user">
                  <Label>用户名：</Label>
                  <Input/>
                </FormItem>
                <FormItem name="password">
                  <Label>密码：</Label>
                  <Input/>
                </FormItem>
                <Button type="primary" htmlType="submit" style={{ marginRight : '15px' }}>
                  保存
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        );
      } else if ( nodeInfo.data.type === "tomcat" ) {
        return (
          <Modal visible={ true } onClose={ () => this.setState ( { AddModalVisible : false } ) }>
            <ModalHeader >
              <Icon icon="plus"/> 新增App节点
            </ModalHeader>
            <ModalBody>
              <Form
                type="horizontal"
                onSubmit={ this.addTreeData }
              >
                <FormItem name="name">
                  <Label>名称：</Label>
                  <Input/>
                </FormItem>
                <FormItem name="path">
                  <Label>路径：</Label>
                  <Input/>
                </FormItem>
                <FormItem name="version">
                  <Label>版本号：</Label>
                  <Input/>
                </FormItem>
                <FormItem name="descr">
                  <Label>描述：</Label>
                  <Textarea/>
                </FormItem>
                <Button type="primary" htmlType="submit" style={{ marginRight : '15px' }}>
                  保存
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        );
      }

    } else if ( UpdateModalVisible ) {

      if ( nodeInfo.data.type === "host" ) {

        return (
          <Modal visible={ true } onClose={ () => this.setState ( { UpdateModalVisible : false } ) }>
            <ModalHeader >
              <Icon icon="pencil"/> 修改主机节点
            </ModalHeader>
            <ModalBody>
              <Form
                type="horizontal"
                onSubmit={ this.updateTreeData }
              >
                <FormItem name="name">
                  <Label>名称：</Label>
                  <Input value={ nodeInfo.name }/>
                </FormItem>
                <FormItem name="ip">
                  <Label>IP地址：</Label>
                  <Input value={ nodeInfo.data.ip }/>
                </FormItem>
                <FormItem name="port">
                  <Label>端口号：</Label>
                  <Input value={ nodeInfo.data.port }/>
                </FormItem>
                <FormItem name="user">
                  <Label>用户名：</Label>
                  <Input value={ nodeInfo.data.user }/>
                </FormItem>
                <FormItem name="password">
                  <Label>密码：</Label>
                  <Input value={ nodeInfo.data.password }/>
                </FormItem>
                <Button type="primary" htmlType="submit" style={{ marginRight : '15px' }}>
                  保存
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        )
      } else if ( nodeInfo.data.type === "tomcat" ) {
        return (
          <Modal visible={ true } onClose={ () => this.setState ( { UpdateModalVisible : false } ) }>
            <ModalHeader >
              <Icon icon="pencil"/> 修改Tomcat节点
            </ModalHeader>
            <ModalBody>
              <Form
                type="horizontal"
                onSubmit={ this.updateTreeData }
              >
                <FormItem name="name">
                  <Label>名称：</Label>
                  <Input value={ nodeInfo.name }/>
                </FormItem>
                <FormItem name="path">
                  <Label>路径：</Label>
                  <Input value={ nodeInfo.data.path }/>
                </FormItem>
                <FormItem name="port">
                  <Label>端口号：</Label>
                  <Input value={ nodeInfo.data.port }/>
                </FormItem>
                <FormItem name="user">
                  <Label>用户名：</Label>
                  <Input value={ nodeInfo.data.user }/>
                </FormItem>
                <FormItem name="password">
                  <Label>密码：</Label>
                  <Input value={ nodeInfo.data.password }/>
                </FormItem>
                <Button type="primary" htmlType="submit" style={{ marginRight : '15px' }}>
                  保存
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        );
      } else if ( nodeInfo.data.type === "app" ) {
        return (
          <Modal visible={ true } onClose={ () => this.setState ( { UpdateModalVisible : false } ) }>
            <ModalHeader >
              <Icon icon="pencil"/> 修改App节点
            </ModalHeader>
            <ModalBody>
              <Form
                type="horizontal"
                onSubmit={ this.updateTreeData }
              >
                <FormItem name="name">
                  <Label>名称：</Label>
                  <Input value={ nodeInfo.name }/>
                </FormItem>
                <FormItem name="path">
                  <Label>路径：</Label>
                  <Input value={ nodeInfo.data.path }/>
                </FormItem>
                <FormItem name="version">
                  <Label>版本号：</Label>
                  <Input value={ nodeInfo.data.version }/>
                </FormItem>
                <FormItem name="descr">
                  <Label>描述：</Label>
                  <Textarea value={ nodeInfo.data.descr }/>
                </FormItem>
                <Button type="primary" htmlType="submit" style={{ marginRight : '15px' }}>
                  保存
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        );
      }
    }


  };


  /**
   * tree 右键菜单
   * @param nodeData
   * @returns {*}
   */
  handleContextMenu ( node ) {

    let menuData = [];

    if ( node.data.type === "resource" ) {
      menuData = [
        {
          title : '注册主机节点' , link : () => {
          this.setState ( {
            AddModalVisible : true ,
            nodeInfo : node
          } );
        }
        }
      ]
    }

    if ( node.data.type === "host" ) {
      menuData = [
        {
          title : '修改主机节点' , link : () => {
          this.setState ( {
            UpdateModalVisible : true ,
            nodeInfo : node
          } );
        }
        } ,
        {
          title : '删除主机节点' , link : () => {
          this.setState ( {
            nodeInfo : node
          } , () => {
            this.deleteTreeData ();
          } )
        }
        } ,
        {
          title : '注册Tomcat节点' , link : () => {
          this.setState ( {
            AddModalVisible : true ,
            nodeInfo : node
          } );
        }
        } ,
      ]
      ;
    }

    if ( node.data.type === 'tomcat'
    ) {
      menuData = [
        {
          title : '修改Tomcat节点' , link : () => {
          this.setState ( {
            UpdateModalVisible : true ,
            nodeInfo : node
          } );
        }
        } ,
        {
          title : '删除Tomcat节点' , link : () => {
          this.setState ( {
            nodeInfo : node
          } , () => {
            this.deleteTreeData ();
          } )
        }
        } ,
        {
          title : '注册应用节点' , link : () => {
          this.setState ( {
            AddModalVisible : true ,
            nodeInfo : node
          } );
        }
        } ,
      ];
    }

    if ( node.data.type === 'app' ) {
      menuData = [
        {
          title : '修改应用节点' , link : () => {
          this.setState ( {
            UpdateModalVisible : true ,
            nodeInfo : node
          } );
        }
        } ,
        {
          title : '删除应用节点' , link : () => {
          this.setState ( {
            nodeInfo : node
          } , () => {
            this.deleteTreeData ();
          } )
        }
        } ,
      ];
    }

    return menuData;
  };

  /**
   * 节点注册
   * @param data
   */
  addTreeData ( data ) {
    const { nodeInfo } = this.state;

    let url = "";

    if ( nodeInfo.data.type === "resource" ) {

      url = `http://172.16.11.52:8081/api/v1.0/host?name=${ data.name }&user=${ data.user }&ip=${ data.ip }&port=${ data.port }&password=${ data.password }`;

    } else if ( nodeInfo.data.type === "host" ) {

      url = `http://172.16.11.52:8081/api/v1.0/tomcat?host.id=${ nodeInfo.data.id }&name=${ data.name }&user=${ data.user }&path=${ data.path }&port=${ data.port }&password=${ data.password }`;

    } else if ( nodeInfo.data.type === "tomcat" ) {

      url = `http://172.16.11.52:8081/api/v1.0/app?tomcat.id=${ nodeInfo.data.id }&name=${ data.name }&version=${ data.version }&path=${ data.path }&descr=${ data.descr }`;

    }

    fetch ( url , {
      method : 'POST' ,
    } )
      .then ( ( response ) => {
        return response.json ();
      } )
      .then ( ( responseJson ) => {
        if ( responseJson.success ) {
          this.setState ( {
            AddModalVisible : false ,
          } , () => {
            this.getHostTreeData ();
            this.forceUpdate ();
          } );
        } else {
          this.notification = <Notification
            message="平台监控页面"
            key={ Math.random ().toString () }
            description="添加失败！"
          />;
          popup ( this.notification );
        }

      } )
      .catch ( ( err ) => console.error ( err ) )

  };


  /**
   * 节点修改
   * @param data
   */
  updateTreeData ( data ) {
    const { nodeInfo } = this.state;

    let url = '';

    if ( nodeInfo.data.type === "host" ) {

      url = `http://172.16.11.52:8081/api/v1.0/host?id=${ nodeInfo.data.id }&name=${ data.name }&user=${ data.user }&ip=${ data.ip }&port=${ data.port }&password=${ data.password }`;

    } else if ( nodeInfo.data.type === "tomcat" ) {

      url = `http://172.16.11.52:8081/api/v1.0/tomcat?host.id=${ nodeInfo.data.parentId }&id=${ nodeInfo.data.id }&name=${ data.name }&user=${ data.user }&path=${ data.path }&port=${ data.port }&password=${ data.password }`;

    } else if ( nodeInfo.data.type === "app" ) {

      url = `http://172.16.11.52:8081/api/v1.0/app?tomcat.id=${ nodeInfo.data.parentId }&id=${ nodeInfo.data.id }&name=${ data.name }&path=${ data.path }&version=${ data.version }&descr=${ data.descr }`;

    }

    fetch ( url , {
      method : 'PUT' ,
    } )
      .then ( ( response ) => {
        return response.json ();
      } )
      .then ( ( responseJson ) => {
        if ( responseJson.success ) {
          this.setState ( {
            UpdateModalVisible : false ,
          } , () => {
            this.getHostTreeData ();
            this.forceUpdate ();
          } );
        } else {
          this.notification = <Notification
            message="平台监控页面"
            key={ Math.random ().toString () }
            description="修改失败！"
          />;
          popup ( this.notification );
        }

      } )
      .catch ( ( err ) => console.error ( err ) )

  };

  /**
   * 节点删除
   * @param data
   */
  deleteTreeData ( data ) {
    const { nodeInfo } = this.state;

    const url = `http://172.16.11.52:8081/api/v1.0/${ nodeInfo.data.type }/${ nodeInfo.data.id }`;

    fetch ( url , {
      method : 'DELETE' ,
    } )
      .then ( ( response ) => {
        return response.json ();
      } )
      .then ( ( responseJson ) => {
        if ( responseJson.success ) {
          this.getHostTreeData ();
          this.forceUpdate ();
        } else {
          this.notification = <Notification
            message="平台监控页面"
            key={ Math.random ().toString () }
            description="删除失败！"
          />;
          popup ( this.notification );
        }

      } )
      .catch ( ( err ) => console.error ( err ) )

  };


  /**
   * 生成右侧面板
   * @returns {XML}
   */
  createPanel () {
    const { PanelType , PanelData , timeRate } = this.state;

    const Data = [
      {
        item : '2013' ,
        data : [
          {
            key : '衬衫' ,
            value : 30
          } ,
          {
            key : '裤子' ,
            value : 20
          } ,
          {
            key : '袜子' ,
            value : 10
          } ,
          {
            key : '裙子' ,
            value : 40
          }
        ]
      }
    ];

    if ( PanelType === "host" ) {

      return (
        <Container type="fluid">
          <Row>
            <Col>
              <div className="header">
                <div className="headerName">
                  { PanelData.name  }
                </div>
                <div className="headerControl">
                  <ButtonGroup>
                    <Button onClick={ this.handleControl.bind ( this , 3 ) }><Icon icon="undo"/> 重启</Button>
                  </ButtonGroup>
                </div>
                <div className="headerControl">
                  <Form
                    type="inline"
                  >
                    <FormItem name="input">
                      <Label>更新周期 ：</Label>
                      <Select name="select" value="5000" onChange={ this.handleRateChange } showClear={ false }>
                        <Option value="1000">1s</Option>
                        <Option value="5000">5s</Option>
                        <Option value="10000">10s</Option>
                      </Select>
                    </FormItem>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col size={ { small : 24 , medium : 12 , large : 12 } }>
              <Card>
                <CardBody style={{ backgroundColor : "#fff" }}>
                  <DynamicCharts
                    title="CPU"
                    fetch={ `http://172.16.11.52:8081/api/v1.0/${ PanelType }/${ PanelData.id }/status/cpu` }
                    timeRate={ timeRate }
                    yAxisName="%"
                    chartsType="hostCommonLine"
                  />
                </CardBody>
              </Card>
            </Col>
            <Col size={ { small : 24 , medium : 12 , large : 12 } }>
              <Card>
                <CardBody style={{ backgroundColor : "#fff" }}>
                  <DynamicCharts
                    title="内存"
                    fetch={ `http://172.16.11.52:8081/api/v1.0/${ PanelType }/${ PanelData.id }/status/mem` }
                    timeRate={ timeRate }
                    yAxisName="g"
                    area="area"
                    chartsType="hostCommonLine"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Divider/>
          <Row>
            <Col size={ { small : 24 , medium : 12 , large : 12 } }>
              <Card>
                <CardBody style={{ backgroundColor : "#fff" }}>
                  <DynamicCharts
                    title="磁盘"
                    fetch={ `http://172.16.11.52:8081/api/v1.0/${ PanelType }/${ PanelData.id }/status/disk` }
                    timeRate={ timeRate }
                    yAxisName="g"
                    area="area"
                    chartsType="hostCommonLine"
                  />
                </CardBody>
              </Card>
            </Col>
            <Col size={ { small : 24 , medium : 12 , large : 12 } }>
              <Card>
                <CardBody style={{ backgroundColor : "#fff" }}>
                  <DynamicCharts
                    title="网络"
                    fetch={ `http://172.16.11.52:8081/api/v1.0/${ PanelType }/${ PanelData.id }/status/net` }
                    timeRate={ timeRate }
                    yAxisName="kb/s"
                    chartsType="hostNet"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Divider/>
          <Row>
            <Col>
              <Card>
                <CardBody style={{ backgroundColor : "#fff" }}>
                  {/*<DynamicCharts*/}
                  {/*title="进程"*/}
                  {/*fetch={ `http://172.16.11.52:8081/api/v1.0/${ PanelType }/${ PanelData.id }/status/process` }*/}
                  {/*timeRate={ timeRate }*/}
                  {/*yAxisName="进程前十名"*/}
                  {/*chartsType="hostProcess"*/}
                  {/*/>*/}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )
    } else if ( PanelType === "tomcat" ) {
      return (
        <Container type="fluid">
          <Row>
            <Col>
              <div className="header">
                <div className="headerName">
                  { PanelData.name  }
                </div>
                <div className="headerControl">
                  <ButtonGroup>
                    <Button onClick={ this.handleControl.bind ( this , 1 ) }><Icon icon="play"/> 启动</Button>
                    <Button onClick={ this.handleControl.bind ( this , 2 ) }><Icon icon="power-off"/> 关机</Button>
                    <Button onClick={ this.handleControl.bind ( this , 3 ) }><Icon icon="undo"/> 重启</Button>
                  </ButtonGroup>
                </div>
                <div className="headerControl">
                  <Form
                    type="inline"
                  >
                    <FormItem name="input">
                      <Label>更新周期 ：</Label>
                      <Select name="select" value="5s">
                        <Option value="1s">1s</Option>
                        <Option value="5s">5s</Option>
                        <Option value="10s">10s</Option>
                      </Select>
                    </FormItem>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col size={ { small : 24 , medium : 12 , large : 12 } }>
              <Card>
                <CardBody style={{ backgroundColor : "#fff" }}>
                  <Line dataSource={ Data } title="JVM内存:30%"/>
                </CardBody>
              </Card>
            </Col>
            <Col size={ { small : 24 , medium : 12 , large : 12 } }>
              <Card>
                <CardBody style={{ backgroundColor : "#fff" }}>
                  <Line dataSource={ Data } title="JVM内存池:50%"/>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Divider/>
          <Row>
            <Col>
              <Card>
                <CardBody style={{ backgroundColor : "#fff" }}>
                  <Line dataSource={ Data } title="线程:30%"/>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Divider/>
          <Row>
            <Col>
              <Card>
                <CardBody style={{ backgroundColor : "#fff" }}>
                  <Bar dataSource={ Data } title="慢线程排名"/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )
    } else if ( PanelType === "app" ) {
      return (
        <Container type="fluid">
          <Row>
            <Col>
              <div className="header">
                <div className="headerName">
                  { PanelType }
                </div>
                <div className="headerControl">
                  <ButtonGroup>
                    <Button onClick={ this.handleControl.bind ( this , 1 ) }><Icon icon="play"/> 启动</Button>
                    <Button onClick={ this.handleControl.bind ( this , 2 ) }><Icon icon="power-off"/> 关机</Button>
                    <Button onClick={ this.handleControl.bind ( this , 3 ) }><Icon icon="undo"/> 重启</Button>
                  </ButtonGroup>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col size={ { small : 24 , medium : 12 , large : 12 } }>
              <Card>
                <CardBody style={{ backgroundColor : "#fff" }}>
                  <Line dataSource={ Data } title="CPU:30%"/>
                </CardBody>
              </Card>
            </Col>
            <Col size={ { small : 24 , medium : 12 , large : 12 } }>
              <Card>
                <CardBody style={{ backgroundColor : "#fff" }}>
                  <Line dataSource={ Data } title="内存:50%"/>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Divider/>
          <Row>
            <Col size={ { small : 24 , medium : 12 , large : 12 } }>
              <Card>
                <CardBody style={{ backgroundColor : "#fff" }}>
                  <Line dataSource={ Data } title="网络:30%"/>
                </CardBody>
              </Card>
            </Col>
            <Col size={ { small : 24 , medium : 12 , large : 12 } }>
              <Card>
                <CardBody style={{ backgroundColor : "#fff" }}>
                  <Line dataSource={ Data } title="磁盘:50%"/>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Divider/>
          <Row>
            <Col>
              <Card>
                <CardBody style={{ backgroundColor : "#fff" }}>
                  <Bar dataSource={ Data } title="进程:50%"/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )
    }


  }


  render () {

    return (
      <Layout fullScreen>
        <Layout.Sider width={ 237 } style={{
          position : 'fixed' ,
          width : "237px" ,
          top : '16px' ,
          bottom : '50px' ,
          left : '16px' ,
          background : '#fff' ,
          borderRadius : '2px' ,
          border : '1px #e5e6e7' ,
        }}>
          <div >
            <Tree
              dataSource={ clone ( this.state.treeData ) }
              onSelect={ this.handleSelect.bind ( this ) }
              contextMenu={ this.handleContextMenu }
              loadMore={ this.handleLoadMore.bind ( this ) }
            />
          </div>
        </Layout.Sider>
        <Layout>
          <Layout.Content>
            <div style={ {
              position : "relative" ,
              marginLeft : "30px" ,
              borderRadius : '2px' ,
              border : '1px #e5e6e7' ,
              top : '16px'
            } }>
              { this.createPanel () }
            </div>
            { this.createModal () }
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }

}

export default PlatformMonitor;