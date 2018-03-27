import React , { Component } from 'react';
import {
  Container ,
  Row ,
  Col ,
  Divider ,
  Form ,
  FormItem ,
  Label ,
  Input ,
  Button ,
  Icon ,
  PagiTable ,
  fetch ,
  Img ,
  popup ,
  Dialog ,
  Alert ,
  Notification ,
  popover ,
  Loading ,
  Select ,
  Option ,
  Modal ,
  ModalHeader ,
  ModalBody ,
  TreeSelect ,
  Upload ,
  Card ,
  CardBody ,
  CardHeader
} from 'epm-ui';
import { Wrapper } from '../../components/index'


// 地域信息

class areaMan extends Component {

  constructor ( props ) {
    super ( props );

    this.state = {
      areaName : '' ,
      typeId : '' ,
      fatherAreaId : '' ,
      sortIndex : 'id' ,
      sortOrder : 'desc' ,
      pageIndex : 1 ,
      pageSize : 10 ,
      tableData : {} ,
      treeSelectData : [] ,
      ids : []
    };

    this.formatTableData = this.formatTableData.bind ( this );
    this.getSelectData = this.getSelectData.bind ( this );
    this.getTableData = this.getTableData.bind ( this );
    this.handleCheck = this.handleCheck.bind ( this );
    this.handleTableChange = this.handleTableChange.bind ( this );
    this.formTirgger = this.formTirgger.bind ( this );
    this.queryTableData = this.queryTableData.bind ( this );
    this.updateTableData = this.updateTableData.bind ( this );
    this.createModal = this.createModal.bind ( this );
    this.addTableData = this.addTableData.bind ( this );
    this.handleAfterLoad = this.handleAfterLoad.bind ( this );
  }

  componentDidMount () {
    this.getTableData ();
    this.getSelectData ();
  }

  /**
   * 获取 Table 数据
   */
  getTableData () {
    const url = `http://172.16.11.52:8081/api/v1.0/area?areaName=${ this.state.areaName }&type.id=${ this.state.typeId }&fatherArea.id=${ this.state.fatherAreaId }&order=${ this.state.sortOrder }&sort=${ this.state.sortIndex }&page=${ this.state.pageIndex }&rows=${ this.state.pageSize }`;

    fetch ( url , {
      method : 'GET' ,
    } )
      .then ( ( response ) => {
        return response.json ();
      } )
      .then ( ( responseJson ) => {
        if ( responseJson.success ) {
          this.formatTableData ( responseJson.result );
        }
      } )
      .catch ( ( err ) => console.error ( err ) )
  };

  /**
   * 规范Table数据
   * @param result
   */
  formatTableData ( result ) {

    const TableData = [];

    for ( const i in result.rows ) {
      const data = {};
      data.id = result.rows[ i ].id;
      data.areaName = result.rows[ i ].areaName;
      data.number = result.rows[ i ].number;
      data.typeName = result.rows[ i ].type.name;
      data.typeId = result.rows[ i ].type.id;
      if ( result.rows[ i ].fatherArea != null ) {
        data.fatherAreaName = result.rows[ i ].fatherArea.areaName;
        data.fatherAreaId = result.rows[ i ].fatherArea.id;
      } else {
        data.fatherArea = "";
      }

      TableData.push ( data );
    }
    this.setState ( {
      pageTotal : result.total ,
      tableData : TableData ,
    } );
  };

  /**
   * 规范下拉框数据
   * @constructor
   */
  getSelectData () {
    const url = `http://172.16.11.52:8081/api/v1.0/areaType`;

    fetch ( url , {
      method : 'GET' ,
    } )
      .then ( ( response ) => {
        return response.json ();
      } )
      .then ( ( responseJson ) => {

        const selectData = [];

        if ( responseJson.success ) {

          responseJson.result.forEach ( ( item ) => {
            const selectOb = {};
            selectOb.value = item.id.toString ();
            selectOb.text = item.name;
            selectData.push ( selectOb );
          } )

        }
        this.setState ( { selectData } );
      } )
      .catch ( ( err ) => console.error ( err ) )
  };

  /**
   * 子树异步加载
   * @param node
   * @returns {*}
   */
  handleLoadMore ( node ) {

    return fetch ( `http://172.16.11.52:8081/api/v1.0/area/getTree/${ node.data.tid }` );
  }

  /**
   * 上传之后重新查找
   * @param data
   */

  handleAfterLoad ( data ) {
    if ( data.success ) {
      this.getTableData ();
    } else {
      this.notification = <Notification
        message="地域信息管理"
        key={ Math.random ().toString () }
        description="导出失败！"
      />;
      popup ( this.notification );
    }
  }

  /**
   * 批量选择
   * @param selectData
   * @param targetData
   */
  handleCheck ( data ) {

    if ( data ) {

      let ids = []
      for ( const i in data ) {
        ids.push ( data[ i ].id );
      }

      this.setState ( {
        ids : ids ,
      } );
    }

  }

  /**
   * 点击页码或排序时触发，重新请求 Table 数据
   * @param pageIndex
   * @param pageSize
   * @param sortIndex
   * @param sortOrder
   */
  handleTableChange ( pageIndex , pageSize , sortIndex , sortOrder ) {

    this.setState ( {
      pageIndex : pageIndex ,
      pageSize : pageSize ,
      sortOrder : ( sortOrder === "" ) ? "desc" : sortOrder ,
      sortIndex : ( sortIndex === "" ) ? "id" : sortIndex
    } , () => {
      this.getTableData ();
    } )
  }

  /**
   * 增加表格数据
   * @constructor
   */
  addTableData ( data ) {

    const url = "http://172.16.11.52:8081/api/v1.0/area";

    const params = new FormData ();
    params.append ( "areaName" , data.areaName );
    params.append ( "number" , data.number );
    params.append ( "type.id" , data.typeId );
    params.append ( "fatherArea.id" , data.fatherAreaId );

    fetch ( url , {
      method : 'POST' ,
      body : params
    } )
      .then ( ( response ) => {
        return response.json ();
      } )
      .then ( ( responseJson ) => {
        if ( responseJson.success ) {
          this.setState ( { AddModalVisible : false } )
          this.getTableData ();
        } else {
          this.notification = <Notification
            message="地域信息管理"
            key={ Math.random ().toString () }
            description="添加失败！"
          />;
          popup ( this.notification );
        }
      } )
      .catch ( ( err ) => console.error ( err ) );

  }


  /**
   * 提示框 单个删除提示为1，批量删除提示为2
   * @param data
   * @param type
   */
  showDialog ( data , type ) {
    const cancelBtn = { text : "取消" }
    const approveBtn = {
      text : "确定" ,
      onClick : this.deleteTableData.bind ( this , data , type )
    };
    popup ( <Dialog
      title="提示"
      message="是否确定删除？"
      type="confirm"
      icon="warning"
      showApproveBtn
      approveBtn={ approveBtn }
      showCancelBtn
      cancelBtn={ cancelBtn }
    /> );
  }

  /**
   * 删除表格数据，type为1是单个删除，type为2是批量删除
   * @param data
   * @param type
   * @param after
   * @constructor
   */
  deleteTableData ( data , type , after ) {

    after ( true );


    if ( type == 1 ) {

      const url = `http://172.16.11.52:8081/api/v1.0/area/${ data }`;

      fetch ( url , {
        method : 'DELETE' ,
      } )
        .then ( ( response ) => {
          return response.json ();
        } )
        .then ( ( responseJson ) => {
          if ( responseJson.success ) {
            this.getTableData ();
          } else {
            this.notification = <Notification
              message="该地域有子级地域，无法删除！！！"
              key={ Math.random ().toString () }
            />;
            popup ( this.notification );
          }
        } )
        .catch ( ( err ) => console.error ( err ) );

    } else if ( type == 2 ) {


      const url = `http://172.16.11.52:8081/api/v1.0/area?ids=${ data }`;


      fetch ( url , {
        method : 'DELETE' ,
      } )
        .then ( ( response ) => {
          return response.json ();
        } )
        .then ( ( responseJson ) => {
          if ( responseJson.success ) {
            this.getTableData ();
          } else {
            this.notification = <Notification
              message="该地域有子级地域，无法删除！！！"
              key={ Math.random ().toString () }
            />;
            popup ( this.notification );
          }
        } )
        .catch ( ( err ) => console.error ( err ) );
    }

  }


  /**
   * 对表单数据进行重置
   * @param trigger
   */
  formTirgger ( trigger ) {
    this.reset = trigger.reset;
  }

  /**
   * 通过Input进行数据查询
   * @param data
   * @constructor
   */
  queryTableData ( data ) {

    this.setState ( {
      areaName : data.areaName ,
      typeId : data.typeId ,
      fatherAreaId : data.fatherAreaId
    } , () => {
      this.getTableData ();
    } )
  }


  updateTableData ( data ) {

    const url = `http://172.16.11.52:8081/api/v1.0/area?id=${ this.state.ModalData.id }&areaName=${ data.areaName }&number=${ data.number }&type=${ data.typeId }&fatherArea.id=${ data.fatherAreaId }`;

    fetch ( url , {
      method : 'PUT'
    } )
      .then ( ( response ) => {
        return response.json ();
      } )
      .then ( ( responseJson ) => {
        if ( responseJson.success ) {
          this.setState ( { UpdateModalVisible : false } );
          this.getTableData ();
        } else {
          this.notification = <Notification
            message="系统配置页面"
            key={ Math.random ().toString () }
            description="修改失败！"
          />;
          popup ( this.notification );
        }
      } )
      .catch ( ( err ) => console.error ( err ) );

  }


  createModal () {

    const { AddModalVisible , UpdateModalVisible , ModalData } = this.state;

    if ( AddModalVisible ) {

      return (
        <Modal visible={ true } onClose={ () => this.setState ( { AddModalVisible : false } ) }>
          <ModalHeader >
            + 新增
          </ModalHeader>
          <ModalBody>
            <Form
              type="horizontal"
              onSubmit={ this.addTableData }
            >
              <FormItem name="areaName">
                <Label>地域名称</Label>
                <Input/>
              </FormItem>
              <FormItem name="number">
                <Label>编号</Label>
                <Input/>
              </FormItem>
              <FormItem name="typeId">
                <Label>类型</Label>
                <Select placeholder="请选择" dataSource={ this.state.selectData }/>
              </FormItem>
              <FormItem name="fatherAreaId">
                <Label>父级地域</Label>
                <TreeSelect
                  dataSource="http://172.16.11.52:8081/api/v1.0/area/getTree"
                  loadMore={ this.handleLoadMore.bind ( this ) }
                  dataValueMapper={ 'tid' }
                />
              </FormItem>
              <Button type="primary" htmlType="submit" style={{ marginRight : '15px' }}>
                保存
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      )

    } else if ( UpdateModalVisible ) {

      return (
        <Modal visible={ true } onClose={ () => this.setState ( { UpdateModalVisible : false } ) }
               ref={ ref => this.tree = ref }>
          <ModalHeader >
            <Icon icon="pencil"/> 修改
          </ModalHeader>
          <ModalBody>
            <Form
              type="horizontal"
              onSubmit={ this.updateTableData }
            >
              <FormItem name="areaName">
                <Label>地域名称</Label>
                <Input value={ ModalData.areaName }/>
              </FormItem>
              <FormItem name="number">
                <Label >编号</Label>
                <Input value={ ModalData.number }/>
              </FormItem>
              <FormItem name="typeId">
                <Label>类型</Label>
                <Select placeholder="请选择" dataSource={ this.state.selectData } value={ ModalData.typeId.toString () }/>
              </FormItem>
              <FormItem name="fatherAreaId">
                <Label >父级地域</Label>
                <TreeSelect
                  dataSource="http://172.16.11.52:8081/api/v1.0/area/getTree"
                  dataValueMapper={ 'tid' }
                  loadMore={ this.handleLoadMore.bind ( this ) }
                  defaultValue={[ { 'name' : ModalData.fatherAreaName , 'value' : ModalData.fatherAreaId } ]}
                />
              </FormItem>
              <Button type="primary" htmlType="submit" style={{ marginRight : '15px' }}>
                保存
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      )

    }

  }


  render () {


    const { pageIndex , pageSize , pageTotal , tableData  , selectData } = this.state;

    const pgColumns = [
      {
        "title" : "地域名称" ,
        "dataIndex" : "areaName" ,
        "sortable" : true
      } ,
      {
        "title" : "编号" ,
        "dataIndex" : "number" ,
        "sortable" : true
      } ,
      {
        "title" : "类型" ,
        "dataIndex" : "typeName"
      } ,
      {
        "title" : "父级地域" ,
        "dataIndex" : "fatherAreaName"
      } ,
      {
        "title" : "操作" ,
        sub : ( data ) => {
          return ( this.state.tableData.length >= 1 ?
              (
                <div>
                    <span style={{ padding : "0 10px" , cursor : "pointer" }}
                          onClick={ () => {
                            this.setState ( { UpdateModalVisible : true , ModalData : data } )
                          } }>
                    <Icon icon="pencil"/>
                    </span>
                  <span style={{ padding : "0 10px" , cursor : "pointer" }}
                        onClick={ this.showDialog.bind ( this , data.id , 1 )}>
                     <Icon icon="remove"/>
                  </span>
                </div>
              ) : null
          );
        }
      } ,
    ];

    return (
      <Wrapper>
        <Container type="fluid">
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <Form
                    type="inline"
                    onSubmit={ this.queryTableData }
                    trigger={ this.formTirgger }
                  >
                    <FormItem name="areaName">
                      <Label>地域名称</Label>
                      <Input/>
                    </FormItem>
                    <FormItem name="typeId">
                      <Label>类型</Label>
                      <Select placeholder="请选择" dataSource={ selectData }/>
                    </FormItem>
                    <FormItem name="fatherAreaId">
                      <Label>父级地域</Label>
                      <TreeSelect
                        dataSource="http://172.16.11.52:8081/api/v1.0/area/getTree"
                        dataValueMapper={ 'tid' }
                        loadMore={ this.handleLoadMore.bind ( this ) }
                      />
                    </FormItem>
                    <Button type="primary" htmlType="submit">
                      <Icon type="search"/>
                    </Button>
                    <Button shape="outline" onClick={ () => {
                      this.reset ()
                    } }>重置</Button>
                  </Form>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <div style={{ float : "left" }}>
                    <Upload placeholder="导入" action="http://172.16.11.52:8081/api/v1.0/area/import"
                            onAfterUpload={ this.handleAfterLoad }/>
                  </div>
                  <div style={{ float : "right" }}>
                    <Button
                      onClick={ () => {
                        this.setState ( { AddModalVisible : true } )
                      }}
                      style={{ marginRight : '10px' }}><Icon icon="plus"/> 新增</Button>
                    <Button onClick={ this.showDialog.bind ( this , this.state.ids , 2 )}
                            style={{ marginRight : '10px' }}>
                      <Icon icon="trash"/> 批量删除
                    </Button>
                    <Button style={{ marginRight : '10px' }}
                            onClick={ () => {
                              var a = document.createElement ( 'a' );
                              a.href = `http://172.16.11.52:8081/api/v1.0/area/export?areaName=${ this.state.areaName }&type.id=${ this.state.typeId }&fatherArea.id=${ this.state.fatherAreaId }`;
                              a.click ();
                            }}>
                      <Icon icon="share-square"/> 导出
                    </Button>
                    <Button onClick={ () => {
                      var a = document.createElement ( 'a' );
                      a.href = "http://172.16.11.52:8081/api/v1.0/area/model";
                      a.click ();
                    }}>
                      <Icon icon="download"/> 模版下载
                    </Button>
                  </div>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col>
                  { tableData.length == 0 | tableData.length == undefined ? <Alert message="暂无数据"/> : null }
                  <PagiTable
                    dataSource={ tableData }
                    columns={ pgColumns }
                    pageSize={ pageSize }
                    pageTotal={ pageTotal }
                    pageIndex={ pageIndex }
                    onChange={ this.handleTableChange }
                    onCheck={ this.handleCheck }
                    checkable
                    striped
                    bordered
                    showPagiJump
                    showDataSizePicker
                    showPagesInfo
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
        {
          this.createModal ()
        }
      </Wrapper>
    );
  }

}

export default areaMan;