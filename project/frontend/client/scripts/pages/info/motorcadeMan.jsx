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
  CardHeader ,
  Textarea
} from 'epm-ui';
import { Wrapper } from '../../components/index'


// 车队管理

class motorcadeMan extends Component {

  constructor ( props ) {
    super ( props );

    this.state = {
      motorcadeName : '' ,
      superDepartmentId : '' ,
      areaId : '' ,
      sortIndex : 'id' ,
      sortOrder : 'desc' ,
      pageIndex : 1 ,
      pageSize : 10 ,
      tableData : {} ,
      ids : []
    };

    this.formatTableData = this.formatTableData.bind ( this );
    this.getTableData = this.getTableData.bind ( this );
    this.getTerminalCompanySelectData = this.getTerminalCompanySelectData.bind ( this );
    this.getBusinessTypeSelectData = this.getBusinessTypeSelectData.bind ( this );
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
    this.getBusinessTypeSelectData ();
    this.getTerminalCompanySelectData ();
  }

  /**
   * 获取 Table 数据
   */
  getTableData () {
    const url = `http://172.16.11.52:8081/api/v1.0/motorcade?motorcadeName=${ this.state.motorcadeName }&area.id=${ this.state.areaId }&superDepartment.id=${ this.state.superDepartmentId }&order=${ this.state.sortOrder }&sort=${ this.state.sortIndex }&page=${ this.state.pageIndex }&rows=${ this.state.pageSize }`;

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
      data.motorcadeName = result.rows[ i ].motorcadeName;
      if ( result.rows[ i ].transCompany != null ) {
        data.transCompanyId = result.rows[ i ].transCompany.id;
        data.transCompanyName = result.rows[ i ].transCompany.transCompanyName;
      } else {
        data.terminalCompany = "";
      }
      if ( result.rows[ i ].terminalCompany != null ) {
        data.terminalCompanyId = result.rows[ i ].terminalCompany.id;
        data.terminalCompanyName = result.rows[ i ].terminalCompany.terminalCompanyName;
      } else {
        data.terminalCompany = "";
      }
      data.businessLicense = result.rows[ i ].businessLicense;
      data.businessLicenseNo = result.rows[ i ].businessLicenseNo;
      if ( result.rows[ i ].businessType != null ) {
        data.businessTypeName = result.rows[ i ].businessType.name;
        data.businessTypeId = result.rows[ i ].businessType.id;
      } else {
        data.businessTypeName = "";
      }
      if ( result.rows[ i ].area != null ) {
        data.areaName = result.rows[ i ].area.areaName;
        data.areaId = result.rows[ i ].area.id;
      } else {
        data.areaName = "";
      }
      data.contact = result.rows[ i ].contact;
      data.tel = result.rows[ i ].tel;
      data.note = result.rows[ i ].note;
      if ( result.rows[ i ].insuranceCompany != null ) {
        data.insuranceCompanyName = result.rows[ i ].insuranceCompany.name;
        data.insuranceCompanyId = result.rows[ i ].insuranceCompany.id;
      } else {
        data.insuranceCompanyName = "";
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
  getTerminalCompanySelectData () {
    const url = `http://172.16.11.52:8081/api/v1.0/terminalCompany`;

    fetch ( url , {
      method : 'GET' ,
    } )
      .then ( ( response ) => {
        return response.json ();
      } )
      .then ( ( responseJson ) => {

        const terminalSelectData = [];

        if ( responseJson.success ) {

          responseJson.result.forEach ( ( item ) => {
            const selectOb = {};
            selectOb.value = item.id.toString ();
            selectOb.text = item.terminalCompanyName;
            terminalSelectData.push ( selectOb );
          } )

        }
        this.setState ( { terminalSelectData } );
      } )
      .catch ( ( err ) => console.error ( err ) )
  };

  getBusinessTypeSelectData () {
    const url = `http://172.16.11.52:8081/api/v1.0/businessType`;

    fetch ( url , {
      method : 'GET' ,
    } )
      .then ( ( response ) => {
        return response.json ();
      } )
      .then ( ( responseJson ) => {

        const businessTypeData = [];

        if ( responseJson.success ) {

          responseJson.result.forEach ( ( item ) => {
            const selectOb = {};
            selectOb.value = item.id.toString ();
            selectOb.text = item.name;
            businessTypeData.push ( selectOb );
          } )

        }
        this.setState ( { businessTypeData } );
      } )
      .catch ( ( err ) => console.error ( err ) )
  };

  /**
   * 子树异步加载
   * @param node
   * @returns {*}
   */
  handleLoadMore ( node ) {

    return fetch ( `http://172.16.11.52:8081/api/v1.0/motorcade/getTree/${ node.data.tid }` );
  }

  handleInsuranceLoadMore ( node ) {
    return fetch ( `http://172.16.11.52:8081/api/v1.0/insuranceCompany/getTree/${ node.data.tid }` );
  };

  handleSuperLoadMore ( node ) {
    return fetch ( `http://172.16.11.52:8081/api/v1.0/transFirm/getTree/${ node.data.tid }` );
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

    const url = "http://172.16.11.52:8081/api/v1.0/motorcade";

    const parms = new FormData ();
    parms.append ( "motorcadeName" , data.motorcadeName );
    parms.append ( "transCompany.id" , data.transCompanyId );
    parms.append ( "terminalCompany.id" , data.terminalCompanyId );
    parms.append ( "businessLicense" , data.businessLicense );
    parms.append ( "businessLicenseNo" , data.businessLicenseNo );
    parms.append ( "businessType" , data.businessTypeId );
    parms.append ( "area.id" , data.areaId );
    parms.append ( "contact" , data.contact );
    parms.append ( "tel" , data.tel );
    parms.append ( "note" , data.note );
    parms.append ( "insuranceCompany.id" , data.insuranceCompanyId );

    fetch ( url , {
      method : 'POST' ,
      body : parms
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
            message="车辆信息管理"
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

      const url = `http://172.16.11.52:8081/api/v1.0/motorcade/${ data }`;

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


      const url = `http://172.16.11.52:8081/api/v1.0/motorcade?ids=${ data }`;


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
      motorcadeName : data.motorcadeName ,
      superDepartmentId : data.superDepartmentId ,
      areaId : data.areaId
    } , () => {
      this.getTableData ();
    } )
  }


  updateTableData ( data ) {

    console.log(data);

    const url = `http://172.16.11.52:8081/api/v1.0/motorcade?id=${ this.state.ModalData.id }&motorcadeName=${ data.motorcadeName }&transCompany.id=${ data.transCompanyId }&terminalCompany.id=${ data.terminalCompanyId }&businessLicense=${ data.businessLicense }&businessLicenseNo=${ data.businessLicenseNo }&businessType.id=${ data.businessTypeId }&area.id=${ data.areaId }&contact=${ data.contact }&tel=${ data.tel }&note=${ data.note }&insuranceCompany=${ data.insuranceCompanyId }`;

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
            message="车辆管理页面页面"
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
              onSubmit={ this.addTableData }
            >
              <FormItem name="motorcadeName">
                <Label>车队名称</Label>
                <Input/>
              </FormItem>
              <FormItem name="transCompanyId">
                <Label>运输公司</Label>
                <TreeSelect
                  dataSource="http://172.16.11.52:8081/api/v1.0/transFirm/getTree"
                  dataValueMapper={ 'tid' }
                  loadMore={ this.handleSuperLoadMore.bind ( this ) }
                />
              </FormItem>
              <FormItem name="terminalCompanyId">
                <Label >所属业户</Label>
                <Select placeholder="请选择" dataSource={ this.state.terminalSelectData }/>
              </FormItem>
              <FormItem name="businessLicense">
                <Label>经营许可证字</Label>
                <Input />
              </FormItem>
              <FormItem name="businessLicenseNo">
                <Label>经营许可证号</Label>
                <Input />
              </FormItem>
              <FormItem name="businessTypeId">
                <Label >经营范围</Label>
                <Select placeholder="请选择" dataSource={ this.state.businessTypeData }/>
              </FormItem>
              <FormItem name="areaId">
                <Label>所属地区</Label>
                <TreeSelect
                  dataSource="http://172.16.11.52:8081/api/v1.0/area/getTree"
                  loadMore={ this.handleLoadMore.bind ( this ) }
                  dataValueMapper={ 'tid' }
                />
              </FormItem>
              <FormItem name="contact">
                <Label >联系人</Label>
                <Input/>
              </FormItem>
              <FormItem name="tel">
                <Label >联系电话</Label>
                <Input/>
              </FormItem>
              <FormItem name="insuranceCompanyId">
                <Label >保险公司</Label>
                <TreeSelect
                  dataSource="http://172.16.11.52:8081/api/v1.0/insuranceCompany/getTree"
                  dataValueMapper={ 'tid' }
                  loadMore={ this.handleInsuranceLoadMore.bind ( this ) }
                />
              </FormItem>
              <FormItem name="note">
                <Label >备注</Label>
                <Textarea/>
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
        <Modal visible={ true } onClose={ () => this.setState ( { UpdateModalVisible : false } ) }>
          <ModalHeader >
            <Icon icon="pencil"/> 修改
          </ModalHeader>
          <ModalBody>
            <Form
              type="horizontal"
              onSubmit={ this.updateTableData }
            >
              <FormItem name="motorcadeName">
                <Label>车队名称</Label>
                <Input value={ ModalData.motorcadeName }/>
              </FormItem>
              <FormItem name="transCompanyId">
                <Label>运输公司</Label>
                <TreeSelect
                  dataSource="http://172.16.11.52:8081/api/v1.0/transFirm/getTree"
                  dataValueMapper={ 'tid' }
                  loadMore={ this.handleSuperLoadMore.bind ( this ) }
                  value={[ { 'name' : ModalData.transCompanyName , 'value' : ModalData.transCompanyId } ]}
                />
              </FormItem>
              <FormItem name="terminalCompanyId">
                <Label >所属业户</Label>
                <Select placeholder="请选择" dataSource={ this.state.terminalSelectData }
                        value = { ModalData.terminalCompanyId.toString() }
                />
              </FormItem>
              <FormItem name="businessLicense">
                <Label >经营许可证字</Label>
                <Input value={ ModalData.businessLicense }/>
              </FormItem>
              <FormItem name="businessLicenseNo">
                <Label >经营许可证号</Label>
                <Input value={ ModalData.businessLicenseNo }/>
              </FormItem>
              <FormItem name="businessTypeId">
                <Label >经营范围</Label>
                <Select placeholder="请选择" dataSource={ this.state.businessTypeData }
                      value={ ModalData.businessTypeId.toString() } />
              </FormItem>
              <FormItem name="areaId">
                <Label >所属地区</Label>
                <TreeSelect
                  dataSource="http://172.16.11.52:8081/api/v1.0/area/getTree"
                  dataValueMapper={ 'tid' }
                  loadMore={ this.handleLoadMore.bind ( this ) }
                  value={[ { 'name' : ModalData.areaName , 'value' : ModalData.areaId } ]}
                />
              </FormItem>
              <FormItem name="contact">
                <Label >联系人</Label>
                <Input value={ ModalData.contact }/>
              </FormItem>
              <FormItem name="tel">
                <Label >联系电话</Label>
                <Input value={ ModalData.tel }/>
              </FormItem>
              <FormItem name="insuranceCompanyId">
                <Label >保险公司</Label>
                <TreeSelect
                  dataSource="http://172.16.11.52:8081/api/v1.0/insuranceCompany/getTree"
                  dataValueMapper={ 'tid' }
                  value={[ { 'name' : ModalData.insuranceCompanyName , 'value' : ModalData.insuranceCompanyId } ]}
                />
              </FormItem>
              <FormItem name="note">
                <Label >备注</Label>
                <Textarea value={ ModalData.note }/>
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


    const { pageIndex , pageSize , pageTotal , tableData , selectData } = this.state;

    const pgColumns = [
      {
        "title" : "车队名称" ,
        "dataIndex" : "motorcadeName" ,
        "sortable" : true
      } ,
      {
        "title" : "运输公司" ,
        "dataIndex" : "transCompanyName" ,
        "sortable" : true
      } ,
      {
        "title" : "所属业户" ,
        "dataIndex" : "terminalCompanyName"
      } ,
      {
        "title" : "经营许可证字" ,
        "dataIndex" : "businessLicense"
      } ,
      {
        "title" : "经营许可证号" ,
        "dataIndex" : "businessLicenseNo"
      } ,
      {
        "title" : "经营范围" ,
        "dataIndex" : "businessTypeName"
      } ,
      {
        "title" : "所属地区" ,
        "dataIndex" : "areaName"
      } ,
      {
        "title" : "联系人" ,
        "dataIndex" : "contact"
      } ,
      {
        "title" : "联系电话" ,
        "dataIndex" : "tel"
      } ,
      {
        "title" : "保险公司" ,
        "dataIndex" : "insuranceCompanyName"
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
                    <FormItem name="motorcadeName">
                      <Label>车队名称</Label>
                      <Input/>
                    </FormItem>
                    <FormItem name="superDepartmentId">
                      <Label>运输公司</Label>
                      <TreeSelect
                        dataSource="http://172.16.11.52:8081/api/v1.0/transFirm/getTree"
                        dataValueMapper={ 'tid' }
                        loadMore={ this.handleSuperLoadMore.bind ( this ) }
                      />
                    </FormItem>
                    <FormItem name="areaId">
                      <Label>地区</Label>
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
                  {/*<div style={{ float : "left" }}>*/}
                  {/*<Upload placeholder="导入" action="http://172.16.11.52:8081/api/v1.0/motorcade/import"*/}
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
                              a.href = "http://172.16.11.52:8081/api/v1.0/motorcade/export";
                              a.click ();
                            }}>
                      <Icon icon="share-square"/> 导出
                    </Button>
                    <Button onClick={ () => {
                      var a = document.createElement ( 'a' );
                      a.href = "http://172.16.11.52:8081/api/v1.0/motorcade/model";
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

export default motorcadeMan;