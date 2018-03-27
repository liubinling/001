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
  CardHeader ,
  RadioGroup ,
  Radio
} from 'epm-ui';
import { Wrapper } from '../../components/index'


// 驾驶人员信息管理

class driverMan extends Component {

  constructor ( props ) {
    super ( props );

    this.state = {
      plateNo : '' ,
      name : '' ,
      idCardNo : '' ,
      motorcadeId : '' ,
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
    this.createModal = this.createModal.bind ( this );
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
    const url = `http://172.16.11.52:8081/api/v1.0/driver?plateNo=${ this.state.plateNo }&name=${ this.state.name }&idCardNo=${ this.state.idCardNo }&motorcade.id=${ this.state.motorcadeId }&order=${ this.state.sortOrder }&sort=${ this.state.sortIndex }&page=${ this.state.pageIndex }&rows=${ this.state.pageSize }`;

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
      data.name = result.rows[ i ].name;
      data.idCardNo = result.rows[ i ].idCardNo;
      data.gender = result.rows[ i ].gender;
      data.headUrl = result.rows[ i ].headUrl;
      if ( result.rows[ i ].vehicle != null ) {
        data.vehicleName = result.rows[ i ].vehicle.plateNo;
        data.vehicleid = result.rows[ i ].vehicle.id;
      } else {
        data.vehicleName = "";
      }
      data.list = result.rows[ i ].list;
      data.tel = result.rows[ i ].tel;
      data.drivingYear = result.rows[ i ].drivingYear;
      data.supercargoName = result.rows[ i ].supercargoName;
      data.birth = result.rows[ i ].birth;
      data.claimFrequence = result.rows[ i ].claimFrequence;
      data.licenseStatus = result.rows[ i ].licenseStatus;
      if ( result.rows[ i ].drivingType != null ) {
        data.drivingTypeName = result.rows[ i ].drivingType.name;
        data.drivingTypeId = result.rows[ i ].drivingType.id;
      } else {
        data.drivingTypeName = "";
      }
      data.firstDate = result.rows[ i ].firstDate;
      data.validDate = result.rows[ i ].validDate;
      data.driversLicenseNumber = result.rows[ i ].driversLicenseNumber;
      data.fileNo = result.rows[ i ].fileNo;
      data.qualificationCertificateName = result.rows[ i ].qualificationCertificateName;
      data.qualificationCertificateType = result.rows[ i ].qualificationCertificateType;
      data.qualificationCertificateNo = result.rows[ i ].qualificationCertificateNo;
      data.certifyingAuthority = result.rows[ i ].certifyingAuthority;
      data.certifyingTime = result.rows[ i ].certifyingTime;
      data.expirationTime = result.rows[ i ].expirationTime;
      data.regulator = result.rows[ i ].regulator;
      data.regulatorTel = result.rows[ i ].regulatorTel;
      if ( result.rows[ i ].motorcade != null ) {
        data.motorcadeName = result.rows[ i ].motorcade.motorcadeName;
        data.motorcadeId = result.rows[ i ].motorcade.id;
      } else {
        data.motorcadeName = "";
      }
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

  handleMotoCcadedMore ( node ) {
    return fetch ( `http://172.16.11.52:8081/api/v1.0/motorcade/getTree/${ node.data.tid }` );
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

      const url = `http://172.16.11.52:8081/api/v1.0/driver/${ data }`;

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


      const url = `http://172.16.11.52:8081/api/v1.0/driver?ids=${ data }`;


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
      name : data.name ,
      idCardNo : data.idCardNo ,
      motorcadeId : data.motorcadeId ,
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
              type="inline"
              onSubmit={ this.AddTableData }
            >
              <Card>
                <CardHeader>
                  <h4>基本信息</h4>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <FormItem name="name">
                        <Label>司机姓名：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="idCardNo">
                        <Label>身份证号：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="gender">
                        <Label>性别：</Label>
                        <RadioGroup type="inline">
                          <Radio value="男">男</Radio>
                          <Radio value="女">女</Radio>
                        </RadioGroup>
                      </FormItem>
                      {/*//TODO 注意*/}
                      <FormItem name="list">
                        <Label>驾驶车辆：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="tel">
                        <Label>联系电话：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="drivingYear">
                        <Label>驾驶年龄：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="supercargoName">
                        <Label>押运员姓名：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="birth">
                        <Label>出生日期：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="claimFrequence">
                        <Label>出险次数：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="vehicle">
                        <Label>主驾驶：</Label>
                        <Input/>
                      </FormItem>
                    </Col>
                  </Row>

                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h4>驾驶证信息</h4>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <FormItem name="drivingType">
                        <Label>准驾车型：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="firstDate">
                        <Label>初次领证日期：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="validDate">
                        <Label>有效日期：</Label>
                        <Input />
                      </FormItem>
                      {/*//TODO 注意*/}
                      <FormItem name="driversLicenseNumber">
                        <Label>驾驶证号：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="fileNo">
                        <Label>档案编号：</Label>
                        <Input/>
                      </FormItem>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h4>从业资格证信息</h4>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <FormItem name="qualificationCertificateName">
                        <Label>从业资格证：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="qualificationCertificateType">
                        <Label>从业资格类别：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="qualificationCertificateNo">
                        <Label>证件编号：</Label>
                        <Input/>
                      </FormItem>
                      {/*//TODO 注意*/}
                      <FormItem name="certifyingAuthority">
                        <Label>发证机构：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="certifyingTime">
                        <Label>发证时间：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="expirationTime">
                        <Label>过期时间：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="regulator">
                        <Label>监督机构：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="regulatorTel">
                        <Label>监督电话：</Label>
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
              type="inline"
              onSubmit={ this.UpdateTableData }
            >
              <Card>
                <CardHeader>
                  <h4>基本信息</h4>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <FormItem name="name">
                        <Label>司机姓名：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="idCardNo">
                        <Label>身份证号：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="gender">
                        <Label>性别：</Label>
                        <RadioGroup type="inline">
                          <Radio value="男">男</Radio>
                          <Radio value="女">女</Radio>
                        </RadioGroup>
                      </FormItem>
                      {/*//TODO 注意*/}
                      <FormItem name="list">
                        <Label>驾驶车辆：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="tel">
                        <Label>联系电话：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="drivingYear">
                        <Label>驾驶年龄：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="supercargoName">
                        <Label>押运员姓名：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="birth">
                        <Label>出生日期：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="claimFrequence">
                        <Label>出险次数：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="vehicle">
                        <Label>主驾驶：</Label>
                        <Input/>
                      </FormItem>
                    </Col>
                  </Row>

                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h4>驾驶证信息</h4>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <FormItem name="drivingType">
                        <Label>准驾车型：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="firstDate">
                        <Label>初次领证日期：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="validDate">
                        <Label>有效日期：</Label>
                        <Input />
                      </FormItem>
                      {/*//TODO 注意*/}
                      <FormItem name="driversLicenseNumber">
                        <Label>驾驶证号：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="fileNo">
                        <Label>档案编号：</Label>
                        <Input/>
                      </FormItem>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h4>从业资格证信息</h4>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <FormItem name="qualificationCertificateName">
                        <Label>从业资格证：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="qualificationCertificateType">
                        <Label>从业资格类别：</Label>
                        <Input />
                      </FormItem>
                      <FormItem name="qualificationCertificateNo">
                        <Label>证件编号：</Label>
                        <Input/>
                      </FormItem>
                      {/*//TODO 注意*/}
                      <FormItem name="certifyingAuthority">
                        <Label>发证机构：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="certifyingTime">
                        <Label>发证时间：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="expirationTime">
                        <Label>过期时间：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="regulator">
                        <Label>监督机构：</Label>
                        <Input/>
                      </FormItem>
                      <FormItem name="regulatorTel">
                        <Label>监督电话：</Label>
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

    }

  }


  render () {


    const { pageIndex , pageSize , pageTotal , tableData } = this.state;

    console.log ( tableData );

    const pgColumns = [
      {
        "title" : "司机姓名" ,
        "dataIndex" : "name" ,
      } ,
      {
        "title" : "性别" ,
        "dataIndex" : "gender" ,
      } ,
      {
        "title" : "押运员" ,
        "dataIndex" : "supercargoName" ,
      } ,
      {
        "title" : "身份证号" ,
        "dataIndex" : "idCardNo"
      } ,
      {
        "title" : "移动电话" ,
        "dataIndex" : "tel"
      } ,
      {
        "title" : "从业资格证" ,
        "dataIndex" : "qualificationCertificateNo"
      } ,
      {
        "title" : "发证机构" ,
        "dataIndex" : "certifyingAuthority"
      } ,
      {
        "title" : "驾驶车辆" ,
        "dataIndex" : "vehicleName"
      } ,
      {
        "title" : "所属车队" ,
        "dataIndex" : "motorcadeName"
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
                      <Label>车牌号：</Label>
                      <Input/>
                    </FormItem>
                    <FormItem name="name">
                      <Label>司机姓名：</Label>
                      <Input/>
                    </FormItem>
                    <FormItem name="idCardNo">
                      <Label>身份证号：</Label>
                      <Input/>
                    </FormItem>
                    <FormItem name="motorcadeId">
                      <Label>所属车队：</Label>
                      <TreeSelect
                        dataSource="http://172.16.11.52:8081/api/v1.0/motorcade/getTree"
                        dataValueMapper={ 'tid' }
                        loadMore={ this.handleMotoCcadedMore.bind ( this ) }
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
                              a.href = "http://172.16.11.52:8081/api/v1.0/driver/export";
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
          this.createModal ()
        }
      </Wrapper>
    );
  }

}

export default driverMan;