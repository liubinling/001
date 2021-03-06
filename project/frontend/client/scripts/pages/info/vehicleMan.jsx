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


// 车辆信息查询

class transFirmMan extends Component {

  constructor ( props ) {
    super ( props );

    this.state = {
      plateNo : '' ,
      motorcadeId : '' ,
      deviceNo : '' ,
      driverId : '' ,
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
    const url = `http://172.16.11.52:8081/api/v1.0/vehicle?plateNo=${ this.state.plateNo }&motorcade.id=${ this.state.motorcadeId }&deviceNo=${ this.state.deviceNo }&driver.id=${ this.state.driverId }&order=${ this.state.sortOrder }&sort=${ this.state.sortIndex }&page=${ this.state.pageIndex }&rows=${ this.state.pageSize }`;

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
      data.plateNo = result.rows[ i ].plateNo;
      //TODO:数据类型完善后修改
      if ( result.rows[ i ].deviceNo != null ) {
        data.deviceNo = result.rows[ i ].deviceNo.name;
        data.deviceNo = result.rows[ i ].deviceNo.id;
      } else {
        data.deviceName = "";
      }
      if ( result.rows[ i ].motorcade != null ) {
        data.motorcadeName = result.rows[ i ].motorcade.motorcadeName;
        data.motorcadeId = result.rows[ i ].motorcade.id;
      } else {
        data.motorcadeName = "";
      }
      if ( result.rows[ i ].driver != null ) {
        data.driverName = result.rows[ i ].driver.name;
        data.driverId = result.rows[ i ].driver.id;
      } else {
        data.driverName = "";
      }
      data.list = result.rows[ i ].list;
      if ( result.rows[ i ].industryType != null ) {
        data.industryTypeName = result.rows[ i ].industryType.name;
        data.industryTypeId = result.rows[ i ].industryType.id;
      } else {
        data.industryTypeName = "";
      }
      if ( result.rows[ i ].color != null ) {
        data.colorName = result.rows[ i ].color.name;
        data.colorId = result.rows[ i ].color.id;
      } else {
        data.colorName = "";
      }
      if ( result.rows[ i ].carArea != null ) {
        data.carAreaName = result.rows[ i ].carArea.name;
        data.carAreaId = result.rows[ i ].carArea.id;
      } else {
        data.carAreaName = "";
      }
      //TODO:数据修改
      if ( result.rows[ i ].device != null ) {
        data.device = result.rows[ i ].device.deviceId;
      } else {
        data.device = "";
      }
      data.engineNo = result.rows[ i ].engineNo;
      if ( result.rows[ i ].deviceStatus != null ) {
        data.deviceStatusName = result.rows[ i ].deviceStatus.name;
        data.deviceStatusId = result.rows[ i ].deviceStatus.id;
      } else {
        data.deviceStatusName = "";
      }
      data.installTime = result.rows[ i ].installTime;
      data.netInTime = result.rows[ i ].netInTime;
      if ( result.rows[ i ].vehicleType != null ) {
        data.vehicleTypeName = result.rows[ i ].vehicleType.name;
        data.vehicleTypeId = result.rows[ i ].vehicleType.id;
      } else {
        data.vehicleTypeName = "";
      }
      if ( result.rows[ i ].terminalCompany != null ) {
        data.terminalCompanyName = result.rows[ i ].terminalCompany.terminalCompanyName;
        data.terminalCompanyId = result.rows[ i ].terminalCompany.id;
      } else {
        data.terminalCompanyName = "";
      }
      if ( result.rows[ i ].runningStatus != null ) {
        data.runningStatusName = result.rows[ i ].runningStatus.name;
        data.runningStatusId = result.rows[ i ].runningStatus.id;
      } else {
        data.runningStatusName = "";
      }
      data.startTime = result.rows[ i ].startTime;
      data.endTime = result.rows[ i ].endTime;
      data.brand = result.rows[ i ].brand;
      data.model = result.rows[ i ].model;
      data.useCharacter = result.rows[ i ].useCharacter;
      data.issueDate = result.rows[ i ].issueDate;
      data.validDate = result.rows[ i ].validDate;
      data.tractionMass = result.rows[ i ].tractionMass;
      data.approvedPassengersCapacity = result.rows[ i ].approvedPassengersCapacity;
      data.grossMass = result.rows[ i ].grossMass;
      data.unladenMass = result.rows[ i ].unladenMass;
      data.approvedLoad = result.rows[ i ].approvedLoad;
      data.insuranceCompany = result.rows[ i ].insuranceCompany;
      data.saliNo = result.rows[ i ].saliNo;
      data.commerceInsuranceNo = result.rows[ i ].commerceInsuranceNo;
      data.insuranceStartTime = result.rows[ i ].insuranceStartTime;
      data.insuranceEndTime = result.rows[ i ].insuranceEndTime;

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
      plateNo : data.plateNo ,
      motorcadeId : data.motorcadeId ,
      deviceNo : data.deviceNo ,
      driverId : data.driverId ,
    } , () => {
      this.getTableData ();
    } )
  }


  UpdateTableData ( data ) {

    const url = `http://172.16.11.52:8081/api/v1.0/transFirm?id=${ this.state.ModalData.id }&transCompanyName=${ data.transTypeId }&transType.id=${ data.transCompanyTypeId }&superDepartment.id=${ data.superDepartmentId }&terminalCompany.id=${ data.superDepartmentId }&businessLicense=${ data.businessLicense }&businessLicenseNo=${ data.businessLicenseNo }&businessType.id=${ data.businessTypeId }&area.id=${ data.areaId }&contact=${ data.contact }&tel=${ data.tel }&note=${ data.note }&insuranceCompany.id=${ data.insuranceCompanyId }`;

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
            description="修改失败！"
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
              type="inline"
              onSubmit={ this.AddTableData }
            >
              <Card>
                <CardHeader>
                  <h4>车辆信息</h4>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <FormItem name="name">
                        <Label>车牌号码：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="idCardNo">
                        <Label>终端卡号：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="gender">
                        <Label>终端类型：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="list">
                        <Label>车辆组：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="tel">
                        <Label>行业类型：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="drivingYear">
                        <Label>车牌颜色：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="supercargoName">
                        <Label>车籍地：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="birth">
                        <Label>绑定终端：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="claimFrequence">
                        <Label>唯一终端ID号：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="vehicle">
                        <Label>发动机号：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="vehicle">
                        <Label>设备当前状态：</Label>
                        <Input/>
                        <FormItem name="tel">
                          <Label>安装时间：</Label>
                          <Input/>
                        </FormItem>
                        <FormItem name="drivingYear">
                          <Label>入网时间：</Label>
                          <Input/>
                        </FormItem>
                        <FormItem name="supercargoName">
                          <Label>车辆类型：</Label>
                          <Input/>
                        </FormItem>
                        <FormItem name="birth">
                          <Label>所属业户：</Label>
                          <Input/>
                        </FormItem>
                        <FormItem name="claimFrequence">
                          <Label>运行状态：</Label>
                          <Input/>
                        </FormItem>
                        <FormItem name="vehicle">
                          <Label>服务开始时间：</Label>
                          <Input/>
                        </FormItem>
                        <FormItem name="vehicle">
                          <Label>服务结束时间：</Label>
                          <Input/>
                        </FormItem>
                      </FormItem>
                    </Col>
                  </Row>

                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h4>行驶证信息</h4>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <FormItem name="drivingType">
                        <Label>品牌型号：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="firstDate">
                        <Label>使用材质：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="validDate">
                        <Label>车架号：</Label>
                        <Input />
                      </FormItem>
                      {/*//TODO 注意*/}
                      <FormItem name="driversLicenseNumber">
                        <Label>准牵引总质量：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="fileNo">
                        <Label>核定载人数：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="driversLicenseNumber">
                        <Label>总质量：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="fileNo">
                        <Label>设备质量：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="fileNo">
                        <Label>核定载质量：</Label>
                        <Input/>
                      </FormItem>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
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
                  defaultValue={[ { 'name' : ModalData.superDepartment , 'tid' : ModalData.superDepartmentId } ]}
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
                  defaultValue={[ { 'name' : ModalData.areaName , 'tid' : ModalData.areaId } ]}
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
                  defaultValue={[ { 'name' : ModalData.insuranceCompanyName , 'tid' : ModalData.insuranceCompanyId } ]}
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


    const { pageIndex , pageSize , pageTotal , tableData , companySelectData , businessTypeData } = this.state;

    console.log( tableData );


    const pgColumns = [
      {
        "title" : "车牌号" ,
        "dataIndex" : "plateNo" ,
      } ,
      {
        "title" : "颜色" ,
        "dataIndex" : "colorName" ,
      } ,
      {
        "title" : "终端卡号" ,
        "dataIndex" : "deviceNo" ,
      } ,
      {
        "title" : "主驾驶" ,
        "dataIndex" : "driverName"
      } ,
      {
        "title" : "运营状态" ,
        "dataIndex" : "runningStatusName"
      } ,
      {
        "title" : "所属车队" ,
        "dataIndex" : "motorcadeName"
      } ,
      {
        "title" : "车辆类型" ,
        "dataIndex" : "vehicleTypeName"
      } ,
      {
        "title" : "行业" ,
        "dataIndex" : "industryTypeName"
      } ,
      {
        "title" : "车籍地" ,
        "dataIndex" : "carArea"
      } ,
      {
        "title" : "失效日期" ,
        "dataIndex" : "insuranceEndTime"
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
                    <FormItem name="plateNo">
                      <Label>车牌号码</Label>
                      <Input/>
                    </FormItem>
                    <FormItem name="motorcadeId">
                      <Label>车辆组</Label>
                      <Input/>
                    </FormItem>
                    <FormItem name="driverId">
                      <Label>主驾驶员名称</Label>
                      <Input/>
                    </FormItem>
                    <FormItem name="deviceNo">
                      <Label>终端卡号</Label>
                      <Input/>
                    </FormItem>
                    <Button type="primary" htmlType="submit" >
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
                              a.href = "http://172.16.11.52:8081/api/v1.0/vehicle/export?";
                              a.click ();
                            }}>
                      <Icon icon="share-square"/> 导出
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