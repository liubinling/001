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
  Card,
  CardHeader,
  CardBody
} from 'epm-ui';
import { Wrapper } from '../components/index'

//TODO:Input 校验完善
// 系统配置页面

class sysConfig extends Component {

  constructor ( props ) {
    super ( props );

    this.state = {
      pKey : '' ,
      pDesc : '' ,
      sortIndex : 'id' ,
      sortOrder : 'desc' ,
      pageIndex : 1 ,
      pageSize : 10 ,
      tableData : {} ,
      ids : []
    };

    this.getTableData = this.getTableData.bind ( this );
    this.handleCheck = this.handleCheck.bind ( this );
    this.handleChange = this.handleChange.bind ( this );
    this.handleTableChange = this.handleTableChange.bind ( this );
    this.AddTableData = this.AddTableData.bind ( this );
    this.QueryTableData = this.QueryTableData.bind ( this );
    this.UpdateTableData = this.UpdateTableData.bind ( this );
    this.renderColumns = this.renderColumns.bind ( this );
  }

  componentDidMount () {
    this.getTableData ();
  }

  /**
   * 获取 Table 数据
   */
  getTableData () {

    const url = `http://172.16.11.52:8081/api/v1.0/sysconfig?pkey=${this.state.pKey
      }&pdescr=${this.state.pDesc}&order=${this.state.sortOrder}&sort=${this.state.sortIndex}&page=${this.state.pageIndex}&rows=${this.state.pageSize}`;

    fetch ( url , {
      method : 'GET' ,
      mode : 'cors'
    } )
      .then ( ( response ) => {
        return response.json ();
      } )
      .then ( ( responseJson ) => {
        this.setState ( {
          pageTotal : responseJson.result.total ,
          tableData : responseJson.result.rows ,
        } );
      } )
      .catch ( ( err ) => console.error ( err ) )
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

  edit ( key ) {
    const newData = [ ... this.state.tableData ];
    const target = newData.filter ( item => key === item.id )[ 0 ];
    if ( target ) {
      target.editable = true;
      this.setState ( { tableData : newData } );
    }
  }

  handleChange ( value , key , column ) {
    const newData = [ ... this.state.tableData ];
    const target = newData.filter ( item => key === item.id )[ 0 ];
    if ( target ) {
      target[ column ] = value;
      this.setState ( { tableData : newData } );
    }
  }

  renderColumns ( data , rowdata , column ) {
    return (
      <div>
        {  rowdata.editable
          ?
          <FormItem required>
            <Input value={ data } onChange={ value => this.handleChange ( value , rowdata.id , column )}/>
          </FormItem>
          : data
        }
      </div>
    );
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

      const url = `http://172.16.11.52:8081/api/v1.0/sysconfig/${ data }`;

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
              message="系统配置页面"
              key={ Math.random ().toString () }
              description="删除失败！"
            />;
            popup ( this.notification );
          }
        } )
        .catch ( ( err ) => console.error ( err ) );

    } else if ( type == 2 ) {


      const url = `http://172.16.11.52:8081/api/v1.0/sysconfig?ids=${ data }`;


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
              message="系统配置页面"
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
   * 通过Input进行数据查询
   * @param data
   * @constructor
   */
  QueryTableData ( data ) {
    this.setState ( {
      pKey : data.pKey ,
      pDesc : data.pDesc
    } , () => {
      this.getTableData ();
    } )
  }

  /**
   * 增加表格数据
   * @constructor
   */
  AddTableData () {
    const { tableData , pageTotal } = this.state;
    const newData = {
      editable : true ,
      newdata : true ,
      pkey : '' ,
      pvalue : '' ,
      pdescr : '' ,
    };
    this.setState ( {
      pageTotal : pageTotal + 1 ,
      tableData : [ newData , ... tableData ].slice ( 0 , 10 ) ,//新增后仅显示前10条数据
    } );
  }

  /**
   *  新增和修改表格数据 data.new 为新增表格数据
   * @param data
   * @constructor
   */
  UpdateTableData ( data ) {

    if ( data.pkey == "" | data.pvalue == "" ) {

      this.notification = <Notification
        message="系统配置页面"
        key={ Math.random ().toString () }
        description="输入值不能为空！"
      />;
      popup ( this.notification );

    } else {

      if ( data.newdata ) {

        const url = "http://172.16.11.52:8081/api/v1.0/sysconfig";

        const parm = new FormData ();
        parm.append ( "pkey" , data.pkey );
        parm.append ( "pvalue" , data.pvalue );
        parm.append ( "pdescr" , data.pdescr );


        fetch ( url , {
          method : 'POST' ,
          body : parm
        } )
          .then ( ( response ) => {
            return response.json ();
          } )
          .then ( ( responseJson ) => {
            if ( responseJson.success ) {
              this.getTableData ();
            } else {
              this.notification = <Notification
                message="系统配置页面"
                key={ Math.random ().toString () }
                description="添加失败！"
              />;
              popup ( this.notification );
            }
          } )
          .catch ( ( err ) => console.error ( err ) );


      } else {

        const url = `http://172.16.11.52:8081/api/v1.0/sysconfig?id=${ data.id }&pkey=${ data.pkey }&pvalue=${ data.pvalue }&pdescr=${ data.pdescr }`;

        fetch ( url , {
          method : 'PUT'
        } )
          .then ( ( response ) => {
            return response.json ();
          } )
          .then ( ( responseJson ) => {
            if ( responseJson.success ) {
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

    }

  }


  render () {

    const { pageIndex , pageSize , pageTotal , tableData } = this.state;

    const pgColumns = [
      {
        "title" : "参数名" ,
        "dataIndex" : "pkey" ,
        "sortable" : true ,
        sub : ( data , rowkey , rowdata ) => {
          return (
            this.renderColumns ( data , rowdata , 'pkey' )
          )
        }
      } ,
      {
        "title" : "参数值" ,
        "dataIndex" : "pvalue" ,
        "sortable" : true ,
        sub : ( data , rowkey , rowdata ) => {
          return (
            this.renderColumns ( data , rowdata , 'pvalue' )
          )
        }
      } ,
      {
        "title" : "说明" ,
        "dataIndex" : "pdescr" ,
        sub : ( data , rowkey , rowdata ) => {
          return (
            this.renderColumns ( data , rowdata , 'pdescr' )
          )
        }
      } ,
      {
        "title" : "操作" ,
        sub : ( data ) => {
          return ( this.state.tableData.length >= 1 ?
              (
                <div>
                  {
                    data.editable ?
                      <span style={{ padding : "0 10px" , cursor : "pointer" }}
                            onClick={ this.UpdateTableData.bind ( this , data ) }>
                        <Icon icon="check"/>
                      </span> :
                      <span style={{ padding : "0 10px" , cursor : "pointer" }}
                            onClick={ this.edit.bind ( this , data.id ) }>
                        <Icon icon="pencil"/>
                      </span>
                  }
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
                    method="post"
                    type="inline"
                    async={ true }
                    onSubmit={ this.QueryTableData }
                  >
                    <FormItem name="pKey">
                      <Label>参数名</Label>
                      <Input/>
                    </FormItem>
                    <FormItem name="pDesc">
                      <Label>说明</Label>
                      <Input/>
                    </FormItem>
                    <Button type="primary" htmlType="submit"> <Icon type="search"/></Button>
                  </Form>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <div style={{ float : "right" }}>
                    <Button onClick={ this.AddTableData }>+ 新增</Button>
                    <Button onClick={ this.showDialog.bind ( this , this.state.ids , 2 )}>
                      <Icon icon="trash"/> 批量删除</Button>
                  </div>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col>
                  { tableData.length == 0 | tableData.length == undefined ? <Alert message="暂无数据"/> : null }
                  <PagiTable
                    method="get"
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
      </Wrapper>
    );
  }

}

export default sysConfig;