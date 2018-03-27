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
  Textarea ,
  Card ,
  CardBody ,
  CardHeader
} from 'epm-ui';
import { Wrapper } from '../../components/index'


// 运输公司新增接口

class transFirmMan extends Component {

  constructor ( props ) {
    super ( props );

    this.state = {
      transCompanyName : '' ,
      areaId : '' ,
      transTypeId : '' ,
      businessTypeId : '' ,
      sortIndex : 'id' ,
      sortOrder : 'desc' ,
      pageIndex : 1 ,
      pageSize : 10 ,
      tableData : {} ,
      treeSelectData : [] ,
      ids : []
    };

    this.formatTabledata = this.formatTabledata.bind ( this );
    this.getTableData = this.getTableData.bind ( this );
    this.getCompanyTypeSelectData = this.getCompanyTypeSelectData.bind ( this );
    this.getBusinessTypeSelectData = this.getBusinessTypeSelectData.bind ( this );
    this.getTerminalCompanySelectData = this.getTerminalCompanySelectData.bind ( this );
    this.handleCheck = this.handleCheck.bind ( this );
    this.handleTableChange = this.handleTableChange.bind ( this );
    this.formTirgger = this.formTirgger.bind ( this );
    this.QueryTableData = this.QueryTableData.bind ( this );
    this.UpdateTableData = this.UpdateTableData.bind ( this );
    this.CreateModal = this.CreateModal.bind ( this );
    this.AddTableData = this.AddTableData.bind ( this );
  }

  componentDidMount () {
    this.getTableData ();
    this.getBusinessTypeSelectData ();
    this.getCompanyTypeSelectData ();
    this.getTerminalCompanySelectData ();
  }

  /**
   * 获取 Table 数据
   */
  getTableData () {
    const url = `http://172.16.11.52:8081/api/v1.0/transFirm?transCompanyName=${ this.state.transCompanyName }&area.id=${ this.state.areaId }&transType.id=${ this.state.transTypeId }&businessType.id=${ this.state.businessTypeId }&order=${ this.state.sortOrder }&sort=${ this.state.sortIndex }&page=${ this.state.pageIndex }&rows=${ this.state.pageSize }`;

    fetch ( url , {
      method : 'GET' ,
    } )
      .then ( ( response ) => {
        return response.json ();
      } )
      .then ( ( responseJson ) => {
        console.log ( responseJson );
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
      data.transCompanyName = result.rows[ i ].transCompanyName;
      if ( result.rows[ i ].transType != null ) {
        data.transCompanyTypeName = result.rows[ i ].transType.transCompanyTypeName;
        data.transCompanyTypeId = result.rows[ i ].transType.id;
      } else {
        data.businessTypeName = "";
      }
      ;
      if ( result.rows[ i ].superDepartment != null ) {
        data.superDepartment = result.rows[ i ].superDepartment.transCompanyName;
        data.superDepartmentId = result.rows[ i ].superDepartment.id;
      } else {
        data.superDepartment = "";
      }
      ;
      if ( result.rows[ i ].terminalCompany != null ) {
        data.terminalCompany = result.rows[ i ].terminalCompany.id;
      } else {
        data.terminalCompany = "";
      }
      ;
      data.businessLicense = result.rows[ i ].businessLicense;
      data.businessLicenseNo = result.rows[ i ].businessLicenseNo;
      if ( result.rows[ i ].businessType != null ) {
        data.businessTypeName = result.rows[ i ].businessType.name;
        data.businessTypeId = result.rows[ i ].businessType.id;
      } else {
        data.businessTypeName = "";
      }
      ;
      if ( result.rows[ i ].area != null ) {
        data.areaName = result.rows[ i ].area.areaName;
        data.areaId = result.rows[ i ].area.id;
      } else {
        data.areaName = "";
      }
      ;
      data.contact = result.rows[ i ].contact;
      data.tel = result.rows[ i ].tel;
      data.note = result.rows[ i ].note;
      if ( result.rows[ i ].insuranceCompany != null ) {
        data.insuranceCompanyName = result.rows[ i ].insuranceCompany.name;
        data.insuranceCompanyId = result.rows[ i ].insuranceCompany.id;
      } else {
        data.insuranceCompanyName = "";
      }
      ;

      TableData.push ( data );
    }
    this.setState ( {
      pageTotal : result.total ,
      tableData : TableData ,
    } );
  };

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

  getCompanyTypeSelectData () {
    const url = `http://172.16.11.52:8081/api/v1.0/transCompanyType`;

    fetch ( url , {
      method : 'GET' ,
    } )
      .then ( ( response ) => {
        return response.json ();
      } )
      .then ( ( responseJson ) => {

        const companySelectData = [];

        if ( responseJson.success ) {

          responseJson.result.forEach ( ( item ) => {
            const selectOb = {};
            selectOb.value = item.id.toString ();
            selectOb.text = item.transCompanyTypeName;
            companySelectData.push ( selectOb );
          } )

        }
        this.setState ( { companySelectData } );
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

  handleLoadMore ( node ) {

    return fetch ( `http://172.16.11.52:8081/api/v1.0/area/getTree/${ node.data.tid }` );
  };

  handleSuperLoadMore ( node ) {
    return fetch ( `http://172.16.11.52:8081/api/v1.0/transFirm/getTree/${ node.data.tid }` );
  };

  handleInsuranceLoadMore ( node ) {
    return fetch ( `http://172.16.11.52:8081/api/v1.0/insuranceCompany/getTree/${ node.data.tid }` );
  };

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
  AddTableData ( data ) {

    const url = `http://172.16.11.52:8081/api/v1.0/transFirm`;


    const parms = new FormData ();
    parms.append ( "transCompanyName" , data.transCompanyName );
    parms.append ( "transType.id" , data.transTypeId );
    parms.append ( "superDepartment.id" , data.superDepartment );
    parms.append ( "terminalCompany.id" , data.terminalCompany );
    parms.append ( "businessLicense" , data.businessLicense );
    parms.append ( "businessLicenseNo" , data.businessLicenseNo );
    parms.append ( "businessType.id" , data.businessTypeId );
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
            message="运输公司信息管理"
            key={ Math.random ().toString () }
            description={ responseJson.msg }
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

      const url = `http://172.16.11.52:8081/api/v1.0/transFirm/${ data }`;

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
              message="运输公司管理页面"
              key={ Math.random ().toString () }
              description="删除失败！"
            />;
            popup ( this.notification );
          }
        } )
        .catch ( ( err ) => console.error ( err ) );

    } else if ( type == 2 ) {


      const url = `http://172.16.11.52:8081/api/v1.0/transFirm?ids=${ data }`;


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
              message="地域信息管理页面"
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
      transCompanyName : data.transCompanyName ,
      areaId : data.areaId ,
      transTypeId : data.transTypeId ,
      businessTypeId : data.businessTypeId ,
    } , () => {
      this.getTableData ();
    } )
  }


  UpdateTableData ( data ) {

    const url = `http://172.16.11.52:8081/api/v1.0/transFirm?id=${ this.state.ModalData.id }&transCompanyName=${ data.transTypeId }&transType.id=${ data.transTypeId }&superDepartment.id=${ data.superDepartmentId }&terminalCompany.id=${ data.superDepartmentId }&businessLicense=${ data.businessLicense }&businessLicenseNo=${ data.businessLicenseNo }&businessType.id=${ data.businessTypeId }&area.id=${ data.areaId }&contact=${ data.contact }&tel=${ data.tel }&note=${ data.note }&insuranceCompany.id=${ data.insuranceCompanyId }`;

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
            message="运输公司页面"
            key={ Math.random ().toString () }
            description={ responseJson.msg }
          />;
          popup ( this.notification );
        }
      } )
      .catch ( ( err ) => console.error ( err ) );

  }


  CreateModal () {

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
              <FormItem name="transCompanyName">
                <Label>运输公司名称</Label>
                <Input />
              </FormItem>
              <FormItem name="transTypeId">
                <Label>运输公司类型</Label>
                <Select placeholder="请选择" dataSource={ this.state.companySelectData }/>
              </FormItem>
              <FormItem name="superDepartment">
                <Label>上级部门</Label>
                <TreeSelect
                  dataSource="http://172.16.11.52:8081/api/v1.0/transFirm/getTree"
                  dataValueMapper={ 'tid' }
                  loadMore={ this.handleSuperLoadMore.bind ( this ) }
                />
              </FormItem>
              <FormItem name="terminalCompany">
                <Label >所属业户</Label>
                <Select placeholder="请选择" dataSource={ this.state.terminalSelectData }/>
              </FormItem>
              <FormItem name="businessLicense">
                <Label >经营许可证字</Label>
                <Input/>
              </FormItem>
              <FormItem name="businessLicenseNo">
                <Label >经营许可证号</Label>
                <Input/>
              </FormItem>
              <FormItem name="businessTypeId">
                <Label >经营范围</Label>
                <Select placeholder="请选择" dataSource={ this.state.businessTypeData }/>
              </FormItem>
              <FormItem name="areaId">
                <Label >所属地区</Label>
                <TreeSelect
                  dataSource="http://172.16.11.52:8081/api/v1.0/area/getTree"
                  dataValueMapper={ 'tid' }
                  loadMore={ this.handleLoadMore.bind ( this ) }
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
              onSubmit={ this.UpdateTableData }
            >
              <FormItem name="transCompanyName">
                <Label>运输公司名称</Label>
                <Input value={ ModalData.transCompanyName }/>
              </FormItem>
              <FormItem name="transTypeId">
                <Label>运输公司类型</Label>
                <Select placeholder="请选择" dataSource={ this.state.companySelectData }
                        value={ ModalData.transCompanyTypeId.toString () }/>
              </FormItem>
              <FormItem name="superDepartmentId">
                <Label>上级部门</Label>
                <TreeSelect
                  dataSource="http://172.16.11.52:8081/api/v1.0/transFirm/getTree"
                  dataValueMapper={ 'tid' }
                  loadMore={ this.handleSuperLoadMore.bind ( this ) }
                  defaultValue={[ { 'name' : ModalData.superDepartment , 'value' : ModalData.superDepartmentId } ]}
                />
              </FormItem>
              <FormItem name="terminalCompanyId">
                <Label >所属业户</Label>
                {/*<Select placeholder="请选择" dataSource={ this.state.terminalSelectData }*/}
                {/*value={ ModalData.terminalCompany }/>*/}
                <Input />
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
                        value={ ModalData.businessTypeId.toString () }/>
              </FormItem>
              <FormItem name="areaId">
                <Label >所属地区</Label>
                <TreeSelect
                  dataSource="http://172.16.11.52:8081/api/v1.0/area/getTree"
                  dataValueMapper={ 'tid' }
                  loadMore={ this.handleLoadMore.bind ( this ) }
                  defaultValue={[ { 'name' : ModalData.areaName , 'value' : ModalData.areaId } ]}
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
                  defaultValue={[ {
                    'name' : ModalData.insuranceCompanyName ,
                    'value' : ModalData.insuranceCompanyId
                  } ]}
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


    const { pageIndex , pageSize , pageTotal , tableData , UpdateModalVisible , companySelectData , businessTypeData } = this.state;

    console.log ( tableData );


    const pgColumns = [
      {
        "title" : "运输公司" ,
        "dataIndex" : "transCompanyName" ,
      } ,
      {
        "title" : "运输公司类型" ,
        "dataIndex" : "transCompanyTypeName" ,
      } ,
      {
        "title" : "上级部门" ,
        "dataIndex" : "superDepartment" ,
      } ,
      {
        "title" : "所属业户" ,
        "dataIndex" : "terminalCompany"
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
        "title" : "备注" ,
        "dataIndex" : "note"
      } ,
      {
        "title" : "操作" ,
        "sub" : ( data ) => {
          return ( this.state.tableData.length >= 1 ?
              (
                <div>
                    <span style={{ paddingRight : "5px" , cursor : "pointer" }}
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
                    <FormItem name="transCompanyName">
                      <Label>公司名称</Label>
                      <Input/>
                    </FormItem>
                    <FormItem name="areaId">
                      <Label>所属地区</Label>
                      <TreeSelect
                        dataSource="http://172.16.11.52:8081/api/v1.0/area/getTree"
                        dataValueMapper={ 'tid' }
                        loadMore={ this.handleLoadMore.bind ( this ) }
                      />
                    </FormItem>
                    <FormItem name="transTypeId">
                      <Label>运输公司类型</Label>
                      <Select placeholder="请选择" dataSource={ companySelectData }/>
                    </FormItem>
                    <FormItem name="businessTypeId">
                      <Label>经营范围</Label>
                      <Select placeholder="请选择" dataSource={ businessTypeData }/>
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
                  {/*<Upload placeholder="导入" />*/}
                  {/*</div>*/}
                  <div style={{ float : "right" }}>
                    <Button
                      onClick={ () => {
                        this.setState ( { AddModalVisible : true } )
                      }}
                      style={{ marginRight : '10px' }}>+ 新增</Button>
                    <Button onClick={ this.showDialog.bind ( this , this.state.ids , 2 )}
                            style={{ marginRight : '10px' }}>
                      <Icon icon="trash"/> 批量删除
                    </Button>
                    <Button style={{ marginRight : '10px' }}
                            onClick={ () => {
                              var a = document.createElement ( 'a' );
                              a.href = "http://172.16.11.52:8081/api/v1.0/transFirm/export";
                              a.click ();
                            }}>
                      <Icon icon="share-square"/> 导出
                    </Button>
                    <Button>
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
          this.CreateModal ()
        }
      </Wrapper>
    );
  }

}

export default transFirmMan;