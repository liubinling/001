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
  ModalBody,
  Card,
  CardBody,
  CardHeader,
  TreeSelect
} from 'epm-ui';
import { Wrapper } from '../../components/index'


// 保险公司信息管理

class insuranceCompanyMan extends Component {

  constructor ( props ) {
    super ( props );

    this.state = {
      name : '' ,
      parentId : '' ,
      sortIndex : 'id' ,
      sortOrder : 'desc' ,
      pageIndex : 1 ,
      pageSize : 10 ,
      tableData : {} ,
      ids : []
    };

    this.formatTabledata = this.formatTabledata.bind ( this );
    this.getTableData = this.getTableData.bind ( this );
    this.handleCheck = this.handleCheck.bind ( this );
    this.handleTableChange = this.handleTableChange.bind ( this );
    this.formTirgger = this.formTirgger.bind ( this );
    this.QueryTableData = this.QueryTableData.bind ( this );
    this.updateTableData = this.updateTableData.bind ( this );
    this.createModal = this.createModal.bind ( this );
    this.AddTableData = this.AddTableData.bind ( this );
    this.handleAfterLoad = this.handleAfterLoad.bind ( this );
  }

  componentDidMount () {
    this.getTableData ();
  }

  /**
   * 获取 Table 数据
   */
  getTableData () {
    const url = `http://172.16.11.52:8081/api/v1.0/insuranceCompany?parent.id=${ this.state.parentId }&name=${ this.state.name }&order=${this.state.sortOrder}&sort=${this.state.sortIndex}&page=${this.state.pageIndex}&rows=${this.state.pageSize}`;

    fetch ( url , {
      method : 'GET' ,
    } )
      .then ( ( response ) => {
        return response.json ();
      } )
      .then ( ( responseJson ) => {
        if ( responseJson.success ) {
          this.formatTabledata ( responseJson.result );
        }
      } )
      .catch ( ( err ) => console.error ( err ) )
  };

  formatTabledata ( result ) {

    const TableData = [];

    for ( const i in result.rows ) {
      const data = {};
      data.id = result.rows[ i ].id;
      data.name = result.rows[ i ].name;
      data.location = result.rows[ i ].location;
      data.tel = result.rows[ i ].tel;
      if ( result.rows[ i ].parent != null ) {
        data.parentName = result.rows[ i ].parent.name;
        data.parentId = result.rows[ i ].parent.id;
      } else {
        data.parentName = "";
      }

      TableData.push ( data );
    }
    this.setState ( {
      pageTotal : result.total ,
      tableData : TableData ,
    } );
  };

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

  };

  handleInsuranceLoadMore ( node ) {
    return fetch ( `http://172.16.11.52:8081/api/v1.0/insuranceCompany/getTree/${ node.data.tid }` );
  };

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
  AddTableData ( data ) {

    const url = "http://172.16.11.52:8081/api/v1.0/insuranceCompany";

    const parm = new FormData ();
    parm.append ( "name" , data.name );
    parm.append ( "parent.id" , data.parentId );
    parm.append ( "location" , data.location );
    parm.append ( "tel" , data.tel );


    fetch ( url , {
      method : 'POST' ,
      body : parm
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
            message="保险公司信息管理页面"
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
      type : "warning" ,
      onClick : this.DeleteTableData.bind ( this , data , type )
    };
    popup ( <Dialog
      title="提示"
      message="是否确定删除？"
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
  DeleteTableData ( data , type , after ) {

    after ( true );


    if ( type == 1 ) {

      const url = `http://172.16.11.52:8081/api/v1.0/insuranceCompany/${ data }`;

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
              message="保险公司信息管理页面"
              key={ Math.random ().toString () }
              description="删除失败！"
            />;
            popup ( this.notification );
          }
        } )
        .catch ( ( err ) => console.error ( err ) );

    } else if ( type == 2 ) {


      const url = `http://172.16.11.52:8081/api/v1.0/insuranceCompany?ids=${ data }`;


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
              message="保险公司信息管理页面"
              key={ Math.random ().toString () }
              description="删除失败！"
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
  QueryTableData ( data ) {
    this.setState ( {
      name : data.name ,
      parentId : data.parentId
    } , () => {
      this.getTableData ();
    } )
  }


  updateTableData ( data ) {

    console.log( data );

    const url = `http://172.16.11.52:8081/api/v1.0//insuranceCompany?id=${ this.state.ModalData.id }&name=${ data.name }&parent.id=${ data.parentId }&location=${ data.location }&tel=${ data.tel }`;

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
            message="保险公司信息管理页面"
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
            <Icon icon="plus"/> 新增
          </ModalHeader>
          <ModalBody>
            <Form
              type="horizontal"
              onSubmit={ this.AddTableData }
            >
              <FormItem name="name">
                <Label>保险公司</Label>
                <Input/>
              </FormItem>
              <FormItem name="parentId">
                <Label>所属上级</Label>
                <TreeSelect
                  dataSource="http://172.16.11.52:8081/api/v1.0/insuranceCompany/getTree"
                  dataValueMapper={ 'tid' }
                  loadMore={ this.handleInsuranceLoadMore.bind ( this ) }
                />
              </FormItem>
              <FormItem name="tel">
                <Label>联系电话</Label>
                <Input />
              </FormItem>
              <FormItem name="location">
                <Label>地址</Label>
                <Input/>
              </FormItem>
              <Button type="primary" htmlType="submit" style={{ marginRight : '15px' }}>
                保存
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      )

    } else if ( UpdateModalVisible ) {

      console.log( ModalData );

      return (
        <Modal visible={ true } onClose={ () => this.setState ( { UpdateModalVisible : false } ) }>
          <ModalHeader >
            <Icon icon="pencil"/> 修改
          </ModalHeader>
          <ModalBody>
            <Form
              type="horizontal"
              onSubmit={ this.updateTableData }
            >
              <FormItem name="name">
                <Label>保险公司</Label>
                <Input value={ ModalData.name }/>
              </FormItem>
              <FormItem name="parentId">
                <Label>所属上级</Label>
                <TreeSelect
                  dataSource="http://172.16.11.52:8081/api/v1.0/insuranceCompany/getTree"
                  dataValueMapper={ 'tid' }
                  loadMore={ this.handleInsuranceLoadMore.bind ( this ) }
                  defaultValue={[ { 'name' : ModalData.parentName , 'value' : ModalData.parentId } ]}
                />
              </FormItem>
              <FormItem name="tel">
                <Label>联系电话</Label>
                <Input value={ ModalData.tel }/>
              </FormItem>
              <FormItem name="location">
                <Label>地址</Label>
                <Input value={ ModalData.location }/>
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


    const { pageIndex , pageSize , pageTotal , tableData } = this.state;


    const pgColumns = [
      {
        "title" : "名称" ,
        "dataIndex" : "name" ,
        "sortable" : true
      } ,
      {
        "title" : "所属上级" ,
        "dataIndex" : "parentName" ,
        "sortable" : true
      } ,
      {
        "title" : "联系电话" ,
        "dataIndex" : "tel"
      } ,
      {
        "title" : "地址" ,
        "dataIndex" : "location"
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
                  onSubmit={ this.QueryTableData }
                  trigger={ this.formTirgger }
                >
                  <FormItem name="name">
                    <Label>名称</Label>
                    <Input/>
                  </FormItem>
                  <FormItem name="parentId">
                    <Label>所属上级</Label>
                    <TreeSelect
                      dataSource="http://172.16.11.52:8081/api/v1.0/insuranceCompany/getTree"
                      dataValueMapper={ 'tid' }
                      loadMore={ this.handleInsuranceLoadMore.bind ( this ) }
                    />
                  </FormItem>
                  <Button type="primary" htmlType="submit" style={{ marginRight : '15px' }}>
                    <Icon type="search"/>
                  </Button>
                  <Button onClick={ () => {
                    this.reset ()
                  } }>重置</Button>
                </Form>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  {/*<div style={{ float : "left" }}>*/}
                    {/*<Upload placeholder="导入" action="http://172.16.11.52:8081/api/v1.0/insuranceCompany/import"*/}
                            {/*onAfterUpload={ this.handleAfterLoad }/>*/}
                  {/*</div>*/}
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
                              a.href = "http://172.16.11.52:8081/api/v1.0/insuranceCompany/export";
                              a.click ();
                            }}>
                      <Icon icon="share-square"/> 导出
                    </Button>
                    <Button onClick={ () => {
                      var a = document.createElement ( 'a' );
                      a.href = "http://172.16.11.52:8081/api/v1.0/insuranceCompany/model";
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

export default insuranceCompanyMan;